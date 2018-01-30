import webpack from 'webpack';
import merge from 'webpack-merge';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import common from './webpack.config.common.babel';

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: `css-loader?minimize!sass-loader?includePaths[]=${path.resolve(__dirname, './node_modules/compass-mixins/lib')}`,
          publicPath: '/dist',
        }),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
      sourceMap: true,
    }),
    // ignore moment locales apart from japanese
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ja/),
  ],
  devtool: 'source-map',
});
