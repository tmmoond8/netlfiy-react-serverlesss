const parse5 = require('parse5');

const html = `
<!doctype html>
<html lang="en">

<head>
  <title>React App</title>
  <meta charset="utf-8" />
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="react serverless deploy to netlify" />
  <meta name="author" content="tmmoond8" />
  <meta name="keywords" content="netlify, ssr, react, functions" />
  <meta property="og:title" content="netlify-serverless-deploy" />
  <meta property="og:description" content="react serverless deploy to netlify" />
  <meta property="og:type" content="website" />
  <meta property="og:image"
    content="https://noticon-static.tammolo.com/dgggcrkxq/image/upload/v1566951043/noticon/mwlnqwvswaln1qpz43b6.png" />
  <meta property="og:image:type" content="image/png" />
  <meta property="og:image:width" content="400" />
  <meta property="og:image:height" content="200" />
  <meta property="og:url" content="https://github.com/tmmoond8/netlify-react-serverlesss" />
  <meta property="twitter:card" content="summary" />
  <meta property="twitter:creator" content="tmmoond8" />
  <meta property="twitter:title" content="netlify-serverless-deploy" />
  <meta property="twitter:description" content="react serverless deploy to netlify" />
  <link rel="apple-touch-icon" href="/logo192.png" />
  <link rel="manifest" href="/manifest.json" />
</head>

<body><noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
  <script>!function (e) { function r(r) { for (var n, u, f = r[0], i = r[1], p = r[2], c = 0, s = []; c < f.length; c++)u = f[c], Object.prototype.hasOwnProperty.call(o, u) && o[u] && s.push(o[u][0]), o[u] = 0; for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]); for (a && a(r); s.length;)s.shift()(); return l.push.apply(l, p || []), t() } function t() { for (var e, r = 0; r < l.length; r++) { for (var t = l[r], n = !0, f = 1; f < t.length; f++) { var i = t[f]; 0 !== o[i] && (n = !1) } n && (l.splice(r--, 1), e = u(u.s = t[0])) } return e } var n = {}, o = { 1: 0 }, l = []; function u(r) { if (n[r]) return n[r].exports; var t = n[r] = { i: r, l: !1, exports: {} }; return e[r].call(t.exports, t, t.exports, u), t.l = !0, t.exports } u.m = e, u.c = n, u.d = function (e, r, t) { u.o(e, r) || Object.defineProperty(e, r, { enumerable: !0, get: t }) }, u.r = function (e) { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }) }, u.t = function (e, r) { if (1 & r && (e = u(e)), 8 & r) return e; if (4 & r && "object" == typeof e && e && e.__esModule) return e; var t = Object.create(null); if (u.r(t), Object.defineProperty(t, "default", { enumerable: !0, value: e }), 2 & r && "string" != typeof e) for (var n in e) u.d(t, n, function (r) { return e[r] }.bind(null, n)); return t }, u.n = function (e) { var r = e && e.__esModule ? function () { return e.default } : function () { return e }; return u.d(r, "a", r), r }, u.o = function (e, r) { return Object.prototype.hasOwnProperty.call(e, r) }, u.p = "/"; var f = this["webpackJsonpnetlify-serverless-deploy"] = this["webpackJsonpnetlify-serverless-deploy"] || [], i = f.push.bind(f); f.push = r, f = f.slice(); for (var p = 0; p < f.length; p++)r(f[p]); var a = i; t() }([])</script>
  <script src="/static/js/2.chunk.js"></script>
  <script src="/static/js/main.chunk.js"></script>
</body>

</html>
`;
const document = parse5.parse(html);

const head = getHead([document]);
changeMeta(head);
console.log(parse5.serialize(document));

function getHead(q) {
  while(q.length > 0) {
    const target = q.shift();
    if (!target) {
      return null;
    }
    if (target.nodeName === 'head') {
      return target;
    } else if (target.childNodes) {
      q = q.concat(target.childNodes);
    }
  }
}

function changeMeta(head) {
  head.childNodes.forEach(({
    tagName,
    attrs
  }) => {
    if (tagName !== 'meta' || !attrs) return;
    if (tagName === 'meta') {
      setAttrsByName(attrs, 'description', 'abc');
      setAttrsByProperty(attrs, 'og:title', 'title');
      setAttrsByProperty(attrs, 'og:image', 'image');
      setAttrsByProperty(attrs, 'og:description', 'content');
      setAttrsByProperty(attrs, 'twitter:title', 'title');
      setAttrsByProperty(attrs, 'twitter:description', 'content');
    }
  })
}

function setAttrsByName(attrs, attrName, value) {
  if (attrs && Array.from(attrs).some(({ name, value }) => name === 'name' && value === attrName )) {
    const content = Array.from(attrs).find(({ name }) => name === 'content');
    content.value = value;
  }
}
function setAttrsByProperty(attrs, attrName, value) {
  if (attrs && Array.from(attrs).some(({ name, value }) => name === 'property' && value === attrName )) {
    const content = Array.from(attrs).find(({ name }) => name === 'content');
    content.value = value;
  }
}