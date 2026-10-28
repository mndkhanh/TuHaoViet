/* @ds-bundle: {"format":3,"namespace":"SearchifyDesignSystem_d2707b","components":[{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"SearchBar","sourcePath":"components/brand/SearchBar.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"46d00842e8f5","components/brand/SearchBar.jsx":"8fcaff50b8eb","components/core/Avatar.jsx":"b95d96a0e7fd","components/core/Badge.jsx":"858b20d74937","components/core/Button.jsx":"e89155ff77ca","components/core/Card.jsx":"5748ea7115df","components/core/Eyebrow.jsx":"8376bf05f6e1","components/forms/Input.jsx":"560ab0f1df21","components/forms/Switch.jsx":"1de6333704db","ui_kits/dashboard/DashboardApp.jsx":"e939e5bd8db2","ui_kits/dashboard/Panels.jsx":"712147170bd6","ui_kits/search/Results.jsx":"4c18d06b7205","ui_kits/search/SearchApp.jsx":"563c437823fa","ui_kits/shared/icons.jsx":"e94abe30169e","ui_kits/website/Chrome.jsx":"2caedf11769c","ui_kits/website/Hero.jsx":"7fe7681b5c75","ui_kits/website/Sections.jsx":"03b10610dc94"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SearchifyDesignSystem_d2707b = window.SearchifyDesignSystem_d2707b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.sf-logo { display: inline-flex; align-items: center; gap: 0.5em; text-decoration: none; line-height: 1; }
.sf-logo__mark { flex: none; }
.sf-logo__word {
  font-family: var(--font-display); font-weight: var(--fw-extra);
  letter-spacing: var(--tracking-tight); color: var(--text-strong);
}
.sf-logo__word b { color: var(--brand); font-weight: inherit; }
.sf-logo--light .sf-logo__word { color: var(--mint-50); }
.sf-logo--sm .sf-logo__word { font-size: 1.15rem; }
.sf-logo--md .sf-logo__word { font-size: 1.5rem; }
.sf-logo--lg .sf-logo__word { font-size: 2.1rem; }
`;
const SIZES = {
  sm: 24,
  md: 30,
  lg: 42
};
function inject() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('sf-logo-css')) return;
  const s = document.createElement('style');
  s.id = 'sf-logo-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Mark({
  px,
  stroke
}) {
  return /*#__PURE__*/React.createElement("svg", {
    className: "sf-logo__mark",
    width: px,
    height: px,
    viewBox: "0 0 48 48",
    fill: "none",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "20",
    cy: "20",
    r: "14",
    stroke: stroke,
    strokeWidth: "3.6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "30.5",
    y1: "30.5",
    x2: "42",
    y2: "42",
    stroke: stroke,
    strokeWidth: "4.2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20 11 Q22.2 17.8 29 20 Q22.2 22.2 20 29 Q17.8 22.2 11 20 Q17.8 17.8 20 11 Z",
    fill: "var(--brand)"
  }));
}
function Logo({
  variant = 'full',
  tone = 'dark',
  size = 'md',
  as = 'span',
  className = '',
  ...rest
}) {
  inject();
  const Tag = as;
  const px = SIZES[size] || SIZES.md;
  const stroke = tone === 'light' ? 'var(--mint-50)' : 'var(--ink-900)';
  const cls = ['sf-logo', `sf-logo--${tone}`, `sf-logo--${size}`, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement(Mark, {
    px: px,
    stroke: stroke
  }), variant === 'full' && /*#__PURE__*/React.createElement("span", {
    className: "sf-logo__word"
  }, "Search", /*#__PURE__*/React.createElement("b", null, "ify")));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/brand/SearchBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.sf-searchbar { display: flex; flex-direction: column; gap: var(--space-3); width: 100%; font-family: var(--font-sans); }
.sf-searchbar__field {
  display: flex; align-items: center; gap: var(--space-3);
  background: var(--surface);
  border: var(--border-2) solid var(--border-default);
  border-radius: var(--radius-pill);
  padding: 0.5rem 0.5rem 0.5rem 1.4rem;
  box-shadow: var(--shadow-md);
  transition: border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
}
.sf-searchbar__field:focus-within { border-color: var(--brand); box-shadow: var(--shadow-lg), 0 0 0 4px var(--gold-100); }
.sf-searchbar__glyph { color: var(--text-subtle); flex: none; display: inline-flex; }
.sf-searchbar__input {
  flex: 1; border: none; outline: none; background: transparent;
  font-family: inherit; font-size: var(--text-md); color: var(--text-strong); min-width: 0;
}
.sf-searchbar__input::placeholder { color: var(--text-subtle); }
.sf-searchbar__submit {
  flex: none; border: none; cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
  background: var(--brand); color: var(--text-on-brand);
  border-radius: var(--radius-pill); width: 3rem; height: 3rem;
  transition: background var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out);
}
.sf-searchbar__submit:hover { background: var(--brand-hover); }
.sf-searchbar__submit:active { transform: scale(0.94); }
.sf-searchbar--lg .sf-searchbar__field { padding: 0.6rem 0.6rem 0.6rem 1.7rem; }
.sf-searchbar--lg .sf-searchbar__input { font-size: var(--text-lg); }
.sf-searchbar--lg .sf-searchbar__submit { width: 3.5rem; height: 3.5rem; }
.sf-searchbar__suggestions { display: flex; flex-wrap: wrap; gap: var(--space-2); padding-left: 0.4rem; }
.sf-searchbar__chip {
  font-family: var(--font-mono); font-size: var(--text-xs); letter-spacing: var(--tracking-snug);
  color: var(--text-muted); background: var(--surface-muted);
  border: var(--border-1) solid var(--border-subtle);
  border-radius: var(--radius-pill); padding: 0.4em 0.85em; cursor: pointer;
  transition: all var(--dur-base) var(--ease-out);
}
.sf-searchbar__chip:hover { border-color: var(--brand); color: var(--brand-strong); background: var(--gold-50); }
`;
function inject() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('sf-searchbar-css')) return;
  const s = document.createElement('style');
  s.id = 'sf-searchbar-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function SearchBar({
  placeholder = 'Ask Searchify anything about local…',
  size = 'md',
  suggestions = [],
  defaultValue = '',
  onSubmit,
  onSuggestion,
  className = '',
  ...rest
}) {
  inject();
  const [value, setValue] = React.useState(defaultValue);
  const submit = e => {
    e.preventDefault();
    onSubmit && onSubmit(value);
  };
  return /*#__PURE__*/React.createElement("form", _extends({
    className: ['sf-searchbar', `sf-searchbar--${size}`, className].filter(Boolean).join(' '),
    onSubmit: submit
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "sf-searchbar__field"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sf-searchbar__glyph",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "16.5",
    y1: "16.5",
    x2: "21",
    y2: "21"
  }))), /*#__PURE__*/React.createElement("input", {
    className: "sf-searchbar__input",
    value: value,
    placeholder: placeholder,
    onChange: e => setValue(e.target.value)
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "sf-searchbar__submit",
    "aria-label": "Search"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "18",
    y2: "12"
  }), /*#__PURE__*/React.createElement("polyline", {
    points: "12 6 18 12 12 18"
  })))), suggestions.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "sf-searchbar__suggestions"
  }, suggestions.map((s, i) => /*#__PURE__*/React.createElement("button", {
    type: "button",
    key: i,
    className: "sf-searchbar__chip",
    onClick: () => {
      setValue(s);
      onSuggestion && onSuggestion(s);
    }
  }, s))));
}
Object.assign(__ds_scope, { SearchBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/SearchBar.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.sf-avatar {
  display: inline-flex; align-items: center; justify-content: center;
  font-family: var(--font-sans); font-weight: var(--fw-semibold);
  color: var(--ink-900); background: var(--gold-200);
  border-radius: var(--radius-pill); overflow: hidden;
  flex: none; user-select: none; line-height: 1;
}
.sf-avatar img { width: 100%; height: 100%; object-fit: cover; }
.sf-avatar--sm { width: 1.75rem; height: 1.75rem; font-size: var(--text-xs); }
.sf-avatar--md { width: 2.5rem;  height: 2.5rem;  font-size: var(--text-sm); }
.sf-avatar--lg { width: 3.25rem; height: 3.25rem; font-size: var(--text-md); }
.sf-avatar--mint  { background: var(--mint-200); color: var(--olive-700); }
.sf-avatar--ink   { background: var(--ink-800); color: var(--mint-50); }
.sf-avatar--olive { background: var(--olive-300); color: var(--ink-900); }
`;
function inject() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('sf-avatar-css')) return;
  const s = document.createElement('style');
  s.id = 'sf-avatar-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0] || '').join('').toUpperCase();
}
function Avatar({
  name = '',
  src,
  size = 'md',
  tone = 'gold',
  className = '',
  ...rest
}) {
  inject();
  const cls = ['sf-avatar', `sf-avatar--${size}`, tone !== 'gold' ? `sf-avatar--${tone}` : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name
  }) : initials(name));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.sf-badge {
  display: inline-flex; align-items: center; gap: 0.4em;
  font-family: var(--font-sans);
  font-weight: var(--fw-semibold);
  font-size: var(--text-xs);
  line-height: 1;
  letter-spacing: var(--tracking-snug);
  padding: 0.4em 0.7em;
  border-radius: var(--radius-pill);
  border: var(--border-1) solid transparent;
  white-space: nowrap;
}
.sf-badge--dot::before {
  content: ""; width: 0.5em; height: 0.5em; border-radius: 50%;
  background: currentColor; flex: none;
}
.sf-badge--neutral { background: var(--surface-muted); color: var(--text-muted); border-color: var(--border-subtle); }
.sf-badge--brand   { background: var(--gold-100); color: var(--gold-800); }
.sf-badge--accent  { background: var(--olive-100); color: var(--olive-700); }
.sf-badge--mint    { background: var(--mint-100); color: var(--olive-700); }
.sf-badge--success { background: var(--success-100); color: var(--success-700); }
.sf-badge--warning { background: var(--warning-100); color: var(--warning-700); }
.sf-badge--danger  { background: var(--danger-100); color: var(--danger-700); }
.sf-badge--info    { background: var(--info-100); color: var(--info-700); }
.sf-badge--solid   { background: var(--surface-ink); color: var(--text-on-ink); }
`;
function inject() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('sf-badge-css')) return;
  const s = document.createElement('style');
  s.id = 'sf-badge-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Badge({
  tone = 'neutral',
  dot = false,
  className = '',
  children,
  ...rest
}) {
  inject();
  const cls = ['sf-badge', `sf-badge--${tone}`, dot ? 'sf-badge--dot' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.sf-btn {
  --_bg: var(--brand);
  --_fg: var(--text-on-brand);
  --_bd: transparent;
  display: inline-flex; align-items: center; justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-sans);
  font-weight: var(--fw-semibold);
  letter-spacing: var(--tracking-snug);
  border: var(--border-1) solid var(--_bd);
  background: var(--_bg);
  color: var(--_fg);
  border-radius: var(--radius-pill);
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  transition: transform var(--dur-fast) var(--ease-out),
              background var(--dur-base) var(--ease-out),
              box-shadow var(--dur-base) var(--ease-out),
              border-color var(--dur-base) var(--ease-out);
}
.sf-btn:hover { text-decoration: none; }
.sf-btn:active { transform: translateY(1px) scale(0.985); }
.sf-btn:disabled, .sf-btn[aria-disabled="true"] { opacity: 0.45; cursor: not-allowed; transform: none; }
.sf-btn svg { width: 1.15em; height: 1.15em; }

/* sizes */
.sf-btn--sm { font-size: var(--text-sm);  padding: 0.5rem 0.95rem;  }
.sf-btn--md { font-size: var(--text-base); padding: 0.7rem 1.3rem;  }
.sf-btn--lg { font-size: var(--text-md);  padding: 0.95rem 1.75rem; }

/* variants */
.sf-btn--primary { --_bg: var(--brand); --_fg: var(--text-on-brand); box-shadow: var(--shadow-sm); }
.sf-btn--primary:hover { --_bg: var(--brand-hover); box-shadow: var(--shadow-brand); }
.sf-btn--primary:active { --_bg: var(--brand-press); }

.sf-btn--secondary { --_bg: var(--surface-ink); --_fg: var(--text-on-ink); }
.sf-btn--secondary:hover { --_bg: var(--ink-800); }

.sf-btn--outline { --_bg: transparent; --_fg: var(--text-strong); --_bd: var(--border-default); }
.sf-btn--outline:hover { --_bd: var(--brand); --_bg: var(--gold-50); }

.sf-btn--ghost { --_bg: transparent; --_fg: var(--text-strong); }
.sf-btn--ghost:hover { --_bg: var(--surface-muted); }

.sf-btn--icon { padding: 0; aspect-ratio: 1; border-radius: var(--radius-pill); }
.sf-btn--icon.sf-btn--sm { width: 2.1rem; }
.sf-btn--icon.sf-btn--md { width: 2.6rem; }
.sf-btn--icon.sf-btn--lg { width: 3.1rem; }
.sf-btn--block { width: 100%; }
`;
function inject() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('sf-btn-css')) return;
  const s = document.createElement('style');
  s.id = 'sf-btn-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Button({
  variant = 'primary',
  size = 'md',
  iconOnly = false,
  block = false,
  startIcon,
  endIcon,
  as = 'button',
  className = '',
  children,
  ...rest
}) {
  inject();
  const Tag = as;
  const cls = ['sf-btn', `sf-btn--${variant}`, `sf-btn--${size}`, iconOnly ? 'sf-btn--icon' : '', block ? 'sf-btn--block' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), startIcon, !iconOnly && children, iconOnly && children, endIcon);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.sf-card {
  background: var(--surface);
  border: var(--border-1) solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  transition: box-shadow var(--dur-base) var(--ease-out),
              transform var(--dur-base) var(--ease-out),
              border-color var(--dur-base) var(--ease-out);
}
.sf-card--flat    { box-shadow: none; }
.sf-card--raised  { box-shadow: var(--shadow-md); border-color: transparent; }
.sf-card--floating{ box-shadow: var(--shadow-lg); border-color: transparent; }
.sf-card--mint    { background: var(--surface-mint); border-color: transparent; }
.sf-card--ink     { background: var(--surface-ink); border-color: transparent; color: var(--text-on-ink); }
.sf-card--ink :is(h1,h2,h3,h4,h5) { color: var(--mint-50); }
.sf-card--interactive { cursor: pointer; }
.sf-card--interactive:hover { transform: translateY(-3px); box-shadow: var(--shadow-lg); border-color: var(--border-default); }
.sf-card--pad-sm { padding: var(--space-4); }
.sf-card--pad-lg { padding: var(--space-7); }
`;
function inject() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('sf-card-css')) return;
  const s = document.createElement('style');
  s.id = 'sf-card-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Card({
  variant = 'flat',
  pad = 'md',
  interactive = false,
  as = 'div',
  className = '',
  children,
  ...rest
}) {
  inject();
  const Tag = as;
  const cls = ['sf-card', `sf-card--${variant}`, pad !== 'md' ? `sf-card--pad-${pad}` : '', interactive ? 'sf-card--interactive' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.sf-eyebrow {
  display: inline-flex; align-items: center; gap: 0.55em;
  font-family: var(--font-mono);
  font-weight: var(--fw-medium);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-caps);
  text-transform: uppercase;
  color: var(--text-muted);
}
.sf-eyebrow--brand { color: var(--brand-strong); }
.sf-eyebrow--onink { color: var(--gold-300); }
.sf-eyebrow::before {
  content: ""; width: 1.6em; height: var(--border-1, 1px);
  background: currentColor; opacity: 0.5; flex: none;
}
.sf-eyebrow--bare::before { display: none; }
`;
function inject() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('sf-eyebrow-css')) return;
  const s = document.createElement('style');
  s.id = 'sf-eyebrow-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Eyebrow({
  tone = 'muted',
  rule = true,
  className = '',
  children,
  ...rest
}) {
  inject();
  const cls = ['sf-eyebrow', tone !== 'muted' ? `sf-eyebrow--${tone}` : '', rule ? '' : 'sf-eyebrow--bare', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.sf-field { display: flex; flex-direction: column; gap: var(--space-2); font-family: var(--font-sans); }
.sf-field__label {
  font-size: var(--text-sm); font-weight: var(--fw-semibold);
  color: var(--text-strong); letter-spacing: var(--tracking-snug);
}
.sf-field__hint { font-size: var(--text-xs); color: var(--text-subtle); }
.sf-field__error { font-size: var(--text-xs); color: var(--danger-700); font-weight: var(--fw-medium); }

.sf-input {
  display: flex; align-items: center; gap: var(--space-2);
  background: var(--surface);
  border: var(--border-1) solid var(--border-default);
  border-radius: var(--radius-md);
  padding: 0 var(--space-3);
  box-shadow: var(--shadow-inset);
  transition: border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out);
}
.sf-input:focus-within {
  border-color: var(--brand);
  box-shadow: 0 0 0 3px var(--gold-100);
}
.sf-input--error { border-color: var(--danger-500); }
.sf-input--error:focus-within { box-shadow: 0 0 0 3px var(--danger-100); }
.sf-input__control {
  flex: 1; border: none; outline: none; background: transparent;
  font-family: inherit; font-size: var(--text-base); color: var(--text-strong);
  padding: 0.65rem 0; min-width: 0;
}
.sf-input__control::placeholder { color: var(--text-subtle); }
.sf-input__affix { color: var(--text-subtle); display: inline-flex; flex: none; }
.sf-input__affix svg { width: 1.15rem; height: 1.15rem; }
.sf-input--sm .sf-input__control { padding: 0.45rem 0; font-size: var(--text-sm); }
.sf-input--lg .sf-input__control { padding: 0.85rem 0; font-size: var(--text-md); }
.sf-input[aria-disabled="true"] { opacity: 0.55; pointer-events: none; }
`;
function inject() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('sf-input-css')) return;
  const s = document.createElement('style');
  s.id = 'sf-input-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Input({
  label,
  hint,
  error,
  size = 'md',
  startIcon,
  endIcon,
  disabled = false,
  id,
  className = '',
  ...rest
}) {
  inject();
  const fieldId = id || (label ? `sf-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const wrapCls = ['sf-input', `sf-input--${size}`, error ? 'sf-input--error' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: "sf-field"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "sf-field__label",
    htmlFor: fieldId
  }, label), /*#__PURE__*/React.createElement("div", {
    className: wrapCls,
    "aria-disabled": disabled || undefined
  }, startIcon && /*#__PURE__*/React.createElement("span", {
    className: "sf-input__affix"
  }, startIcon), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    className: "sf-input__control",
    disabled: disabled
  }, rest)), endIcon && /*#__PURE__*/React.createElement("span", {
    className: "sf-input__affix"
  }, endIcon)), error ? /*#__PURE__*/React.createElement("span", {
    className: "sf-field__error"
  }, error) : hint && /*#__PURE__*/React.createElement("span", {
    className: "sf-field__hint"
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const CSS = `
.sf-switch { display: inline-flex; align-items: center; gap: var(--space-3); cursor: pointer; font-family: var(--font-sans); }
.sf-switch input { position: absolute; opacity: 0; width: 0; height: 0; }
.sf-switch__track {
  position: relative; width: 2.6rem; height: 1.5rem; flex: none;
  background: var(--ink-300); border-radius: var(--radius-pill);
  transition: background var(--dur-base) var(--ease-out);
}
.sf-switch__thumb {
  position: absolute; top: 3px; left: 3px; width: 1.125rem; height: 1.125rem;
  background: var(--white); border-radius: 50%;
  box-shadow: var(--shadow-sm);
  transition: transform var(--dur-base) var(--ease-spring);
}
.sf-switch input:checked + .sf-switch__track { background: var(--brand); }
.sf-switch input:checked + .sf-switch__track .sf-switch__thumb { transform: translateX(1.1rem); }
.sf-switch input:focus-visible + .sf-switch__track { box-shadow: 0 0 0 3px var(--gold-100); }
.sf-switch__label { font-size: var(--text-sm); font-weight: var(--fw-medium); color: var(--text-strong); }
.sf-switch[aria-disabled="true"] { opacity: 0.5; cursor: not-allowed; }
`;
function inject() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('sf-switch-css')) return;
  const s = document.createElement('style');
  s.id = 'sf-switch-css';
  s.textContent = CSS;
  document.head.appendChild(s);
}
function Switch({
  checked,
  defaultChecked,
  onChange,
  label,
  disabled = false,
  className = '',
  ...rest
}) {
  inject();
  return /*#__PURE__*/React.createElement("label", {
    className: ['sf-switch', className].filter(Boolean).join(' '),
    "aria-disabled": disabled || undefined
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: onChange,
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "sf-switch__track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sf-switch__thumb"
  })), label && /*#__PURE__*/React.createElement("span", {
    className: "sf-switch__label"
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/DashboardApp.jsx
try { (() => {
/* Searchify dashboard — app shell (sidebar + topbar + overview) */
;
(function () {
  const {
    Logo,
    Button,
    Avatar,
    Input,
    Badge,
    Eyebrow
  } = window.SearchifyDesignSystem_d2707b;
  const ShellIcon = window.SfIcon;
  const NAV = [{
    id: 'overview',
    icon: 'layout-dashboard',
    label: 'Overview'
  }, {
    id: 'sources',
    icon: 'database',
    label: 'Sources'
  }, {
    id: 'coverage',
    icon: 'bar-chart',
    label: 'Coverage'
  }, {
    id: 'answers',
    icon: 'message-circle',
    label: 'Answers'
  }, {
    id: 'settings',
    icon: 'settings',
    label: 'Settings'
  }];
  function Sidebar({
    active,
    setActive
  }) {
    return /*#__PURE__*/React.createElement("aside", {
      style: {
        width: 248,
        flex: 'none',
        background: 'var(--surface)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        padding: 'var(--space-5) var(--space-3)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '0 var(--space-2) var(--space-5)'
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      size: "sm"
    })), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }
    }, NAV.map(n => {
      const on = active === n.id;
      return /*#__PURE__*/React.createElement("button", {
        key: n.id,
        onClick: () => setActive(n.id),
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          padding: '10px 12px',
          border: 'none',
          cursor: 'pointer',
          borderRadius: 'var(--radius-md)',
          textAlign: 'left',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          fontWeight: 600,
          background: on ? 'var(--gold-100)' : 'transparent',
          color: on ? 'var(--gold-800)' : 'var(--text-muted)'
        }
      }, /*#__PURE__*/React.createElement(ShellIcon, {
        name: n.icon,
        size: 18
      }), n.label);
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: '10px 12px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface-muted)'
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: "Sahar Bakery",
      tone: "gold",
      size: "sm"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 'var(--text-sm)',
        color: 'var(--text-strong)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, "Sahar Bakery"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: 'var(--text-subtle)',
        fontFamily: 'var(--font-mono)'
      }
    }, "Pro plan"))));
  }
  function TopBar() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        padding: 'var(--space-4) var(--space-6)',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'var(--surface)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        maxWidth: 360
      }
    }, /*#__PURE__*/React.createElement(Input, {
      placeholder: "Search sources, answers\u2026",
      startIcon: /*#__PURE__*/React.createElement(ShellIcon, {
        name: "search",
        size: 17
      }),
      size: "sm"
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      iconOnly: true,
      size: "md",
      "aria-label": "Notifications"
    }, /*#__PURE__*/React.createElement(ShellIcon, {
      name: "bell",
      size: 19
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      startIcon: /*#__PURE__*/React.createElement(ShellIcon, {
        name: "upload",
        size: 15
      })
    }, "Add source"));
  }
  function Overview() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 'var(--space-6)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, {
      tone: "brand"
    }, "Sahar Bakery \xB7 Mission District"), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: 'var(--space-2) 0 0',
        fontSize: 'var(--text-2xl)'
      }
    }, "Sources & coverage")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 'var(--space-4)'
      }
    }, /*#__PURE__*/React.createElement(StatCard, {
      label: "Embeddings",
      value: "1,284",
      delta: "+126 this week"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "GEO coverage",
      value: "92%",
      delta: "+4 pts"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Answer wins",
      value: "318",
      delta: "+57 this week"
    }), /*#__PURE__*/React.createElement(StatCard, {
      label: "Median latency",
      value: "240ms",
      delta: "p50",
      tone: "neutral"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr',
        gap: 'var(--space-5)',
        alignItems: 'start'
      }
    }, /*#__PURE__*/React.createElement(SourcesPanel, null), /*#__PURE__*/React.createElement(CoveragePanel, null)));
  }
  function Placeholder({
    label
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 'var(--space-9)',
        textAlign: 'center',
        color: 'var(--text-subtle)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex',
        marginBottom: 'var(--space-3)'
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      variant: "mark",
      size: "md"
    })), /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-sm)'
      }
    }, label, " \u2014 demo view"));
  }
  function DashboardApp() {
    const [active, setActive] = React.useState('overview');
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--bg-page)'
      }
    }, /*#__PURE__*/React.createElement(Sidebar, {
      active: active,
      setActive: setActive
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column'
      }
    }, /*#__PURE__*/React.createElement(TopBar, null), active === 'overview' ? /*#__PURE__*/React.createElement(Overview, null) : /*#__PURE__*/React.createElement(Placeholder, {
      label: NAV.find(n => n.id === active).label
    })));
  }
  window.DashboardApp = DashboardApp;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/DashboardApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dashboard/Panels.jsx
try { (() => {
/* Searchify dashboard — stat cards, source rows, coverage panel */
;
(function () {
  const {
    Card,
    Badge,
    Switch,
    Button,
    Avatar
  } = window.SearchifyDesignSystem_d2707b;
  const DashIcon = window.SfIcon;
  function StatCard({
    label,
    value,
    delta,
    tone = 'brand'
  }) {
    return /*#__PURE__*/React.createElement(Card, {
      variant: "flat",
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '.1em',
        textTransform: 'uppercase',
        color: 'var(--text-subtle)'
      }
    }, label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 'var(--text-2xl)',
        color: 'var(--text-strong)',
        lineHeight: 1
      }
    }, value), delta && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        color: tone === 'brand' ? 'var(--success-700)' : 'var(--text-muted)'
      }
    }, delta));
  }
  const SOURCES = [{
    icon: 'globe',
    name: 'sahar.shop',
    type: 'Website',
    status: 'Indexed',
    tone: 'success',
    live: true
  }, {
    icon: 'file',
    name: 'spring-menu.pdf',
    type: 'Menu · 42 items',
    status: 'Indexed',
    tone: 'success',
    live: true
  }, {
    icon: 'file',
    name: 'hours-and-faq.txt',
    type: 'Text file',
    status: 'Syncing',
    tone: 'warning',
    live: true
  }, {
    icon: 'globe',
    name: 'instagram.com/sahar',
    type: 'Social',
    status: 'Draft',
    tone: 'neutral',
    live: false
  }];
  function SourcesPanel() {
    return /*#__PURE__*/React.createElement(Card, {
      variant: "flat",
      pad: "md",
      style: {
        padding: 0,
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--space-4) var(--space-5)',
        borderBottom: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("h4", {
      style: {
        margin: 0
      }
    }, "Sources"), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm",
      startIcon: /*#__PURE__*/React.createElement(DashIcon, {
        name: "plus",
        size: 15
      })
    }, "Add source")), SOURCES.map((s, i) => /*#__PURE__*/React.createElement("div", {
      key: s.name,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        padding: 'var(--space-4) var(--space-5)',
        borderBottom: i < SOURCES.length - 1 ? '1px solid var(--border-subtle)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 38,
        height: 38,
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface-muted)',
        display: 'grid',
        placeItems: 'center',
        color: 'var(--ink-600)',
        flex: 'none'
      }
    }, /*#__PURE__*/React.createElement(DashIcon, {
      name: s.icon,
      size: 18
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, s.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-subtle)',
        fontFamily: 'var(--font-mono)'
      }
    }, s.type)), /*#__PURE__*/React.createElement(Badge, {
      tone: s.tone,
      dot: s.tone !== 'neutral'
    }, s.status), /*#__PURE__*/React.createElement(Switch, {
      defaultChecked: s.live
    }))));
  }
  const ENGINES = [{
    name: 'ChatGPT',
    pct: 98
  }, {
    name: 'Claude',
    pct: 94
  }, {
    name: 'Perplexity',
    pct: 88
  }, {
    name: 'Gemini',
    pct: 61
  }];
  function CoveragePanel() {
    return /*#__PURE__*/React.createElement(Card, {
      variant: "flat",
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("h4", {
      style: {
        margin: 0
      }
    }, "Answer-engine coverage"), /*#__PURE__*/React.createElement(Badge, {
      tone: "brand"
    }, "GEO")), ENGINES.map(e => /*#__PURE__*/React.createElement("div", {
      key: e.name,
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 'var(--text-sm)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, e.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        color: 'var(--text-muted)'
      }
    }, e.pct, "%")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 8,
        borderRadius: 999,
        background: 'var(--surface-inset)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: e.pct + '%',
        height: '100%',
        borderRadius: 999,
        background: e.pct > 80 ? 'var(--brand)' : 'var(--olive-400)'
      }
    })))));
  }
  Object.assign(window, {
    StatCard,
    SourcesPanel,
    CoveragePanel
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dashboard/Panels.jsx", error: String((e && e.message) || e) }); }

// ui_kits/search/Results.jsx
try { (() => {
/* Searchify search — answer card + result cards */
;
(function () {
  const {
    Card,
    Badge,
    Avatar,
    Button
  } = window.SearchifyDesignSystem_d2707b;
  const ResIcon = window.SfIcon;
  function MetaRow({
    children
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--space-3)',
        alignItems: 'center',
        color: 'var(--text-muted)',
        fontSize: 'var(--text-sm)'
      }
    }, children);
  }
  function Meta({
    icon,
    children
  }) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5
      }
    }, /*#__PURE__*/React.createElement(ResIcon, {
      name: icon,
      size: 15,
      style: {
        color: 'var(--text-subtle)'
      }
    }), children);
  }
  function AnswerCard({
    query,
    results
  }) {
    return /*#__PURE__*/React.createElement(Card, {
      variant: "ink",
      pad: "lg",
      style: {
        marginBottom: 'var(--space-5)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 'var(--space-3)'
      }
    }, /*#__PURE__*/React.createElement(ResIcon, {
      name: "spark",
      size: 18,
      style: {
        color: 'var(--gold-400)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '.12em',
        textTransform: 'uppercase',
        color: 'var(--gold-300)'
      }
    }, "Searchify answer")), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 'var(--text-md)',
        lineHeight: 1.6,
        color: 'var(--mint-50)'
      }
    }, "For ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: 'var(--gold-300)'
      }
    }, "\"", query, "\""), ", the strongest match is", ' ', /*#__PURE__*/React.createElement("b", null, results[0].name), " \u2014 ", results[0].why.toLowerCase(), " ", ' ', /*#__PURE__*/React.createElement("b", null, results[1].name), " is a close second if you want ", results[1].tags[0].toLowerCase(), "."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        marginTop: 'var(--space-4)',
        flexWrap: 'wrap'
      }
    }, results.slice(0, 3).map(r => /*#__PURE__*/React.createElement("span", {
      key: r.name,
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        color: 'var(--mint-200)',
        background: 'rgba(238,255,219,0.1)',
        borderRadius: 'var(--radius-pill)',
        padding: '4px 10px'
      }
    }, "\u21B3 ", r.name))));
  }
  function ResultCard({
    r,
    rank
  }) {
    return /*#__PURE__*/React.createElement(Card, {
      variant: "flat",
      interactive: true,
      style: {
        display: 'flex',
        gap: 'var(--space-4)',
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: r.name,
      tone: rank === 0 ? 'gold' : 'mint',
      size: "lg"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("h4", {
      style: {
        margin: 0
      }
    }, r.name), rank === 0 && /*#__PURE__*/React.createElement(Badge, {
      tone: "brand"
    }, "Top match"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        color: 'var(--gold-700)',
        fontWeight: 700,
        fontSize: 'var(--text-sm)'
      }
    }, /*#__PURE__*/React.createElement(ResIcon, {
      name: "star",
      size: 14,
      style: {
        color: 'var(--gold-500)'
      }
    }), r.rating)), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '6px 0 10px',
        color: 'var(--text-muted)',
        fontSize: 'var(--text-sm)'
      }
    }, r.why), /*#__PURE__*/React.createElement(MetaRow, null, /*#__PURE__*/React.createElement(Meta, {
      icon: "map-pin"
    }, r.distance), /*#__PURE__*/React.createElement(Meta, {
      icon: "clock"
    }, r.hours), r.tags.map(t => /*#__PURE__*/React.createElement(Badge, {
      key: t,
      tone: "neutral"
    }, t)))), /*#__PURE__*/React.createElement(Button, {
      variant: "outline",
      size: "sm",
      endIcon: /*#__PURE__*/React.createElement(ResIcon, {
        name: "arrow-up-right",
        size: 14
      })
    }, "View"));
  }
  Object.assign(window, {
    AnswerCard,
    ResultCard
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/search/Results.jsx", error: String((e && e.message) || e) }); }

// ui_kits/search/SearchApp.jsx
try { (() => {
/* Searchify search — app shell + fake discovery data */
;
(function () {
  const {
    SearchBar,
    Logo,
    Button,
    Badge
  } = window.SearchifyDesignSystem_d2707b;
  const AppIcon = window.SfIcon;
  const RESULTS = [{
    name: 'Verena Coffee Bar',
    rating: '4.9',
    distance: '0.3 mi',
    hours: 'Open · til 9pm',
    tags: ['Espresso', 'Dog-friendly'],
    why: 'Hand-pulled single-origin espresso, dog bowls at the door, and a quiet back patio.'
  }, {
    name: 'Marisol Bakehouse',
    rating: '4.8',
    distance: '0.5 mi',
    hours: 'Open · til 10pm',
    tags: ['Vegan', 'Open late'],
    why: 'All-vegan brunch and pastries served late, with a famous mushroom toast.'
  }, {
    name: 'Olive & Oak',
    rating: '4.7',
    distance: '0.8 mi',
    hours: 'Open · til 11pm',
    tags: ['Brunch', 'Patio'],
    why: 'Mediterranean brunch plates and a heated patio that welcomes dogs.'
  }, {
    name: 'The Mission Roastery',
    rating: '4.6',
    distance: '1.1 mi',
    hours: 'Open · til 8pm',
    tags: ['Espresso', 'Wifi'],
    why: 'Serious coffee program with fast wifi and plenty of plugs for working.'
  }];
  function SearchApp() {
    const initial = (() => {
      try {
        return decodeURIComponent(new URLSearchParams(location.search).get('q') || '');
      } catch (e) {
        return '';
      }
    })();
    const [query, setQuery] = React.useState(initial);
    const [submitted, setSubmitted] = React.useState(!!initial);
    const run = q => {
      setQuery(q);
      setSubmitted(!!(q && q.trim()));
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: '100vh',
        background: 'var(--bg-page)'
      }
    }, /*#__PURE__*/React.createElement("header", {
      style: {
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(246,255,238,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container-lg)',
        margin: '0 auto',
        padding: '12px var(--space-5)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-5)'
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      size: "sm",
      as: "a",
      href: "../website/index.html",
      style: {
        textDecoration: 'none',
        flex: 'none'
      }
    }), submitted && /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        maxWidth: 560
      }
    }, /*#__PURE__*/React.createElement(SearchBar, {
      size: "md",
      defaultValue: query,
      onSubmit: run,
      placeholder: "Ask Searchify anything about local\u2026"
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      style: {
        marginLeft: 'auto',
        flex: 'none'
      }
    }, "Sign in"))), !submitted ? /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container-md)',
        margin: '0 auto',
        padding: 'var(--space-10) var(--space-5)',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex',
        marginBottom: 'var(--space-5)'
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      variant: "mark",
      size: "lg"
    })), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: 'var(--text-3xl)',
        margin: '0 0 var(--space-3)'
      }
    }, "Ask in plain words."), /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--text-muted)',
        fontSize: 'var(--text-lg)',
        margin: '0 auto var(--space-6)',
        maxWidth: 460
      }
    }, "Searchify reads verified shop data and answers like a local friend would."), /*#__PURE__*/React.createElement(SearchBar, {
      size: "lg",
      defaultValue: query,
      onSubmit: run,
      onSuggestion: run,
      placeholder: "Try it: ask for anything local\u2026",
      suggestions: ['vegan brunch near me', 'open late & dog-friendly', 'best espresso in Mission', 'quiet cafe with wifi']
    })) : /*#__PURE__*/React.createElement("main", {
      style: {
        maxWidth: 'var(--container-md)',
        margin: '0 auto',
        padding: 'var(--space-7) var(--space-5)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        marginBottom: 'var(--space-5)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-xs)',
        color: 'var(--text-subtle)'
      }
    }, RESULTS.length, " verified shops \xB7 sourced from Searchify data"), /*#__PURE__*/React.createElement(Badge, {
      tone: "success",
      dot: true
    }, "Live")), /*#__PURE__*/React.createElement(AnswerCard, {
      query: query || 'local spots near me',
      results: RESULTS
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)'
      }
    }, RESULTS.map((r, i) => /*#__PURE__*/React.createElement(ResultCard, {
      key: r.name,
      r: r,
      rank: i
    })))));
  }
  window.SearchApp = SearchApp;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/search/SearchApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/shared/icons.jsx
try { (() => {
/* Searchify UI kit — shared icon set.
   Lucide-style line icons (2px stroke, round caps). Exposed as window.SfIcon.
   Reference: lucide.dev — swap for the lucide CDN in production. */
;
(function () {
  const SF_ICON_PATHS = {
    search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "8"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "21",
      y1: "21",
      x2: "16.65",
      y2: "16.65"
    })),
    'arrow-right': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "5",
      y1: "12",
      x2: "19",
      y2: "12"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "12 5 19 12 12 19"
    })),
    'arrow-up-right': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "7",
      y1: "17",
      x2: "17",
      y2: "7"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "7 7 17 7 17 17"
    })),
    check: /*#__PURE__*/React.createElement("polyline", {
      points: "20 6 9 17 4 12"
    }),
    'check-circle': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "16 9.5 11 14.5 8.5 12"
    })),
    spark: /*#__PURE__*/React.createElement("path", {
      d: "M12 3 Q13.2 10.2 21 12 Q13.2 13.8 12 21 Q10.8 13.8 3 12 Q10.8 10.2 12 3 Z",
      fill: "currentColor",
      stroke: "none"
    }),
    store: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M3 9 L4.5 4 H19.5 L21 9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 9 v10 a1 1 0 0 0 1 1 h14 a1 1 0 0 0 1 -1 V9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 9 a2 2 0 0 0 4 0 a2 2 0 0 0 4 0 a2 2 0 0 0 4 0 a2 2 0 0 0 4 0"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M9 20 v-5 h6 v5"
    })),
    upload: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "17 8 12 3 7 8"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "3",
      x2: "12",
      y2: "15"
    })),
    link: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"
    })),
    globe: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "12",
      x2: "21",
      y2: "12"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M12 3 a14 14 0 0 1 0 18 a14 14 0 0 1 0 -18"
    })),
    database: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("ellipse", {
      cx: "12",
      cy: "5",
      rx: "8",
      ry: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 5 v6 a8 3 0 0 0 16 0 V5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 11 v6 a8 3 0 0 0 16 0 v-6"
    })),
    zap: /*#__PURE__*/React.createElement("polygon", {
      points: "13 2 4 14 11 14 11 22 20 10 13 10 13 2"
    }),
    'map-pin': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "10",
      r: "3"
    })),
    bell: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M10.3 21a1.94 1.94 0 0 0 3.4 0"
    })),
    settings: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "3"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
    })),
    'layout-dashboard': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "3",
      width: "7",
      height: "9",
      rx: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "3",
      width: "7",
      height: "5",
      rx: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "14",
      y: "12",
      width: "7",
      height: "9",
      rx: "1"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "3",
      y: "16",
      width: "7",
      height: "5",
      rx: "1"
    })),
    'bar-chart': /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "4",
      y1: "20",
      x2: "4",
      y2: "10"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "10",
      y1: "20",
      x2: "10",
      y2: "4"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "16",
      y1: "20",
      x2: "16",
      y2: "14"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "22",
      y1: "20",
      x2: "2",
      y2: "20"
    })),
    menu: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "6",
      x2: "21",
      y2: "6"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "12",
      x2: "21",
      y2: "12"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "18",
      x2: "21",
      y2: "18"
    })),
    'chevron-down': /*#__PURE__*/React.createElement("polyline", {
      points: "6 9 12 15 18 9"
    }),
    'chevron-right': /*#__PURE__*/React.createElement("polyline", {
      points: "9 6 15 12 9 18"
    }),
    x: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "6",
      y1: "6",
      x2: "18",
      y2: "18"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "18",
      y1: "6",
      x2: "6",
      y2: "18"
    })),
    plus: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "12",
      y1: "5",
      x2: "12",
      y2: "19"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "5",
      y1: "12",
      x2: "19",
      y2: "12"
    })),
    clock: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "9"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "12 7 12 12 15 14"
    })),
    star: /*#__PURE__*/React.createElement("polygon", {
      points: "12 2 15 9 22 9.3 16.5 14 18.5 21 12 17 5.5 21 7.5 14 2 9.3 9 9 12 2"
    }),
    'message-circle': /*#__PURE__*/React.createElement("path", {
      d: "M21 11.5a8.5 8.5 0 0 1-12.5 7.5L3 21l2-5.5A8.5 8.5 0 1 1 21 11.5Z"
    }),
    file: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: "14 3 14 9 20 9"
    })),
    filter: /*#__PURE__*/React.createElement("polygon", {
      points: "22 3 2 3 10 12.5 10 19 14 21 14 12.5 22 3"
    })
  };
  function SfIcon({
    name,
    size = 20,
    stroke = 2,
    className = '',
    style = {}
  }) {
    const path = SF_ICON_PATHS[name];
    return /*#__PURE__*/React.createElement("svg", {
      className: className,
      style: style,
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: stroke,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true"
    }, path);
  }
  window.SfIcon = SfIcon;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/shared/icons.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Chrome.jsx
try { (() => {
/* Searchify marketing site — top nav + footer */
;
(function () {
  const {
    Button,
    Logo
  } = window.SearchifyDesignSystem_d2707b;
  const Icon = window.SfIcon;
  function NavBar() {
    const links = ['Product', 'For shops', 'For people', 'Pricing'];
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(246,255,238,0.82)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container-xl)',
        margin: '0 auto',
        padding: '14px var(--space-5)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-6)'
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      size: "md",
      as: "a",
      href: "#",
      style: {
        textDecoration: 'none'
      }
    }), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: 'flex',
        gap: 'var(--space-5)',
        marginLeft: 'var(--space-4)'
      }
    }, links.map(l => /*#__PURE__*/React.createElement("a", {
      key: l,
      href: "#",
      style: {
        fontSize: 'var(--text-sm)',
        fontWeight: 600,
        color: 'var(--text-muted)',
        textDecoration: 'none'
      }
    }, l))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginLeft: 'auto',
        display: 'flex',
        gap: 'var(--space-2)',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm"
    }, "Sign in"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      endIcon: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-right",
        size: 15
      })
    }, "Try Searchify"))));
  }
  function Footer() {
    const cols = [['Product', ['Overview', 'For shops', 'For people', 'Pricing', 'Changelog']], ['Engines', ['ChatGPT', 'Claude', 'Perplexity', 'Gemini', 'Coverage']], ['Company', ['About', 'Careers', 'Blog', 'Contact']]];
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        background: 'var(--surface-ink)',
        color: 'var(--mint-200)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container-xl)',
        margin: '0 auto',
        padding: 'var(--space-8) var(--space-5) var(--space-6)',
        display: 'grid',
        gridTemplateColumns: '1.6fr repeat(3, 1fr)',
        gap: 'var(--space-6)'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Logo, {
      tone: "light",
      size: "md"
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 'var(--space-3)',
        maxWidth: 280,
        color: 'var(--mint-300)',
        fontSize: 'var(--text-sm)'
      }
    }, "The data bridge that makes local businesses the answer in every AI engine.")), cols.map(([title, items]) => /*#__PURE__*/React.createElement("div", {
      key: title
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '.12em',
        textTransform: 'uppercase',
        color: 'var(--gold-300)',
        marginBottom: 'var(--space-3)'
      }
    }, title), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10
      }
    }, items.map(i => /*#__PURE__*/React.createElement("a", {
      key: i,
      href: "#",
      style: {
        color: 'var(--mint-200)',
        textDecoration: 'none',
        fontSize: 'var(--text-sm)'
      }
    }, i)))))), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container-xl)',
        margin: '0 auto',
        padding: '0 var(--space-5) var(--space-6)',
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: '1px solid var(--border-onink)',
        paddingTop: 'var(--space-4)',
        fontSize: 'var(--text-xs)',
        color: 'var(--mint-300)'
      }
    }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Searchify, Inc."), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)'
      }
    }, "Be the answer.")));
  }
  Object.assign(window, {
    NavBar,
    Footer
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
/* Searchify marketing site — hero (dual-funnel) */
;
(function () {
  const {
    Button,
    Eyebrow,
    Badge,
    SearchBar,
    Card
  } = window.SearchifyDesignSystem_d2707b;
  const HeroIcon = window.SfIcon;
  function Hero({
    onSearch
  }) {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-page)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container-lg)',
        margin: '0 auto',
        padding: 'var(--space-9) var(--space-5) var(--space-8)',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      tone: "brand",
      rule: false,
      style: {
        justifyContent: 'center'
      }
    }, "AEO & GEO for local \xB7 live across ChatGPT, Claude, Perplexity"), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: 'clamp(40px, 6.5vw, 84px)',
        lineHeight: 1.02,
        margin: 'var(--space-4) 0 var(--space-4)',
        letterSpacing: 'var(--tracking-tight)'
      }
    }, "Be the ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--brand)'
      }
    }, "answer.")), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 'var(--text-lg)',
        color: 'var(--text-muted)',
        maxWidth: 620,
        margin: '0 auto var(--space-6)'
      }
    }, "Searchify turns your shop's website, menu, or notes into AI-native data \u2014 so customers find you the moment they ask an answer engine."), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 640,
        margin: '0 auto'
      }
    }, /*#__PURE__*/React.createElement(SearchBar, {
      size: "lg",
      placeholder: "Try it: ask for anything local\u2026",
      suggestions: ['vegan brunch near me', 'open late & dog-friendly', 'best espresso in Mission'],
      onSubmit: onSearch,
      onSuggestion: onSearch
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 'var(--space-6)',
        padding: '10px 10px 10px 18px',
        background: 'var(--surface)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-pill)',
        boxShadow: 'var(--shadow-sm)'
      }
    }, /*#__PURE__*/React.createElement(HeroIcon, {
      name: "store",
      size: 18,
      style: {
        color: 'var(--accent-strong)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 600,
        color: 'var(--text-strong)',
        fontSize: 'var(--text-sm)'
      }
    }, "Own a local business?"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      endIcon: /*#__PURE__*/React.createElement(HeroIcon, {
        name: "arrow-right",
        size: 15
      })
    }, "Market your product \u2014 contact us"))));
  }
  const PARTNERS = ['OpenAI', 'Anthropic', 'Perplexity', 'AWS', 'Gemini', 'Mistral'];
  function TrustNetwork() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: 'var(--surface)',
        borderBlock: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container-xl)',
        margin: '0 auto',
        padding: 'var(--space-6) var(--space-5)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        letterSpacing: '.12em',
        textTransform: 'uppercase',
        color: 'var(--text-subtle)',
        textAlign: 'center',
        marginBottom: 'var(--space-5)'
      }
    }, "Trusted third-party network \u2014 connected & syncing"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 'var(--space-7)'
      }
    }, PARTNERS.map(p => /*#__PURE__*/React.createElement("span", {
      key: p,
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'var(--text-lg)',
        color: 'var(--ink-400)',
        letterSpacing: '-0.01em'
      }
    }, p)))));
  }
  Object.assign(window, {
    Hero,
    TrustNetwork
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Sections.jsx
try { (() => {
/* Searchify marketing site — Two Pathways + Integration Pipeline */
;
(function () {
  const {
    Button,
    Eyebrow,
    Card,
    Badge
  } = window.SearchifyDesignSystem_d2707b;
  const SecIcon = window.SfIcon;
  function Feature({
    icon,
    title,
    body,
    onink
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 'var(--space-3)',
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 'none',
        width: 38,
        height: 38,
        borderRadius: 'var(--radius-md)',
        display: 'grid',
        placeItems: 'center',
        background: onink ? 'rgba(238,255,219,0.1)' : 'var(--gold-100)',
        color: onink ? 'var(--gold-300)' : 'var(--gold-700)'
      }
    }, /*#__PURE__*/React.createElement(SecIcon, {
      name: icon,
      size: 20
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 700,
        fontSize: 'var(--text-md)',
        color: onink ? 'var(--mint-50)' : 'var(--text-strong)'
      }
    }, title), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '4px 0 0',
        fontSize: 'var(--text-sm)',
        color: onink ? 'var(--mint-300)' : 'var(--text-muted)'
      }
    }, body)));
  }
  function TwoPathways({
    onSearch
  }) {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        maxWidth: 'var(--container-xl)',
        margin: '0 auto',
        padding: 'var(--space-9) var(--space-5)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        marginBottom: 'var(--space-7)'
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      tone: "brand",
      rule: false,
      style: {
        justifyContent: 'center'
      }
    }, "Two pathways, one platform"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 'var(--text-2xl)',
        margin: 'var(--space-3) 0 0'
      }
    }, "Built for both sides of the search.")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--space-5)'
      }
    }, /*#__PURE__*/React.createElement(Card, {
      variant: "flat",
      pad: "lg",
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)'
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "brand"
    }, "For local shops")), /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: 0,
        fontSize: 'var(--text-xl)'
      }
    }, "Turn your business into AI-native data."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)'
      }
    }, /*#__PURE__*/React.createElement(Feature, {
      icon: "database",
      title: "Vector embedding conversion",
      body: "Your site, menu, and docs become structured embeddings tuned for answer engines."
    }), /*#__PURE__*/React.createElement(Feature, {
      icon: "layout-dashboard",
      title: "Dashboard management",
      body: "One place to edit context, watch coverage, and publish updates instantly."
    }), /*#__PURE__*/React.createElement(Feature, {
      icon: "bar-chart",
      title: "Generative ranking",
      body: "See where you surface \u2014 and climb to the top recommendation."
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      endIcon: /*#__PURE__*/React.createElement(SecIcon, {
        name: "arrow-right",
        size: 16
      }),
      style: {
        alignSelf: 'flex-start'
      }
    }, "Market your product")), /*#__PURE__*/React.createElement(Card, {
      variant: "ink",
      pad: "lg",
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)'
      }
    }, /*#__PURE__*/React.createElement(Badge, {
      tone: "mint"
    }, "For people"), /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: 0,
        fontSize: 'var(--text-xl)',
        color: 'var(--mint-50)'
      }
    }, "Ask in plain words. Get the real answer."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)'
      }
    }, /*#__PURE__*/React.createElement(Feature, {
      onink: true,
      icon: "map-pin",
      title: "Context-rich local discovery",
      body: "Hours, vibe, diet, distance \u2014 search the way you'd actually ask a friend."
    }), /*#__PURE__*/React.createElement(Feature, {
      onink: true,
      icon: "zap",
      title: "Fast, factual answers",
      body: "No SEO spam. Straight, sourced results pulled from verified shop data."
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      endIcon: /*#__PURE__*/React.createElement(SecIcon, {
        name: "arrow-right",
        size: 16
      }),
      style: {
        alignSelf: 'flex-start'
      },
      onClick: () => onSearch && onSearch('best espresso in Mission')
    }, "Explore products \u2014 try it now"))));
  }
  const STEPS = [{
    n: '01',
    icon: 'upload',
    title: 'Drop in your context',
    body: 'Paste a website, upload a menu, or drag in a text file. No schema required.'
  }, {
    n: '02',
    icon: 'spark',
    title: 'Searchify vectorizes & syncs',
    body: 'We convert it to AI-native embeddings and push updates across the trusted provider network.'
  }, {
    n: '03',
    icon: 'message-circle',
    title: 'Match the question',
    body: 'When a customer asks an engine in natural language, your shop is the answer.'
  }];
  function Pipeline() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: 'var(--surface-mint)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 'var(--container-xl)',
        margin: '0 auto',
        padding: 'var(--space-9) var(--space-5)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        marginBottom: 'var(--space-7)'
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      tone: "brand",
      rule: false,
      style: {
        justifyContent: 'center'
      }
    }, "The integration pipeline"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: 'var(--text-2xl)',
        margin: 'var(--space-3) 0 0'
      }
    }, "From raw context to top result in three steps.")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--space-5)'
      }
    }, STEPS.map((s, i) => /*#__PURE__*/React.createElement(Card, {
      key: s.n,
      variant: "raised",
      pad: "lg",
      style: {
        position: 'relative'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-sm)',
        fontWeight: 600,
        color: 'var(--brand-strong)',
        marginBottom: 'var(--space-4)'
      }
    }, "STEP ", s.n), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 48,
        height: 48,
        borderRadius: 'var(--radius-md)',
        display: 'grid',
        placeItems: 'center',
        background: 'var(--gold-100)',
        color: 'var(--gold-700)',
        marginBottom: 'var(--space-4)'
      }
    }, /*#__PURE__*/React.createElement(SecIcon, {
      name: s.icon,
      size: 24
    })), /*#__PURE__*/React.createElement("h4", {
      style: {
        margin: '0 0 6px'
      }
    }, s.title), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        color: 'var(--text-muted)',
        fontSize: 'var(--text-sm)'
      }
    }, s.body))))));
  }
  Object.assign(window, {
    TwoPathways,
    Pipeline
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sections.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.SearchBar = __ds_scope.SearchBar;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Switch = __ds_scope.Switch;

})();
