// libs
import React from 'react';
import Helmet from 'react-helmet';
import express from 'express';
import { match } from 'react-router';
import { renderToString } from 'react-dom/server';

import { configureServerStore } from '../configureStore';
import { createServerApp } from '../createApp';
import template from './template';
import route from '../route';
// import NotFound from '../routes/NotFound';

const app = express();
const port = 3000;
const ENV = process.env.NODE_ENV || 'development';
// const isDevelopment = ENV === 'development';

// Serving static files on only development env.
if (ENV === 'development') {
  app.use('/dist', express.static('dist'));
  app.use('/images', express.static('images'));
}

app.get('/ping', (req, res) => res.send('pong'));

app.use((req, res) => {
  match({ routes: route, location: req.url }, (err, redirect, renderProps) => {
    if (err) {
      console.error(err.stack || err);
      res.status(500).send('Internal Server Error');
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else if (renderProps) {
      const store = configureServerStore();

      const params = Object.assign({}, renderProps.params, {
        page: Number(req.query.page) || 1,
      });

      const promises = renderProps.components
        .map((c) => {
          if (c.fetch) {
            return c.fetch(store.dispatch, params);
          }
          return Promise.resolve(0);
        });

      /*
       * Specified an array index number because of the architecture of routing.
       * In the array of routing,
       * the first element(index number is 0) is the parent component(IndexRoute),
       * the second element(index number is 1) is the child component.
       * https://github.com/FiNCDeveloper/try_media_client/pull/312#issuecomment-339568234
       */
      // const categorySetting = CategoryTmpSettings[renderProps.routes[1].name];
      //
      // const isInvalidPage =
      //   categorySetting && params.page > categorySetting.totalPage;
      //
      Promise.all(promises).then(() => {
        const html = renderToString(createServerApp(store, renderProps));

        const finalState = store.getState();
        const head = Helmet.renderStatic();

        res.send(template(head, html, finalState));
      }).catch((err) => {
        console.error(err.stack || err);
        res.status(500).send('Internal Server Error');
      });
    } else {
      // const html = renderToString(<NotFound />);
      // res.status(404).send(errorTemplate(html, ENV));
    }
  });
});

// app.listen(port);
//


/**
 * Module dependencies.
 */

const http = require('http');

/**
 * Get port from environment and store in Express.
 */

app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}
