import Sequelize from 'sequelize';
import express from 'express';
import session from 'express-session';
import graphqlHTTP from 'express-graphql';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import graphql from 'graphql';
import { GraphQLClient, ClientContext } from 'graphql-hooks';
import memCache from 'graphql-hooks-memcache';
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
  const result = { ok: true, json: () => Promise.resolve(this.data).then(JSON.parse), data: {} };

  graphql(schema, body).then((res) => { result.data = res; return result; });
};


const app = express();
app.use(session({ secret: 'keyboard cat' }));

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
  const sheetsRegistry = new SheetsRegistry();

  // Create a sheetsManager instance.
  const sheetsManager = new Map();

  // Create a theme instance.
  const theme = createMuiTheme({
    palette: {
      primary: green,
      accent: red,
      type: 'light',
    },
    typography: {
      useNextVariants: true,
    },
  });

  const generateClassName = createGenerateClassName();
  const client = new GraphQLClient({
    url: '/hey',
    cache: memCache(),
    fetch: notFetch,
  });

  const context = {};

  const App = () => (
    <ClientContext.Provider value={client}>
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
          <ServerApp req={req} context={context} />
        </MuiThemeProvider>
      </JssProvider>
    </ClientContext.Provider>
  );

  const initialState = await getInitialState({ App, client });

  const r = ReactDOMServer.renderToString(<App />);
  const css = sheetsRegistry.toString();
  res.write(html(r, css, initialState));
  res.end();
});

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
