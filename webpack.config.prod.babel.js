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
  ],
  devtool: 'source-map',
});
