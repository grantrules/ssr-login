/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { StaticRouter } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Routes from './routes';

const theme = createMuiTheme({});

function ServerApp({ req, context }) {
  return (
    <MuiThemeProvider
      theme={theme}
    >
      <CssBaseline />
      <StaticRouter location={req.url} context={context}>
        <Routes />
      </StaticRouter>
    </MuiThemeProvider>
  );
}

ServerApp.propTypes = {
  req: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
};

export default ServerApp;
