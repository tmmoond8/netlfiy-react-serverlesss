// @ts-ignore
import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
// @ts-ignore
import html from "../build/.server.html";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', async (req, res) => {
  const serverData = {
    from: 'server',
  };
  const renderString = renderToString(
    <StaticRouter>
      <App />
    </StaticRouter>
  );
  const result = html
    .replace('<div id="root"></div>', `<div id="root">${renderString}</div>`)
    .replace('__DATA_FROM_SERVER__', JSON.stringify(serverData));
  res.send(result);
});

exports.handler = serverless(app);