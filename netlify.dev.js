const http = require('http');
const httpProxy = require('http-proxy');
const serveStatic = require('serve-static')
const path = require('path');
const fs = require('fs');
const static = serveStatic(path.join(__dirname, 'build'));

// const a = 'static';
// const b = 'favicon';

// const d = ['static', 'logo192.png', 'favicon.ico'].some(p => '/about'.startsWith(`/${p}`));
// console.log(d);

const staticPaths = fs.readdirSync('build').map(file => `/${file}`);
const proxy = httpProxy.createProxyServer({});
http.createServer(function(req, res) {
  const { url } = req;
  console.log('path', req.url);
  if (staticPaths.some(path => url.startsWith(`${path}`))) {
    console.log('static');
    static(req, res)
  } else {
    console.log('proxy');
    proxy.web(req, res, { target: 'http://localhost:9000/serverless' });
  }
}).listen(8800);