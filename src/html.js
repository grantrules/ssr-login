export default (app, css) => `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>My Page</title><link re l="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"></head><body><div id='content'>${app}
</div><style id="jss-server-side">${css}</style><script src="/static/client.bundle.js" async></script></body></html>`;
