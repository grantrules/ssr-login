import Sequelize from 'sequelize';
import express from 'express';
import session from 'express-session';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { SheetsRegistry } from 'jss';
import memCache from 'graphql-hooks-memcache';
import { getInitialState } from 'graphql-hooks-ssr';

import ServerApp from './components/apps/ServerApp';
import html from './html';
import createClient from './middleware/graphql/createClient';
import createServer from './middleware/graphql/createServer';

import modelsInit from './models/init';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
});

sequelize
  .authenticate()
  .then(() => {
    modelsInit(sequelize);

    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

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
  const client = createClient({
    ssrMode: true,
    url: '/hey',
    cache: memCache(),
  });
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
