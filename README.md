# ALTCHA

ALTCHA uses a proof-of-work mechanism to protect your website, APIs, and online services from spam and abuse. Unlike other solutions, ALTCHA is self-hosted, does not use cookies nor fingerprinting, does not track users, and is fully compliant with GDPR.

https://altcha.org

## Benefits

- __Friction-less__ - Using PoW instead of visual puzzles.
- __Cookie-less__ - GDPR compliant by design.
- __Self-hosted__ - Without reliance on external providers.

## Usage

ALTCHA widget is distributed as a "Web Component" and [supports all modern browsers](https://developer.mozilla.org/en-US/docs/Web/API/Web_components#browser_compatibility).

### 1. Install ALTCHA

```sh
npm install altcha
```

import `altcha` in your main file:

```js
import 'altcha';
```

or insert `<script>` tag to your website:

```html
<script async defer src="/altcha.js" type="module"></script>
```

CDN: https://cdn.jsdelivr.net/gh/altcha-org/altcha@main/dist/altcha.min.js

### 2. Use `<altcha-widget>` tag in your forms

```html
<form>
  <altcha-widget
    challengeurl="https://..."
  ></altcha-widget>  
</form>
```

See the [configuration](#configuration) below or visit the [website integration documentation](https://altcha.org/docs/website-integration).

### 3. Integrate ALTCHA with your server

See [server documentation](https://altcha.org/docs/server-integration) for more details.

## Configuration

Required options (at least one is required):

- __challengeurl__ - URL of your server to fetch the challenge from. Refer to [server integration](/docs/server-integration).
- __challengejson__ - JSON-encoded challenge data. If avoiding an HTTP request to `challengeurl`, provide the data here.

Additional options:

- __auto__ - Automatically verify without user interaction (possible values: `onload`, `onsubmit`).
- __expire__ - The challenge expiration (duration in milliseconds).
- __hidefooter__ - Hide the footer (ALTCHA link).
- __hidelogo__ - Hide the ALTCHA logo.
- __maxnumber__ - The max. number to iterate to (defaults to 1,000,000).
- __name__ - The name of the hidden field containing the payload (defaults to "altcha").
- __strings__ - JSON-encoded translation strings. Refer to [customization](/docs/widget-customization).
- __workers__ - The number of workers to utilize for PoW (defaults to `navigator.hardwareConcurrency || 8`).

Development / testing options:

- __debug__ - Print log messages in the console.
- __mockerror__ - Causes the verification to always fail with a "mock" error.
- __test__ - Generates a "mock" challenge within the widget, bypassing the request to `challengeurl`.

## Programmatic Configuration

To configure the widget programmatically, use the `configure()` method:

```ts
document.querySelector('#altcha').configure({
  challenge: {
    algorithm: 'SHA-256',
    challenge: '...',
    salt: '...',
    signature: '...',
  },
  strings: {
    label: 'Verify',
  },
});
```

Available configuration options: 

```ts
export interface Configure {
  auto?: 'onload' | 'onsubmit'; 
  challenge?: {
    algorithm: string;
    challenge: string;
    salt: string;
    signature: string;
  };
  debug?: boolean;
  expire?: number;
  hidefooter?: boolean;
  hidelogo?: boolean;
  maxnumber?: number;
  mockerror?: boolean;
  name?: string;
  strings?: {
    error?: string;
    footer?: string;
    label?: string;
    verified?: string;
    verifying?: string;
    waitAlert?: string;
  };
  test?: boolean;
  workers?: number;
}
```

## Events

- __statechange__ - Triggers whenever an internal `state` changes.
- __verified__ - Triggers when the challenge is verified.

```ts
enum State {
  ERROR = 'error',
  VERIFIED = 'verified',
  VERIFYING = 'verifying',
  UNVERIFIED = 'unverified',
  EXPIRED = 'expired',
};
```

Using events:

```js
document.querySelector('#altcha').addEventListener('statechange', (ev) => {
  // See enum State above
  console.log('state:', ev.detail.state);
});
```

> [!IMPORTANT]  
> Both programmatic configuration and event listeners have to called/attached after the ALTCHA script loads, such as within window.addEventListener('load', ...).

## Contributing
See [Contributing Guide](https://github.com/altcha-org/altcha/blob/main/CONTRIBUTING.md) and please follow our [Code of Conduct](https://github.com/altcha-org/altcha/blob/main/CODE_OF_CONDUCT.md).

## License

MIT

