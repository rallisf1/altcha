var Ye = Object.defineProperty;
var Be = (t, e, r) => e in t ? Ye(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var N = (t, e, r) => (Be(t, typeof e != "symbol" ? e + "" : e, r), r);
function Y() {
}
function xe(t) {
  return t();
}
function me() {
  return /* @__PURE__ */ Object.create(null);
}
function X(t) {
  t.forEach(xe);
}
function Ce(t) {
  return typeof t == "function";
}
function Ue(t, e) {
  return t != t ? e == e : t !== e || t && typeof t == "object" || typeof t == "function";
}
function Xe(t) {
  return Object.keys(t).length === 0;
}
function v(t, e) {
  t.appendChild(e);
}
function Ke(t, e, r) {
  const n = Je(t);
  if (!n.getElementById(e)) {
    const o = p("style");
    o.id = e, o.textContent = r, ze(n, o);
  }
}
function Je(t) {
  if (!t)
    return document;
  const e = t.getRootNode ? t.getRootNode() : t.ownerDocument;
  return e && /** @type {ShadowRoot} */
  e.host ? (
    /** @type {ShadowRoot} */
    e
  ) : t.ownerDocument;
}
function ze(t, e) {
  return v(
    /** @type {Document} */
    t.head || t,
    e
  ), e.sheet;
}
function R(t, e, r) {
  t.insertBefore(e, r || null);
}
function L(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function p(t) {
  return document.createElement(t);
}
function j(t) {
  return document.createElementNS("http://www.w3.org/2000/svg", t);
}
function Qe(t) {
  return document.createTextNode(t);
}
function Z() {
  return Qe(" ");
}
function re(t, e, r, n) {
  return t.addEventListener(e, r, n), () => t.removeEventListener(e, r, n);
}
function c(t, e, r) {
  r == null ? t.removeAttribute(e) : t.getAttribute(e) !== r && t.setAttribute(e, r);
}
function qe(t) {
  return Array.from(t.childNodes);
}
function ve(t, e, r) {
  t.classList.toggle(e, !!r);
}
function et(t, e, { bubbles: r = !1, cancelable: n = !1 } = {}) {
  return new CustomEvent(t, { detail: e, bubbles: r, cancelable: n });
}
function tt(t) {
  const e = {};
  return t.childNodes.forEach(
    /** @param {Element} node */
    (r) => {
      e[r.slot || "default"] = !0;
    }
  ), e;
}
let U;
function B(t) {
  U = t;
}
function se() {
  if (!U)
    throw new Error("Function called outside component initialization");
  return U;
}
function rt(t) {
  se().$$.on_mount.push(t);
}
function nt(t) {
  se().$$.on_destroy.push(t);
}
function it() {
  const t = se();
  return (e, r, { cancelable: n = !1 } = {}) => {
    const o = t.$$.callbacks[e];
    if (o) {
      const l = et(
        /** @type {string} */
        e,
        r,
        { cancelable: n }
      );
      return o.slice().forEach((s) => {
        s.call(t, l);
      }), !l.defaultPrevented;
    }
    return !0;
  };
}
const W = [], ie = [];
let D = [];
const we = [], Le = /* @__PURE__ */ Promise.resolve();
let oe = !1;
function Re() {
  oe || (oe = !0, Le.then(C));
}
function ot() {
  return Re(), Le;
}
function le(t) {
  D.push(t);
}
const ne = /* @__PURE__ */ new Set();
let O = 0;
function C() {
  if (O !== 0)
    return;
  const t = U;
  do {
    try {
      for (; O < W.length; ) {
        const e = W[O];
        O++, B(e), lt(e.$$);
      }
    } catch (e) {
      throw W.length = 0, O = 0, e;
    }
    for (B(null), W.length = 0, O = 0; ie.length; )
      ie.pop()();
    for (let e = 0; e < D.length; e += 1) {
      const r = D[e];
      ne.has(r) || (ne.add(r), r());
    }
    D.length = 0;
  } while (W.length);
  for (; we.length; )
    we.pop()();
  oe = !1, ne.clear(), B(t);
}
function lt(t) {
  if (t.fragment !== null) {
    t.update(), X(t.before_update);
    const e = t.dirty;
    t.dirty = [-1], t.fragment && t.fragment.p(t.ctx, e), t.after_update.forEach(le);
  }
}
function st(t) {
  const e = [], r = [];
  D.forEach((n) => t.indexOf(n) === -1 ? e.push(n) : r.push(n)), r.forEach((n) => n()), D = e;
}
const ct = /* @__PURE__ */ new Set();
function ut(t, e) {
  t && t.i && (ct.delete(t), t.i(e));
}
function at(t, e, r) {
  const { fragment: n, after_update: o } = t.$$;
  n && n.m(e, r), le(() => {
    const l = t.$$.on_mount.map(xe).filter(Ce);
    t.$$.on_destroy ? t.$$.on_destroy.push(...l) : X(l), t.$$.on_mount = [];
  }), o.forEach(le);
}
function ft(t, e) {
  const r = t.$$;
  r.fragment !== null && (st(r.after_update), X(r.on_destroy), r.fragment && r.fragment.d(e), r.on_destroy = r.fragment = null, r.ctx = []);
}
function ht(t, e) {
  t.$$.dirty[0] === -1 && (W.push(t), Re(), t.$$.dirty.fill(0)), t.$$.dirty[e / 31 | 0] |= 1 << e % 31;
}
function dt(t, e, r, n, o, l, s = null, u = [-1]) {
  const f = U;
  B(t);
  const a = t.$$ = {
    fragment: null,
    ctx: [],
    // state
    props: l,
    update: Y,
    not_equal: o,
    bound: me(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(e.context || (f ? f.$$.context : [])),
    // everything else
    callbacks: me(),
    dirty: u,
    skip_bound: !1,
    root: e.target || f.$$.root
  };
  s && s(a.root);
  let k = !1;
  if (a.ctx = r ? r(t, e.props || {}, (w, I, ...G) => {
    const T = G.length ? G[0] : I;
    return a.ctx && o(a.ctx[w], a.ctx[w] = T) && (!a.skip_bound && a.bound[w] && a.bound[w](T), k && ht(t, w)), I;
  }) : [], a.update(), k = !0, X(a.before_update), a.fragment = n ? n(a.ctx) : !1, e.target) {
    if (e.hydrate) {
      const w = qe(e.target);
      a.fragment && a.fragment.l(w), w.forEach(L);
    } else
      a.fragment && a.fragment.c();
    e.intro && ut(t.$$.fragment), at(t, e.target, e.anchor), C();
  }
  B(f);
}
let Ie;
typeof HTMLElement == "function" && (Ie = class extends HTMLElement {
  constructor(e, r, n) {
    super();
    /** The Svelte component constructor */
    N(this, "$$ctor");
    /** Slots */
    N(this, "$$s");
    /** The Svelte component instance */
    N(this, "$$c");
    /** Whether or not the custom element is connected */
    N(this, "$$cn", !1);
    /** Component props data */
    N(this, "$$d", {});
    /** `true` if currently in the process of reflecting component props back to attributes */
    N(this, "$$r", !1);
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    N(this, "$$p_d", {});
    /** @type {Record<string, Function[]>} Event listeners */
    N(this, "$$l", {});
    /** @type {Map<Function, Function>} Event listener unsubscribe functions */
    N(this, "$$l_u", /* @__PURE__ */ new Map());
    this.$$ctor = e, this.$$s = r, n && this.attachShadow({ mode: "open" });
  }
  addEventListener(e, r, n) {
    if (this.$$l[e] = this.$$l[e] || [], this.$$l[e].push(r), this.$$c) {
      const o = this.$$c.$on(e, r);
      this.$$l_u.set(r, o);
    }
    super.addEventListener(e, r, n);
  }
  removeEventListener(e, r, n) {
    if (super.removeEventListener(e, r, n), this.$$c) {
      const o = this.$$l_u.get(r);
      o && (o(), this.$$l_u.delete(r));
    }
  }
  async connectedCallback() {
    if (this.$$cn = !0, !this.$$c) {
      let e = function(l) {
        return () => {
          let s;
          return {
            c: function() {
              s = p("slot"), l !== "default" && c(s, "name", l);
            },
            /**
             * @param {HTMLElement} target
             * @param {HTMLElement} [anchor]
             */
            m: function(a, k) {
              R(a, s, k);
            },
            d: function(a) {
              a && L(s);
            }
          };
        };
      };
      if (await Promise.resolve(), !this.$$cn || this.$$c)
        return;
      const r = {}, n = tt(this);
      for (const l of this.$$s)
        l in n && (r[l] = [e(l)]);
      for (const l of this.attributes) {
        const s = this.$$g_p(l.name);
        s in this.$$d || (this.$$d[s] = Q(s, l.value, this.$$p_d, "toProp"));
      }
      for (const l in this.$$p_d)
        !(l in this.$$d) && this[l] !== void 0 && (this.$$d[l] = this[l], delete this[l]);
      this.$$c = new this.$$ctor({
        target: this.shadowRoot || this,
        props: {
          ...this.$$d,
          $$slots: r,
          $$scope: {
            ctx: []
          }
        }
      });
      const o = () => {
        this.$$r = !0;
        for (const l in this.$$p_d)
          if (this.$$d[l] = this.$$c.$$.ctx[this.$$c.$$.props[l]], this.$$p_d[l].reflect) {
            const s = Q(
              l,
              this.$$d[l],
              this.$$p_d,
              "toAttribute"
            );
            s == null ? this.removeAttribute(this.$$p_d[l].attribute || l) : this.setAttribute(this.$$p_d[l].attribute || l, s);
          }
        this.$$r = !1;
      };
      this.$$c.$$.after_update.push(o), o();
      for (const l in this.$$l)
        for (const s of this.$$l[l]) {
          const u = this.$$c.$on(l, s);
          this.$$l_u.set(s, u);
        }
      this.$$l = {};
    }
  }
  // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
  // and setting attributes through setAttribute etc, this is helpful
  attributeChangedCallback(e, r, n) {
    var o;
    this.$$r || (e = this.$$g_p(e), this.$$d[e] = Q(e, n, this.$$p_d, "toProp"), (o = this.$$c) == null || o.$set({ [e]: this.$$d[e] }));
  }
  disconnectedCallback() {
    this.$$cn = !1, Promise.resolve().then(() => {
      this.$$cn || (this.$$c.$destroy(), this.$$c = void 0);
    });
  }
  $$g_p(e) {
    return Object.keys(this.$$p_d).find(
      (r) => this.$$p_d[r].attribute === e || !this.$$p_d[r].attribute && r.toLowerCase() === e
    ) || e;
  }
});
function Q(t, e, r, n) {
  var l;
  const o = (l = r[t]) == null ? void 0 : l.type;
  if (e = o === "Boolean" && typeof e != "boolean" ? e != null : e, !n || !r[t])
    return e;
  if (n === "toAttribute")
    switch (o) {
      case "Object":
      case "Array":
        return e == null ? null : JSON.stringify(e);
      case "Boolean":
        return e ? "" : null;
      case "Number":
        return e ?? null;
      default:
        return e;
    }
  else
    switch (o) {
      case "Object":
      case "Array":
        return e && JSON.parse(e);
      case "Boolean":
        return e;
      case "Number":
        return e != null ? +e : e;
      default:
        return e;
    }
}
function gt(t, e, r, n, o, l) {
  let s = class extends Ie {
    constructor() {
      super(t, r, o), this.$$p_d = e;
    }
    static get observedAttributes() {
      return Object.keys(e).map(
        (u) => (e[u].attribute || u).toLowerCase()
      );
    }
  };
  return Object.keys(e).forEach((u) => {
    Object.defineProperty(s.prototype, u, {
      get() {
        return this.$$c && u in this.$$c ? this.$$c[u] : this.$$d[u];
      },
      set(f) {
        var a;
        f = Q(u, f, e), this.$$d[u] = f, (a = this.$$c) == null || a.$set({ [u]: f });
      }
    });
  }), n.forEach((u) => {
    Object.defineProperty(s.prototype, u, {
      get() {
        var f;
        return (f = this.$$c) == null ? void 0 : f[u];
      }
    });
  }), l && (s = l(s)), t.element = /** @type {any} */
  s, s;
}
class bt {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    N(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    N(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    ft(this, 1), this.$destroy = Y;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(e, r) {
    if (!Ce(r))
      return Y;
    const n = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
    return n.push(r), () => {
      const o = n.indexOf(r);
      o !== -1 && n.splice(o, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(e) {
    this.$$set && !Xe(e) && (this.$$.skip_bound = !0, this.$$set(e), this.$$.skip_bound = !1);
  }
}
const mt = "4";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(mt);
const Ne = "KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2NvbnN0IGY9bmV3IFRleHRFbmNvZGVyO2Z1bmN0aW9uIGcodCl7cmV0dXJuWy4uLm5ldyBVaW50OEFycmF5KHQpXS5tYXAoZT0+ZS50b1N0cmluZygxNikucGFkU3RhcnQoMiwiMCIpKS5qb2luKCIiKX1hc3luYyBmdW5jdGlvbiBoKHQsZSxvKXtyZXR1cm4gZyhhd2FpdCBjcnlwdG8uc3VidGxlLmRpZ2VzdChvLnRvVXBwZXJDYXNlKCksZi5lbmNvZGUodCtlKSkpfWZ1bmN0aW9uIG0odCxlLG89IlNIQS0yNTYiLGk9MWU2LHA9MCl7Y29uc3QgYT1uZXcgQWJvcnRDb250cm9sbGVyO3JldHVybntwcm9taXNlOm5ldyBQcm9taXNlKChzLGMpPT57Y29uc3Qgcj1EYXRlLm5vdygpLGQ9bD0+e2Euc2lnbmFsLmFib3J0ZWR8fGw+aT9zKG51bGwpOmgoZSxsLG8pLnRoZW4odz0+e3c9PT10P3Moe251bWJlcjpsLHRvb2s6RGF0ZS5ub3coKS1yfSk6ZChsKzEpfSkuY2F0Y2goYyl9O2QocCl9KSxjb250cm9sbGVyOmF9fWxldCBuO29ubWVzc2FnZT1hc3luYyB0PT57Y29uc3R7dHlwZTplLHBheWxvYWQ6b309dC5kYXRhO2lmKGU9PT0iYWJvcnQiKW49PW51bGx8fG4uYWJvcnQoKSxuPXZvaWQgMDtlbHNlIGlmKGU9PT0id29yayIpe2NvbnN0e2FsZzppLGNoYWxsZW5nZTpwLG1heDphLHNhbHQ6dSxzdGFydDpzfT1vfHx7fSxjPW0ocCx1LGksYSxzKTtuPWMuY29udHJvbGxlcixjLnByb21pc2UudGhlbihyPT57c2VsZi5wb3N0TWVzc2FnZShyJiZ7Li4ucix3b3JrZXI6ITB9KX0pfX19KSgpOwo=", vt = (t) => Uint8Array.from(atob(t), (e) => e.charCodeAt(0)), _e = typeof window < "u" && window.Blob && new Blob([vt(Ne)], { type: "text/javascript;charset=utf-8" });
function wt(t) {
  let e;
  try {
    if (e = _e && (window.URL || window.webkitURL).createObjectURL(_e), !e)
      throw "";
    const r = new Worker(e, {
      name: t == null ? void 0 : t.name
    });
    return r.addEventListener("error", () => {
      (window.URL || window.webkitURL).revokeObjectURL(e);
    }), r;
  } catch {
    return new Worker(
      "data:text/javascript;base64," + Ne,
      {
        name: t == null ? void 0 : t.name
      }
    );
  } finally {
    e && (window.URL || window.webkitURL).revokeObjectURL(e);
  }
}
const _t = new TextEncoder();
function pt(t) {
  return [...new Uint8Array(t)].map((e) => e.toString(16).padStart(2, "0")).join("");
}
async function yt(t, e = "SHA-256", r = 1e5) {
  const n = Date.now().toString(16);
  t || (t = Math.round(Math.random() * r));
  const o = await Te(n, t, e);
  return {
    algorithm: e,
    challenge: o,
    salt: n,
    signature: ""
  };
}
async function Te(t, e, r) {
  return pt(await crypto.subtle.digest(r.toUpperCase(), _t.encode(t + e)));
}
function $t(t, e, r = "SHA-256", n = 1e6, o = 0) {
  const l = new AbortController();
  return {
    promise: new Promise((u, f) => {
      const a = Date.now(), k = (w) => {
        l.signal.aborted || w > n ? u(null) : Te(e, w, r).then((I) => {
          I === t ? u({
            number: w,
            took: Date.now() - a
          }) : k(w + 1);
        }).catch(f);
      };
      k(o);
    }),
    controller: l
  };
}
var m = /* @__PURE__ */ ((t) => (t.ERROR = "error", t.VERIFIED = "verified", t.VERIFYING = "verifying", t.UNVERIFIED = "unverified", t.EXPIRED = "expired", t))(m || {});
function kt(t) {
  Ke(t, "svelte-vuofbg", ".altcha.svelte-vuofbg.svelte-vuofbg{background:var(--altcha-color-base, transparent);border:var(--altcha-border-width, 1px) solid var(--altcha-color-border, #a0a0a0);border-radius:var(--altcha-border-radius, 3px);color:var(--altcha-color-text, currentColor);display:flex;flex-direction:column;max-width:var(--altcha-max-width, 260px);overflow:hidden;position:relative;text-align:left}.altcha.svelte-vuofbg.svelte-vuofbg:focus-within{border-color:var(--altcha-color-border-focus, currentColor)}.altcha-main.svelte-vuofbg.svelte-vuofbg{align-items:center;display:flex;gap:0.4rem;padding:0.7rem}.altcha-label.svelte-vuofbg.svelte-vuofbg{flex-grow:1}.altcha-label.svelte-vuofbg label.svelte-vuofbg{cursor:pointer}.altcha-logo.svelte-vuofbg.svelte-vuofbg{color:currentColor;opacity:0.3}.altcha-logo.svelte-vuofbg.svelte-vuofbg:hover{opacity:1}.altcha-error.svelte-vuofbg.svelte-vuofbg{color:var(--altcha-color-error-text, #f23939);display:flex;font-size:0.85rem;gap:0.3rem;padding:0 0.7rem 0.7rem}.altcha-footer.svelte-vuofbg.svelte-vuofbg{align-items:center;background-color:var(--altcha-color-footer-bg, transparent);display:flex;font-size:0.75rem;opacity:0.4;padding:0.2rem 0.7rem;text-align:right}.altcha-footer.svelte-vuofbg.svelte-vuofbg:hover{opacity:1}.altcha-footer.svelte-vuofbg>.svelte-vuofbg:first-child{flex-grow:1}.altcha-footer.svelte-vuofbg a{color:currentColor}.altcha-checkbox.svelte-vuofbg.svelte-vuofbg{display:flex;align-items:center;height:24px;width:24px}.altcha-checkbox.svelte-vuofbg input.svelte-vuofbg{width:18px;height:18px;margin:0}.altcha-hidden.svelte-vuofbg.svelte-vuofbg{display:none}.altcha-spinner.svelte-vuofbg.svelte-vuofbg{animation:svelte-vuofbg-altcha-spinner 0.75s infinite linear;transform-origin:center}@keyframes svelte-vuofbg-altcha-spinner{100%{transform:rotate(360deg)}}");
}
function pe(t) {
  let e, r, n;
  return {
    c() {
      e = j("svg"), r = j("path"), n = j("path"), c(r, "d", "M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"), c(r, "fill", "currentColor"), c(r, "opacity", ".25"), c(n, "d", "M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"), c(n, "fill", "currentColor"), c(n, "class", "altcha-spinner svelte-vuofbg"), c(e, "width", "24"), c(e, "height", "24"), c(e, "viewBox", "0 0 24 24"), c(e, "xmlns", "http://www.w3.org/2000/svg");
    },
    m(o, l) {
      R(o, e, l), v(e, r), v(e, n);
    },
    d(o) {
      o && L(e);
    }
  };
}
function Et(t) {
  let e, r = (
    /*_strings*/
    t[9].label + ""
  ), n;
  return {
    c() {
      e = p("label"), c(e, "for", n = /*name*/
      t[3] + "_checkbox"), c(e, "class", "svelte-vuofbg");
    },
    m(o, l) {
      R(o, e, l), e.innerHTML = r;
    },
    p(o, l) {
      l[0] & /*_strings*/
      512 && r !== (r = /*_strings*/
      o[9].label + "") && (e.innerHTML = r), l[0] & /*name*/
      8 && n !== (n = /*name*/
      o[3] + "_checkbox") && c(e, "for", n);
    },
    d(o) {
      o && L(e);
    }
  };
}
function xt(t) {
  let e, r = (
    /*_strings*/
    t[9].verifying + ""
  );
  return {
    c() {
      e = p("span");
    },
    m(n, o) {
      R(n, e, o), e.innerHTML = r;
    },
    p(n, o) {
      o[0] & /*_strings*/
      512 && r !== (r = /*_strings*/
      n[9].verifying + "") && (e.innerHTML = r);
    },
    d(n) {
      n && L(e);
    }
  };
}
function Ct(t) {
  let e, r = (
    /*_strings*/
    t[9].verified + ""
  ), n, o;
  return {
    c() {
      e = p("span"), n = Z(), o = p("input"), c(o, "type", "hidden"), c(
        o,
        "name",
        /*name*/
        t[3]
      ), o.value = /*payload*/
      t[4];
    },
    m(l, s) {
      R(l, e, s), e.innerHTML = r, R(l, n, s), R(l, o, s);
    },
    p(l, s) {
      s[0] & /*_strings*/
      512 && r !== (r = /*_strings*/
      l[9].verified + "") && (e.innerHTML = r), s[0] & /*name*/
      8 && c(
        o,
        "name",
        /*name*/
        l[3]
      ), s[0] & /*payload*/
      16 && (o.value = /*payload*/
      l[4]);
    },
    d(l) {
      l && (L(e), L(n), L(o));
    }
  };
}
function ye(t) {
  let e, r, n, o, l, s;
  return {
    c() {
      e = p("div"), r = p("a"), n = j("svg"), o = j("path"), l = j("path"), s = j("path"), c(o, "d", "M2.33955 16.4279C5.88954 20.6586 12.1971 21.2105 16.4279 17.6604C18.4699 15.947 19.6548 13.5911 19.9352 11.1365L17.9886 10.4279C17.8738 12.5624 16.909 14.6459 15.1423 16.1284C11.7577 18.9684 6.71167 18.5269 3.87164 15.1423C1.03163 11.7577 1.4731 6.71166 4.8577 3.87164C8.24231 1.03162 13.2883 1.4731 16.1284 4.8577C16.9767 5.86872 17.5322 7.02798 17.804 8.2324L19.9522 9.01429C19.7622 7.07737 19.0059 5.17558 17.6604 3.57212C14.1104 -0.658624 7.80283 -1.21043 3.57212 2.33956C-0.658625 5.88958 -1.21046 12.1971 2.33955 16.4279Z"), c(o, "fill", "currentColor"), c(l, "d", "M3.57212 2.33956C1.65755 3.94607 0.496389 6.11731 0.12782 8.40523L2.04639 9.13961C2.26047 7.15832 3.21057 5.25375 4.8577 3.87164C8.24231 1.03162 13.2883 1.4731 16.1284 4.8577L13.8302 6.78606L19.9633 9.13364C19.7929 7.15555 19.0335 5.20847 17.6604 3.57212C14.1104 -0.658624 7.80283 -1.21043 3.57212 2.33956Z"), c(l, "fill", "currentColor"), c(s, "d", "M7 10H5C5 12.7614 7.23858 15 10 15C12.7614 15 15 12.7614 15 10H13C13 11.6569 11.6569 13 10 13C8.3431 13 7 11.6569 7 10Z"), c(s, "fill", "currentColor"), c(n, "width", "22"), c(n, "height", "22"), c(n, "viewBox", "0 0 20 20"), c(n, "fill", "none"), c(n, "xmlns", "http://www.w3.org/2000/svg"), c(r, "href", Me), c(r, "target", "_blank"), c(r, "class", "altcha-logo svelte-vuofbg");
    },
    m(u, f) {
      R(u, e, f), v(e, r), v(r, n), v(n, o), v(n, l), v(n, s);
    },
    p: Y,
    d(u) {
      u && L(e);
    }
  };
}
function $e(t) {
  let e, r, n, o;
  function l(f, a) {
    return (
      /*state*/
      f[5] === m.EXPIRED ? Rt : Lt
    );
  }
  let s = l(t), u = s(t);
  return {
    c() {
      e = p("div"), r = j("svg"), n = j("path"), o = Z(), u.c(), c(n, "stroke-linecap", "round"), c(n, "stroke-linejoin", "round"), c(n, "d", "M6 18L18 6M6 6l12 12"), c(r, "width", "14"), c(r, "height", "14"), c(r, "xmlns", "http://www.w3.org/2000/svg"), c(r, "fill", "none"), c(r, "viewBox", "0 0 24 24"), c(r, "stroke-width", "1.5"), c(r, "stroke", "currentColor"), c(e, "class", "altcha-error svelte-vuofbg");
    },
    m(f, a) {
      R(f, e, a), v(e, r), v(r, n), v(e, o), u.m(e, null);
    },
    p(f, a) {
      s === (s = l(f)) && u ? u.p(f, a) : (u.d(1), u = s(f), u && (u.c(), u.m(e, null)));
    },
    d(f) {
      f && L(e), u.d();
    }
  };
}
function Lt(t) {
  let e, r = (
    /*_strings*/
    t[9].error + ""
  );
  return {
    c() {
      e = p("div"), c(
        e,
        "title",
        /*error*/
        t[8]
      );
    },
    m(n, o) {
      R(n, e, o), e.innerHTML = r;
    },
    p(n, o) {
      o[0] & /*_strings*/
      512 && r !== (r = /*_strings*/
      n[9].error + "") && (e.innerHTML = r), o[0] & /*error*/
      256 && c(
        e,
        "title",
        /*error*/
        n[8]
      );
    },
    d(n) {
      n && L(e);
    }
  };
}
function Rt(t) {
  let e, r = (
    /*_strings*/
    t[9].expired + ""
  );
  return {
    c() {
      e = p("div"), c(
        e,
        "title",
        /*error*/
        t[8]
      );
    },
    m(n, o) {
      R(n, e, o), e.innerHTML = r;
    },
    p(n, o) {
      o[0] & /*_strings*/
      512 && r !== (r = /*_strings*/
      n[9].expired + "") && (e.innerHTML = r), o[0] & /*error*/
      256 && c(
        e,
        "title",
        /*error*/
        n[8]
      );
    },
    d(n) {
      n && L(e);
    }
  };
}
function ke(t) {
  let e, r, n = (
    /*_strings*/
    t[9].footer + ""
  );
  return {
    c() {
      e = p("div"), r = p("div"), c(r, "class", "svelte-vuofbg"), c(e, "class", "altcha-footer svelte-vuofbg");
    },
    m(o, l) {
      R(o, e, l), v(e, r), r.innerHTML = n;
    },
    p(o, l) {
      l[0] & /*_strings*/
      512 && n !== (n = /*_strings*/
      o[9].footer + "") && (r.innerHTML = n);
    },
    d(o) {
      o && L(e);
    }
  };
}
function It(t) {
  let e, r, n, o, l, s, u, f, a, k, w, I, G, T, _ = (
    /*state*/
    t[5] === m.VERIFYING && pe()
  );
  function V(h, d) {
    return (
      /*state*/
      h[5] === m.VERIFIED ? Ct : (
        /*state*/
        h[5] === m.VERIFYING ? xt : Et
      )
    );
  }
  let M = V(t), E = M(t), y = (
    /*hidelogo*/
    t[2] !== !0 && ye()
  ), $ = (
    /*error*/
    (t[8] || /*state*/
    t[5] === m.EXPIRED) && $e(t)
  ), b = (
    /*_strings*/
    t[9].footer && /*hidefooter*/
    t[1] !== !0 && ke(t)
  );
  return {
    c() {
      e = p("div"), r = p("div"), _ && _.c(), n = Z(), o = p("div"), l = p("input"), f = Z(), a = p("div"), E.c(), k = Z(), y && y.c(), w = Z(), $ && $.c(), I = Z(), b && b.c(), c(l, "type", "checkbox"), c(l, "id", s = /*name*/
      t[3] + "_checkbox"), l.required = u = /*auto*/
      t[0] !== "onsubmit", c(l, "class", "svelte-vuofbg"), c(o, "class", "altcha-checkbox svelte-vuofbg"), ve(
        o,
        "altcha-hidden",
        /*state*/
        t[5] === m.VERIFYING
      ), c(a, "class", "altcha-label svelte-vuofbg"), c(r, "class", "altcha-main svelte-vuofbg"), c(e, "class", "altcha svelte-vuofbg"), c(
        e,
        "data-state",
        /*state*/
        t[5]
      );
    },
    m(h, d) {
      R(h, e, d), v(e, r), _ && _.m(r, null), v(r, n), v(r, o), v(o, l), l.checked = /*checked*/
      t[6], v(r, f), v(r, a), E.m(a, null), v(r, k), y && y.m(r, null), v(e, w), $ && $.m(e, null), v(e, I), b && b.m(e, null), t[26](e), G || (T = [
        re(
          l,
          "change",
          /*input_change_handler*/
          t[25]
        ),
        re(
          l,
          "change",
          /*onCheckedChange*/
          t[10]
        ),
        re(
          l,
          "invalid",
          /*onInvalid*/
          t[11]
        )
      ], G = !0);
    },
    p(h, d) {
      /*state*/
      h[5] === m.VERIFYING ? _ || (_ = pe(), _.c(), _.m(r, n)) : _ && (_.d(1), _ = null), d[0] & /*name*/
      8 && s !== (s = /*name*/
      h[3] + "_checkbox") && c(l, "id", s), d[0] & /*auto*/
      1 && u !== (u = /*auto*/
      h[0] !== "onsubmit") && (l.required = u), d[0] & /*checked*/
      64 && (l.checked = /*checked*/
      h[6]), d[0] & /*state*/
      32 && ve(
        o,
        "altcha-hidden",
        /*state*/
        h[5] === m.VERIFYING
      ), M === (M = V(h)) && E ? E.p(h, d) : (E.d(1), E = M(h), E && (E.c(), E.m(a, null))), /*hidelogo*/
      h[2] !== !0 ? y ? y.p(h, d) : (y = ye(), y.c(), y.m(r, null)) : y && (y.d(1), y = null), /*error*/
      h[8] || /*state*/
      h[5] === m.EXPIRED ? $ ? $.p(h, d) : ($ = $e(h), $.c(), $.m(e, I)) : $ && ($.d(1), $ = null), /*_strings*/
      h[9].footer && /*hidefooter*/
      h[1] !== !0 ? b ? b.p(h, d) : (b = ke(h), b.c(), b.m(e, null)) : b && (b.d(1), b = null), d[0] & /*state*/
      32 && c(
        e,
        "data-state",
        /*state*/
        h[5]
      );
    },
    i: Y,
    o: Y,
    d(h) {
      h && L(e), _ && _.d(), E.d(), y && y.d(), $ && $.d(), b && b.d(), t[26](null), G = !1, X(T);
    }
  };
}
const Me = "https://altcha.org/";
function Ee(t) {
  return JSON.parse(t);
}
function Nt(t, e, r) {
  let n, o, l, { auto: s = void 0 } = e, { challengeurl: u = void 0 } = e, { challengejson: f = void 0 } = e, { debug: a = !1 } = e, { expire: k = void 0 } = e, { hidefooter: w = !1 } = e, { hidelogo: I = !1 } = e, { name: G = "altcha" } = e, { maxnumber: T = 1e6 } = e, { mockerror: _ = !1 } = e, { strings: V = void 0 } = e, { test: M = !1 } = e, { workers: E = navigator.hardwareConcurrency || 8 } = e;
  const y = it(), $ = ["SHA-256", "SHA-384", "SHA-512"];
  let b = !1, h, d = null, q = null, H = null, A = m.UNVERIFIED, ee;
  nt(() => {
    d && (d.removeEventListener("submit", ce), d.removeEventListener("reset", ue), d = null);
  }), rt(() => {
    x("mounted", "0.2.1"), x("workers", E), M && x("using test mode"), k && te(k), s !== void 0 && x("auto", s), d = h.closest("form"), d && (d.addEventListener("submit", ce), d.addEventListener("reset", ue)), s === "onload" && F();
  });
  function x(...i) {
    (a || i.some((g) => g instanceof Error)) && console[i[0] instanceof Error ? "error" : "log"]("ALTCHA", ...i);
  }
  function ce(i) {
    d && s === "onsubmit" && A === m.UNVERIFIED && (i.preventDefault(), i.stopPropagation(), F().then(() => {
      d == null || d.requestSubmit();
    }));
  }
  function ue() {
    K();
  }
  function Ge(i, g) {
    return btoa(JSON.stringify({
      algorithm: i.algorithm,
      challenge: i.challenge,
      number: g.number,
      salt: i.salt,
      signature: i.signature,
      test: M ? !0 : void 0,
      took: g.took
    }));
  }
  function ae(i) {
    if (!i.algorithm)
      throw new Error("Invalid challenge. Property algorithm is missing.");
    if (i.signature === void 0)
      throw new Error("Invalid challenge. Property signature is missing.");
    if (!$.includes(i.algorithm.toUpperCase()))
      throw new Error(`Unknown algorithm value. Allowed values: ${$.join(", ")}`);
    if (!i.challenge || i.challenge.length < 40)
      throw new Error("Challenge is too short. Min. 40 chars.");
    if (!i.salt || i.salt.length < 10)
      throw new Error("Salt is too short. Min. 10 chars.");
  }
  async function Se() {
    if (_)
      throw x("mocking error"), new Error("Mocked error.");
    if (n)
      return x("using provided json data"), n;
    if (M)
      return x("generating test challenge"), yt();
    {
      if (!u)
        throw new Error("Attribute challengeurl not set.");
      x("fetching challenge from", u);
      const i = await fetch(u);
      if (i.status !== 200)
        throw new Error(`Server responded with ${i.status}.`);
      const g = i.headers.get("Expires");
      if (g != null && g.length) {
        const P = Date.parse(g);
        isNaN(P) || te(P - Date.now());
      }
      return i.json();
    }
  }
  function fe() {
    u && A === m.VERIFIED ? F() : K(m.EXPIRED, l.expired);
  }
  async function Ae(i) {
    let g = null;
    if ("Worker" in window) {
      try {
        g = await je(i.challenge, i.salt, i.algorithm);
      } catch (P) {
        x(P);
      }
      if ((g == null ? void 0 : g.number) !== void 0)
        return { data: i, solution: g };
    }
    return {
      data: i,
      solution: await $t(i.challenge, i.salt, i.algorithm, T).promise
    };
  }
  async function je(i, g, P, J = Math.ceil(E)) {
    const z = [];
    if (J < 1)
      throw new Error("Wrong number of workers configured.");
    if (J > 16)
      throw new Error("Too many workers. Max. 16 allowed workers.");
    for (let S = 0; S < J; S++)
      z.push(new wt());
    const he = Math.ceil(T / J), Oe = await Promise.all(z.map((S, We) => {
      const de = We * he;
      return new Promise((De) => {
        S.addEventListener("message", (ge) => {
          if (ge.data)
            for (const be of z)
              be !== S && be.postMessage({ type: "abort" });
          De(ge.data);
        }), S.postMessage({
          payload: {
            alg: P,
            challenge: i,
            max: de + he,
            salt: g,
            start: de
          },
          type: "work"
        });
      });
    }));
    for (const S of z)
      S.terminate();
    return Oe.find((S) => !!S) || null;
  }
  function Ve() {
    [m.UNVERIFIED, m.ERROR, m.EXPIRED].includes(A) ? F() : r(6, b = !0);
  }
  function Ze() {
    A === m.VERIFYING && alert(l.waitAlert);
  }
  function te(i) {
    console.log(">>>"), x("expire", i), clearTimeout(ee), i < 1 ? fe() : ee = setTimeout(fe, i);
  }
  function He(i) {
    i.auto !== void 0 && (r(0, s = i.auto), s === "onload" && F()), i.expire !== void 0 && (te(i.expire), r(13, k = i.expire)), i.challenge && (ae(i.challenge), n = i.challenge), i.debug !== void 0 && r(12, a = !!i.debug), i.hidefooter !== void 0 && r(1, w = !!i.hidefooter), i.hidelogo !== void 0 && r(2, I = !!i.hidelogo), i.maxnumber !== void 0 && r(14, T = +i.maxnumber), i.mockerror !== void 0 && r(15, _ = !!i.mockerror), i.name !== void 0 && r(3, G = i.name), i.test !== void 0 && r(16, M = !!i.test), i.strings && r(24, o = i.strings), i.workers !== void 0 && r(17, E = +i.workers);
  }
  function K(i = m.UNVERIFIED, g = null) {
    clearTimeout(ee), r(6, b = !1), r(8, q = g), r(4, H = null), r(5, A = i);
  }
  async function F() {
    return K(m.VERIFYING), Se().then((i) => (ae(i), x("challenge", i), Ae(i))).then(({ data: i, solution: g }) => {
      if (x("solution", g), (g == null ? void 0 : g.number) !== void 0)
        x("verified"), r(5, A = m.VERIFIED), r(6, b = !0), r(4, H = Ge(i, g)), x("payload", H), ot().then(() => {
          y("verified", { payload: H });
        });
      else
        throw new Error("Unexpected result returned.");
    }).catch((i) => {
      x(i), r(5, A = m.ERROR), r(6, b = !1), r(8, q = i.message);
    });
  }
  function Fe() {
    b = this.checked, r(6, b);
  }
  function Pe(i) {
    ie[i ? "unshift" : "push"](() => {
      h = i, r(7, h);
    });
  }
  return t.$$set = (i) => {
    "auto" in i && r(0, s = i.auto), "challengeurl" in i && r(18, u = i.challengeurl), "challengejson" in i && r(19, f = i.challengejson), "debug" in i && r(12, a = i.debug), "expire" in i && r(13, k = i.expire), "hidefooter" in i && r(1, w = i.hidefooter), "hidelogo" in i && r(2, I = i.hidelogo), "name" in i && r(3, G = i.name), "maxnumber" in i && r(14, T = i.maxnumber), "mockerror" in i && r(15, _ = i.mockerror), "strings" in i && r(20, V = i.strings), "test" in i && r(16, M = i.test), "workers" in i && r(17, E = i.workers);
  }, t.$$.update = () => {
    t.$$.dirty[0] & /*challengejson*/
    524288 && (n = f ? Ee(f) : void 0), t.$$.dirty[0] & /*strings*/
    1048576 && r(24, o = V ? Ee(V) : {}), t.$$.dirty[0] & /*parsedStrings*/
    16777216 && r(9, l = {
      error: "Verification failed. Try again later.",
      expired: "Verification expired. Try again.",
      footer: `Protected by <a href="${Me}" target="_blank">ALTCHA</a>`,
      label: "I'm not a robot",
      verified: "Verified",
      verifying: "Verifying...",
      waitAlert: "Verifying... please wait.",
      ...o
    }), t.$$.dirty[0] & /*payload, state*/
    48 && y("statechange", { payload: H, state: A });
  }, [
    s,
    w,
    I,
    G,
    H,
    A,
    b,
    h,
    q,
    l,
    Ve,
    Ze,
    a,
    k,
    T,
    _,
    M,
    E,
    u,
    f,
    V,
    He,
    K,
    F,
    o,
    Fe,
    Pe
  ];
}
class Tt extends bt {
  constructor(e) {
    super(), dt(
      this,
      e,
      Nt,
      It,
      Ue,
      {
        auto: 0,
        challengeurl: 18,
        challengejson: 19,
        debug: 12,
        expire: 13,
        hidefooter: 1,
        hidelogo: 2,
        name: 3,
        maxnumber: 14,
        mockerror: 15,
        strings: 20,
        test: 16,
        workers: 17,
        configure: 21,
        reset: 22,
        verify: 23
      },
      kt,
      [-1, -1]
    );
  }
  get auto() {
    return this.$$.ctx[0];
  }
  set auto(e) {
    this.$$set({ auto: e }), C();
  }
  get challengeurl() {
    return this.$$.ctx[18];
  }
  set challengeurl(e) {
    this.$$set({ challengeurl: e }), C();
  }
  get challengejson() {
    return this.$$.ctx[19];
  }
  set challengejson(e) {
    this.$$set({ challengejson: e }), C();
  }
  get debug() {
    return this.$$.ctx[12];
  }
  set debug(e) {
    this.$$set({ debug: e }), C();
  }
  get expire() {
    return this.$$.ctx[13];
  }
  set expire(e) {
    this.$$set({ expire: e }), C();
  }
  get hidefooter() {
    return this.$$.ctx[1];
  }
  set hidefooter(e) {
    this.$$set({ hidefooter: e }), C();
  }
  get hidelogo() {
    return this.$$.ctx[2];
  }
  set hidelogo(e) {
    this.$$set({ hidelogo: e }), C();
  }
  get name() {
    return this.$$.ctx[3];
  }
  set name(e) {
    this.$$set({ name: e }), C();
  }
  get maxnumber() {
    return this.$$.ctx[14];
  }
  set maxnumber(e) {
    this.$$set({ maxnumber: e }), C();
  }
  get mockerror() {
    return this.$$.ctx[15];
  }
  set mockerror(e) {
    this.$$set({ mockerror: e }), C();
  }
  get strings() {
    return this.$$.ctx[20];
  }
  set strings(e) {
    this.$$set({ strings: e }), C();
  }
  get test() {
    return this.$$.ctx[16];
  }
  set test(e) {
    this.$$set({ test: e }), C();
  }
  get workers() {
    return this.$$.ctx[17];
  }
  set workers(e) {
    this.$$set({ workers: e }), C();
  }
  get configure() {
    return this.$$.ctx[21];
  }
  get reset() {
    return this.$$.ctx[22];
  }
  get verify() {
    return this.$$.ctx[23];
  }
}
customElements.define("altcha-widget", gt(Tt, { auto: {}, challengeurl: {}, challengejson: {}, debug: { type: "Boolean" }, expire: {}, hidefooter: { type: "Boolean" }, hidelogo: { type: "Boolean" }, name: {}, maxnumber: {}, mockerror: { type: "Boolean" }, strings: {}, test: { type: "Boolean" }, workers: {} }, [], ["configure", "reset", "verify"], !1));
export {
  Tt as Altcha
};
