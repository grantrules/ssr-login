import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Routes from './routes';

const theme = createMuiTheme({});

function ClientApp() {
  return (
    <MuiThemeProvider
      theme={theme}
    >
      <CssBaseline />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

ReactDOM.hydrate(<ClientApp />,
  document.querySelector('#content'));
