import express  from 'express';
import fs from 'fs';
import path from 'path';
import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './App';

const app = express();
const html = fs.readFileSync(
  path.resolve(__dirname, '../build/server.html'),
  'utf8',
);
app.use('/build', express.static('build'));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', (req, res) => {
  const serverData = {
    from: 'server',
  };
  const renderString = renderToString(<App page={req.path} />);
  const result = html
    .replace('<div id="root"></div>', `<div id="root">${renderString}</div>`)
    .replace('__DATA_FROM_SERVER__', JSON.stringify(serverData));
  res.send(result);
});
app.listen(3000);