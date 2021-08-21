"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var react_1 = __importDefault(require("react"));
var serverless_http_1 = __importDefault(require("serverless-http"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var server_1 = require("react-dom/server");
// Import React application
var App_1 = __importDefault(require("./App"));
// Setup for Express
var app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use('/static', express_1.default.static('static'));
app.get('/favicon.ico', function (req, res) { return res.sendStatus(204); });
app.get('*', function (req, res) {
    var serverData = {
        from: 'server',
    };
    var renderString = server_1.renderToString(react_1.default.createElement(App_1.default, { page: req.path.replace('/', '') }));
    var result = template
        .replace('<div id="root"></div>', "<div id=\"root\">" + renderString + "</div>")
        .replace('__DATA_FROM_SERVER__', JSON.stringify(serverData));
    res.send(result);
});
exports.handler = serverless_http_1.default(app);
var template = "\n  <!doctype html>\n  <html lang=\"en\">\n\n  <head>\n    <meta charset=\"utf-8\" />\n    <link rel=\"icon\" href=\"/favicon.ico\" />\n    <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\" />\n    <meta name=\"theme-color\" content=\"#000000\" />\n    <meta name=\"description\" content=\"Web site created using create-react-app\" />\n    <link rel=\"apple-touch-icon\" href=\"/logo192.png\" />\n    <link rel=\"manifest\" href=\"/manifest.json\" />\n    <title>React App</title>\n  </head>\n\n  <body><noscript>You need to enable JavaScript to run this app.</noscript>\n    <div id=\"root\"></div>\n    <script>\n      window.__INIT_DATA__ = __DATA_FROM_SERVER__;\n    </script>\n    <script>!function (e) { function r(r) { for (var n, u, f = r[0], i = r[1], p = r[2], c = 0, s = []; c < f.length; c++)u = f[c], Object.prototype.hasOwnProperty.call(o, u) && o[u] && s.push(o[u][0]), o[u] = 0; for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]); for (a && a(r); s.length;)s.shift()(); return l.push.apply(l, p || []), t() } function t() { for (var e, r = 0; r < l.length; r++) { for (var t = l[r], n = !0, f = 1; f < t.length; f++) { var i = t[f]; 0 !== o[i] && (n = !1) } n && (l.splice(r--, 1), e = u(u.s = t[0])) } return e } var n = {}, o = { 1: 0 }, l = []; function u(r) { if (n[r]) return n[r].exports; var t = n[r] = { i: r, l: !1, exports: {} }; return e[r].call(t.exports, t, t.exports, u), t.l = !0, t.exports } u.m = e, u.c = n, u.d = function (e, r, t) { u.o(e, r) || Object.defineProperty(e, r, { enumerable: !0, get: t }) }, u.r = function (e) { \"undefined\" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: \"Module\" }), Object.defineProperty(e, \"__esModule\", { value: !0 }) }, u.t = function (e, r) { if (1 & r && (e = u(e)), 8 & r) return e; if (4 & r && \"object\" == typeof e && e && e.__esModule) return e; var t = Object.create(null); if (u.r(t), Object.defineProperty(t, \"default\", { enumerable: !0, value: e }), 2 & r && \"string\" != typeof e) for (var n in e) u.d(t, n, function (r) { return e[r] }.bind(null, n)); return t }, u.n = function (e) { var r = e && e.__esModule ? function () { return e.default } : function () { return e }; return u.d(r, \"a\", r), r }, u.o = function (e, r) { return Object.prototype.hasOwnProperty.call(e, r) }, u.p = \"/\"; var f = this[\"webpackJsonpnetlify-serverless-deploy\"] = this[\"webpackJsonpnetlify-serverless-deploy\"] || [], i = f.push.bind(f); f.push = r, f = f.slice(); for (var p = 0; p < f.length; p++)r(f[p]); var a = i; t() }([])</script>\n    <script src=\"/static/js/2.chunk.js\"></script>\n    <script src=\"/static/js/main.chunk.js\"></script>\n  </body>\n\n  </html>\n";
