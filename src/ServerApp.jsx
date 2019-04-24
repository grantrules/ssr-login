/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { StaticRouter } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ClientContext } from 'graphql-hooks';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import JssProvider from 'react-jss/lib/JssProvider';
import Routes from './routes';


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


const context = {};

function ServerApp({ req, client, sheetsRegistry }) {
  return (
    <ClientContext.Provider value={client}>
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>

          <CssBaseline />
          <StaticRouter location={req.url} context={context}>
            <Routes />
          </StaticRouter>
        </MuiThemeProvider>
      </JssProvider>
    </ClientContext.Provider>
  );
}

ServerApp.propTypes = {
  req: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  sheetsRegistry: PropTypes.object.isRequired,
};

export default ServerApp;
