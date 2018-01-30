import path from 'path';

const DEVELOPMENT = 'development';
const STAGING = 'staging';
const PRODUCTION = 'production';
const ENV = process.env.NODE_ENV || DEVELOPMENT;

// ------------------
// server js
// ------------------
const serverJSSetting = {
  entry: [
    path.join(__dirname, 'src/server/index.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: 'server.js',
  },
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: [
            'transform-object-assign',
          ],
        },
      },
    ],
  },
  resolve: {
    alias: {
      config: path.join(__dirname, 'config', ENV),
    },
  },
};

// ------------------
// exporting
// ------------------
const settings = [serverJSSetting];

export default settings;
