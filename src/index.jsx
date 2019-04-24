import Sequelize from 'sequelize';
import express from 'express';
import session from 'express-session';
import graphqlHTTP from 'express-graphql';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { SheetsRegistry } from 'jss';
import memCache from 'graphql-hooks-memcache';
import { graphql } from 'graphql';
import { GraphQLClient } from 'graphql-hooks';
import { getInitialState } from 'graphql-hooks-ssr';

import ServerApp from './ServerApp';
import html from './html';

import schema from './schema';

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

const notFetch = (_, { body }) => {
  const { query } = JSON.parse(body);
  const result = { ok: true, json() { return Promise.resolve(this.data); }, data: {} };

  return graphql(schema, query).then((res) => { result.data = res; return result; });
};


const app = express();
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);


app.use(
  '/static',
  express.static('dist'),
);

app.get('/*', async (req, res) => {
  const client = new GraphQLClient({
    url: '/hey',
    cache: memCache(),
    fetch: notFetch,
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
