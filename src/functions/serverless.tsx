
// @ts-ignore
import React from "react";
import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import fetch from 'node-fetch';
import bodyParser from "body-parser";
import { renderToString } from "react-dom/server";
import App from "../App";
import parse5, { ParentNode, Element } from "parse5";
// @ts-ignore
import html from "../../build/server.html";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/favicon.ico', (req, res) => res.sendStatus(204));
app.get('*', async (req, res) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const {
    title,
    userId,
    id,
    completed
  } = await response.json();
  const serverData = {
    from: 'server',
  };
  //SEO
  const document = parse5.parse(html);
  const head = getHead([document]);
  changeMeta(head as ParentNode, {
    title,
    description: `userId: ${userId}, id: ${id}`,
  });

  const renderString = renderToString(<App page={req.path.replace('/', '')} />);
  const result = parse5.serialize(document)
    .replace('<div id="root"></div>', `<div id="root">${renderString}</div>`)
    .replace('__DATA_FROM_SERVER__', JSON.stringify(serverData));
  res.send(result);
});

exports.handler = serverless(app);

function getHead(q: ParentNode[]) {
  while(q.length > 0) {
    const target = q.shift();
    if (!target) {
      return null;
    }
    if (target.nodeName === 'head') {
      return target;
    } else if (target.childNodes) {
      q = q.concat(target.childNodes as ParentNode[]);
    }
  }
}

interface MetaData { title: string, description: string, image?: string};
function changeMeta(head: ParentNode, { title, description, image }: MetaData) {
  (head.childNodes as Element[]).forEach(({
    tagName,
    attrs
  }) => {
    if (tagName !== 'meta' || !attrs) return;
    if (tagName === 'meta') {
      setAttrsByProperty(attrs, 'og:title', title);
      setAttrsByProperty(attrs, 'twitter:title', title);
      setAttrsByName(attrs, 'description', description);
      setAttrsByProperty(attrs, 'og:description', description);
      setAttrsByProperty(attrs, 'twitter:description', description);
      if (image) {
        setAttrsByProperty(attrs, 'og:image', image);
      }
    }
  })
}

type Attrs = Element['attrs'];

function setAttrsByName(attrs: Attrs, attrName: string, value: string) {
  if (attrs && Array.from(attrs).some(({ name, value }) => name === 'name' && value === attrName )) {
    const content = Array.from(attrs).find(({ name }) => name === 'content');
    if (content) {
      content.value = value;
    }
  }
}
function setAttrsByProperty(attrs: Attrs, attrName: string, value: string) {
  if (attrs && Array.from(attrs).some(({ name, value }) => name === 'property' && value === attrName )) {
    const content = Array.from(attrs).find(({ name }) => name === 'content');
    if (content) {
      content.value = value;
    }
  }
}