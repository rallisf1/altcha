<svelte:options customElement={{
  tag: 'altcha-widget',
  shadow: 'none',
}} />

<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount, tick } from 'svelte';
  import InlineWorker from './worker?worker&inline';
  import { solveChallenge, createTestChallenge } from './helpers';
  import { State } from './types';
  import type { Configure, Payload, Challenge, Solution } from './types';

  export let auto: 'onload' | 'onsubmit' | undefined = undefined; 
  export let challengeurl: string | undefined = undefined;
  export let challengejson: string | undefined = undefined;
  export let debug: boolean = false;
  export let expire: number | undefined = undefined;
  export let autorenew: boolean = true;
  export let hidefooter: boolean = false;
  export let hidelogo: boolean = false;
  export let name: string = 'altcha';
  export let maxnumber: number = 1e6;
  export let mockerror: boolean = false;
  export let strings: string | undefined = undefined;
  export let test: boolean = false;
  export let workers: number = navigator.hardwareConcurrency || 8;

  const dispatch = createEventDispatcher();
  const allowedAlgs = ['SHA-256', 'SHA-384', 'SHA-512'];
  const website = 'https://altcha.org/';

  let checked: boolean = false;
  let el: HTMLElement;
  let elForm: HTMLFormElement | null = null;
  let error: string | null = null;
  let payload: string | null = null;
  let state: State = State.UNVERIFIED;
  let expireTimeout: ReturnType<typeof setTimeout>;

  $: parsedChallenge = challengejson ? parseJsonAttribute(challengejson) : undefined;
  $: parsedStrings = strings ? parseJsonAttribute(strings) : {};
  $: _strings = {
    error: 'Verification failed. Try again later.',
    expired: 'Verification expired. Try again.',
    footer: `Protected by <a href="${website}" target="_blank">ALTCHA</a>`,
    label: 'I\'m not a robot',
    verified: 'Verified',
    verifying: 'Verifying...',
    waitAlert: 'Verifying... please wait.',
    ...parsedStrings,
  };
  $: dispatch('statechange', { payload, state });

  onDestroy(() => {
    if (elForm) {
      elForm.removeEventListener('submit', onFormSubmit);
      elForm.removeEventListener('reset', onFormReset);
      elForm = null;
    }
  });

  onMount(() => {
    log('mounted', ALTCHA_VERSION);
    log('workers', workers);
    if (test) {
      log('using test mode');
    }
    if (expire) {
      setExpire(expire);
    }
    if (auto !== undefined) {
      log('auto', auto);
    }
    elForm = el.closest('form');
    if (elForm) {
      elForm.addEventListener('submit', onFormSubmit);
      elForm.addEventListener('reset', onFormReset);
    }
    if (auto === 'onload') {
      verify();
    }
  });

  function log(...args: any[]) {
    if (debug || args.some((a) => a instanceof Error)) {
      console[args[0] instanceof Error ? 'error' : 'log']('ALTCHA', ...args);
    }
  }

  function onFormSubmit(ev: SubmitEvent) {
    if (elForm && auto === 'onsubmit' && state === State.UNVERIFIED) {
      ev.preventDefault();
      ev.stopPropagation();
      verify().then(() => {
        elForm?.requestSubmit();
      });
    }
  }

  function onFormReset() {
    reset();
  }

  function parseJsonAttribute(str: string) {
    return JSON.parse(str);
  }

  function createAltchaPayload(data: Challenge, solution: Solution): string {
    return btoa(JSON.stringify({
      algorithm: data.algorithm,
      challenge: data!.challenge,
      number: solution.number,
      salt: data.salt,
      signature: data.signature,
      test: test ? true : undefined,
      took: solution.took,
    } satisfies Payload));
  }

  function validateChallenge(data: Challenge) {
    if (!data.algorithm) {
      throw new Error(`Invalid challenge. Property algorithm is missing.`);
    }
    if (data.signature === undefined) {
      throw new Error('Invalid challenge. Property signature is missing.');
    }
    if (!allowedAlgs.includes(data.algorithm.toUpperCase())) {
      throw new Error(`Unknown algorithm value. Allowed values: ${allowedAlgs.join(', ')}`);
    }
    if (!data.challenge || data.challenge.length < 40) {
      throw new Error('Challenge is too short. Min. 40 chars.');
    }
    if (!data.salt || data.salt.length < 10) {
      throw new Error('Salt is too short. Min. 10 chars.');
    }
  }

  async function fetchChallenge(): Promise<Challenge> {
    if (mockerror) {
      log('mocking error');
      throw new Error('Mocked error.');

    } else if (parsedChallenge) {
      log('using provided json data');
      return parsedChallenge;

    } else if (test) {
      log('generating test challenge');
      return createTestChallenge();

    } else {
      if (!challengeurl) {
        throw new Error(`Attribute challengeurl not set.`);
      }
      log('fetching challenge from', challengeurl);
      const resp = await fetch(challengeurl);
      if (resp.status !== 200) {
        throw new Error(`Server responded with ${resp.status}.`);
      }
      const expHeader = resp.headers.get('Expires');
      if(expHeader?.length) {
        const parsed = Date.parse(expHeader);
        if (!isNaN(parsed)) {
          setExpire(parsed - Date.now());
        }
      }
      return resp.json();
    }
  }

  function expireChallenge() {
    if (challengeurl && autorenew && state === State.VERIFIED) {
      // re-fetch challenge and verify again
      verify();

    } else {
      reset(State.EXPIRED, _strings.expired);
    }
  }

  async function run(data: Challenge): Promise<{ data: Challenge, solution: Solution | null }> {
    let solution: Solution | null = null;
    if ('Worker' in window) {
      try {
        solution = await runWorker(data.challenge, data.salt, data.algorithm);
      } catch (err) {
        log(err)
      }
      if (solution?.number !== undefined) {
        return {
          data,
          solution,
        };
      }
    }
    return {
      data,
      solution: await solveChallenge(data.challenge, data.salt, data.algorithm, maxnumber).promise,
    }
  }

  async function runWorker(challenge: string, salt: string, alg?: string, concurrency: number = Math.ceil(workers)): Promise<Solution | null> {
    const workers: Worker[] = [];
    if (concurrency < 1) {
      throw new Error('Wrong number of workers configured.');
    }
    if (concurrency > 16) {
      throw new Error('Too many workers. Max. 16 allowed workers.');
    }
    for (let i = 0; i < concurrency; i ++) {
      workers.push(new InlineWorker());
    }
    const step = Math.ceil(maxnumber / concurrency);
    const solutions = await Promise.all(workers.map((worker, i) => {
      const start = i * step;
      return new Promise((resolve) => {
        worker.addEventListener('message', (message: MessageEvent) => {
          if (message.data) {
            for (const w of workers) {
              if (w !== worker) {
                w.postMessage({ type: 'abort' });
              }
            }
          }
          resolve(message.data);
        });
        worker.postMessage({
          payload: {
            alg,
            challenge,
            max: start + step,
            salt,
            start, 
          },
          type: 'work',
        });
      }) as Promise<Solution | null>;
    }));
    for (const worker of workers) {
      worker.terminate();
    }
    return solutions.find((solution) => !!solution) || null;
  }

  function onCheckedChange() {
    if ([State.UNVERIFIED, State.ERROR, State.EXPIRED].includes(state)) {
      verify();
    } else {
      checked = true;
    }
  }

  function onInvalid() {
    if (state === State.VERIFYING) {
      alert(_strings.waitAlert);
    }
  }

  function setExpire(duration: number) {
    console.log('>>>')
    log('expire', duration)
    clearTimeout(expireTimeout);
    if(duration < 1) {
      expireChallenge();
    } else {
      expireTimeout = setTimeout(expireChallenge, duration);
    }
  }
  
  export function configure(options: Configure) {
    if (options.auto !== void 0) {
      auto = options.auto;
      if (auto === 'onload') {
        verify();
      }
    }
    if (options.expire !== void 0) {
      setExpire(options.expire);
      expire = options.expire;
    }
    if (options.challenge) {
      validateChallenge(options.challenge);
      parsedChallenge = options.challenge;
    }
    if (options.debug !== void 0) {
      debug = !!options.debug;
    }
    if (options.hidefooter !== void 0) {
      hidefooter = !!options.hidefooter;
    }
    if (options.hidelogo !== void 0) {
      hidelogo = !!options.hidelogo;
    }
    if (options.maxnumber !== void 0) {
      maxnumber = +options.maxnumber;
    }
    if (options.mockerror !== void 0) {
      mockerror = !!options.mockerror;
    }
    if (options.name !== void 0) {
      name = options.name;
    }
    if (options.test !== void 0) {
      test = !!options.test;
    }
    if (options.strings) {
      parsedStrings = options.strings;
    }
    if (options.workers !== void 0) {
      workers = +options.workers;
    }
  }

  export function reset(newState: State = State.UNVERIFIED, err: string | null = null) {
    clearTimeout(expireTimeout);
    checked = false;
    error = err;
    payload = null;
    state = newState;
  }

  export async function verify() {
    reset(State.VERIFYING);
    return fetchChallenge()
      .then((data) => {
        validateChallenge(data);
        log('challenge', data);
        return run(data);
      })
      .then(({ data, solution }) => {
        log('solution', solution);
        if (solution?.number !== undefined) {
          log('verified');
          state = State.VERIFIED;
          checked = true;
          payload = createAltchaPayload(data, solution);
          log('payload', payload);
          tick().then(() => {
            dispatch('verified', { payload });
          });
        } else {
          throw new Error('Unexpected result returned.');
        }
      })
      .catch((err) => {
        log(err);
        state = State.ERROR;
        checked = false;
        error = err.message;
      });
  }
</script>

<div bind:this={el} class="altcha" data-state={state}>
  <div class="altcha-main">
    {#if state === State.VERIFYING}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
          fill="currentColor"
          opacity=".25"
        /><path
          d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
          fill="currentColor"
          class="altcha-spinner"
        /></svg
      >
    {/if}

    <div class="altcha-checkbox" class:altcha-hidden={state === State.VERIFYING}>
      <input
        type="checkbox"
        id="{name}_checkbox"
        required={auto !== 'onsubmit'}
        bind:checked={checked}
        on:change={onCheckedChange}
        on:invalid={onInvalid}
      />
    </div>

    <div class="altcha-label">
      {#if state === State.VERIFIED}
        <span>{@html _strings.verified}</span>
        <input type="hidden" name={name} value={payload} />
      {:else if state === State.VERIFYING}
        <span>{@html _strings.verifying}</span>
      {:else}
        <label for="{name}_checkbox">{@html _strings.label}</label>
      {/if}
    </div>

    {#if hidelogo !== true}
    <div>
      <a href={website} target="_blank" class="altcha-logo">
        <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.33955 16.4279C5.88954 20.6586 12.1971 21.2105 16.4279 17.6604C18.4699 15.947 19.6548 13.5911 19.9352 11.1365L17.9886 10.4279C17.8738 12.5624 16.909 14.6459 15.1423 16.1284C11.7577 18.9684 6.71167 18.5269 3.87164 15.1423C1.03163 11.7577 1.4731 6.71166 4.8577 3.87164C8.24231 1.03162 13.2883 1.4731 16.1284 4.8577C16.9767 5.86872 17.5322 7.02798 17.804 8.2324L19.9522 9.01429C19.7622 7.07737 19.0059 5.17558 17.6604 3.57212C14.1104 -0.658624 7.80283 -1.21043 3.57212 2.33956C-0.658625 5.88958 -1.21046 12.1971 2.33955 16.4279Z" fill="currentColor"/>
          <path d="M3.57212 2.33956C1.65755 3.94607 0.496389 6.11731 0.12782 8.40523L2.04639 9.13961C2.26047 7.15832 3.21057 5.25375 4.8577 3.87164C8.24231 1.03162 13.2883 1.4731 16.1284 4.8577L13.8302 6.78606L19.9633 9.13364C19.7929 7.15555 19.0335 5.20847 17.6604 3.57212C14.1104 -0.658624 7.80283 -1.21043 3.57212 2.33956Z" fill="currentColor"/>
          <path d="M7 10H5C5 12.7614 7.23858 15 10 15C12.7614 15 15 12.7614 15 10H13C13 11.6569 11.6569 13 10 13C8.3431 13 7 11.6569 7 10Z" fill="currentColor"/>
        </svg>
      </a>
    </div>
    {/if}
  </div>

  {#if error || state === State.EXPIRED}
  <div class="altcha-error">
    <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
    {#if state === State.EXPIRED}
    <div title={error}>{@html _strings.expired}</div>
    {:else}
    <div title={error}>{@html _strings.error}</div>
    {/if}
  </div>
  {/if}

  {#if _strings.footer && hidefooter !== true}
  <div class="altcha-footer">
    <div>{@html _strings.footer}</div>
  </div>
  {/if}
</div>

<style global>
  .altcha {
    background: var(--altcha-color-base, transparent);
    border: var(--altcha-border-width, 1px) solid var(--altcha-color-border, #a0a0a0);
    border-radius: var(--altcha-border-radius, 3px);
    color: var(--altcha-color-text, currentColor);
    display: flex;
    flex-direction: column;
    max-width: var(--altcha-max-width, 260px);
    overflow: hidden;
    position: relative;
    text-align: left;
  }

  .altcha:focus-within {
    border-color: var(--altcha-color-border-focus, currentColor);
  }

  .altcha-main {
    align-items: center;
    display: flex;
    gap: 0.4rem;
    padding: 0.7rem;
  }

  .altcha-label {
    flex-grow: 1;
  }

  .altcha-label label {
    cursor: pointer;
  }

  .altcha-logo {
    color: currentColor;
    opacity: 0.3;
  }

  .altcha-logo:hover {
    opacity: 1;
  }

  .altcha-error {
    color: var(--altcha-color-error-text, #f23939);
    display: flex;
    font-size: 0.85rem;
    gap: 0.3rem;
    padding: 0 0.7rem 0.7rem;
  }

  .altcha-footer {
    align-items: center;
    background-color: var(--altcha-color-footer-bg, transparent);
    display: flex;
    font-size: 0.75rem;
    opacity: 0.4;
    padding: 0.2rem 0.7rem;
    text-align: right;
  }

  .altcha-footer:hover {
    opacity: 1;
  }

  .altcha-footer > *:first-child {
    flex-grow: 1;
  }
  
  .altcha-footer :global(a) {
    color: currentColor;
  }

  .altcha-checkbox {
    display: flex;
    align-items: center;
    height: 24px;
    width: 24px;
  }

  .altcha-checkbox input {
    width: 18px;
    height: 18px;
    margin: 0;
  }

  .altcha-hidden {
    display: none;
  }

  .altcha-spinner {
    animation: altcha-spinner 0.75s infinite linear;
    transform-origin: center;
  }

  @keyframes altcha-spinner {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
