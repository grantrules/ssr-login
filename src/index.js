import Sequelize from 'sequelize';
import express from 'express';
import session from 'express-session';
import graphqlHTTP from 'express-graphql';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import MyPage from './pages/MyPage';

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


const app = express();
app.use(session({ secret: 'keyboard cat' }));

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.get("/", (req, res) => {
	        const context = {};
	        res.write("<!DOCTYPE html><html><head><title>My Page</title></head><body>");
	        res.write("<div id='content'>");
	        res.write(ReactDOMServer.renderToString(
			                <StaticRouter location={req.url} context={context}>
			                        <MyPage/>
			                </StaticRouter>
			        ));
	        res.write("</div></body></html>");
	        res.end();
});

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
