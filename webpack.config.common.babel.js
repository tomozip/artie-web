import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';

const ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: [
    // 'babel-polyfill',
    path.join(__dirname, 'src/client/index.js'),
    path.join(__dirname, 'src/scss/app.scss'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'client.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          plugins: [
            'transform-object-assign',
          ],
        },
      },
      {
        test: /\.svg$/,
        use: [
          'babel-loader',
          'react-svg-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin({
      filename: 'style.css',
    }),
  ],
  resolve: {
    alias: {
      config: path.join(__dirname, 'config', ENV),
    },
  },
};
