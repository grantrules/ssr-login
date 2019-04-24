import scripts from './manifest.json';

export default (app, css, initialState) => `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>My Page</title><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"></head><body><div id='content'>${app}
</div><style id="jss-server-side">${css}</style><script>window.__INITIAL_STATE__=${JSON.stringify(initialState).replace(/</g, '\\u003c')}</script><script src="${scripts['main.js']}" async></script></body></html>`;
