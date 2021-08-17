"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var path_1 = __importDefault(require("path"));
var serverless_http_1 = __importDefault(require("serverless-http"));
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var react_1 = __importDefault(require("react"));
var server_1 = require("react-dom/server");
// Import React application
var App_1 = __importDefault(require("./App"));
// Setup for Express
var app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
//app.use("assets", express.static(path.resolve(__dirname, "./assets")));
// Data to pass down, could be things like server headers or data fetched from an API
var data = {
    data: "Something here",
};
// Routing
var html = fs_1.default.readFileSync(path_1.default.resolve(__dirname, '../build/server.html'), 'utf8');
app.use('/build', express_1.default.static('../../build'));
app.get('/favicon.ico', function (req, res) { return res.sendStatus(204); });
app.get('*', function (req, res) {
    var serverData = {
        from: 'server',
    };
    var renderString = server_1.renderToString(react_1.default.createElement(App_1.default, { page: req.path.replace('/', '') }));
    var result = html
        .replace('<div id="root"></div>', "<div id=\"root\">" + renderString + "</div>")
        .replace('__DATA_FROM_SERVER__', JSON.stringify(serverData));
    res.send(result);
});
exports.handler = serverless_http_1.default(app);
