/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { StaticRouter } from 'react-router';
import Routes from './routes';

export default function ServerApp({ req, context }) {
  return (
    <StaticRouter location={req.url} context={context}>
      <Routes />
    </StaticRouter>
  );
}

ServerApp.propTypes = {
  req: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
};
