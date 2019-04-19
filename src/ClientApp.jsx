import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { GraphQLClient, ClientContext } from 'graphql-hooks';
import Routes from './routes';

const client = new GraphQLClient({
  url: '/graphql',
});

const theme = createMuiTheme({});

class ClientApp extends React.Component {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    return (
      <ClientContext.Provider value={client}>
        <MuiThemeProvider
          theme={theme}
        >
          <CssBaseline />
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </MuiThemeProvider>
      </ClientContext.Provider>
    );
  }
}

ReactDOM.hydrate(<ClientApp />,
  document.querySelector('#content'));
