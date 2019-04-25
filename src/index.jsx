import express from 'express';
import session from 'express-session';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { SheetsRegistry } from 'jss';
import { getInitialState } from 'graphql-hooks-ssr';

import ServerApp from './components/apps/ServerApp';
import html from './html';
import createClient from './middleware/graphql/createClient';
import createServer from './middleware/graphql/createServer';

// eslint-disable-next-line no-unused-vars
import connect from './middleware/db/connect';

const app = express();
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

app.use(
  '/graphql',
  createServer(),
);


app.use(
  '/static',
  express.static('dist'),
);

app.get('/*', async (req, res) => {
  const client = createClient();
  const sheetsRegistry = new SheetsRegistry();

  const App = (
    <ServerApp client={client} req={req} sheetsRegistry={sheetsRegistry} />
  );

  const initialState = await getInitialState({ App, client });

  const r = ReactDOMServer.renderToString(App);
  const css = sheetsRegistry.toString();
  res.write(html(r, css, initialState));
  res.end();
});

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
