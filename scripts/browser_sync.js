/**
 * Require Browsersync along with webpack and middleware for it
 */
const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('../webpack.config.dev.babel');

const bundler = webpack(webpackConfig);

browserSync({
  server: {
    baseDir: '/dist',

    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true },
        // http://webpack.github.io/docs/webpack-dev-middleware.html
      }),

      webpackHotMiddleware(bundler),
    ],
  },

  files: [
    'dist/css/*.css',
    'dist/*.html',
  ],
});
