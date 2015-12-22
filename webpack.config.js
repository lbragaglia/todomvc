
var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require("webpack");

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;

module.exports = {
  entry: PATHS.app,
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.app
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: PATHS.app
      }
    ]
  },
  devServer : {
    hot: true,
    inline: true,
    progress: true,
    historyApiFallback: true,
    stats: "errors-only",
    port: process.env.PORT,
    host: process.env.HOST
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'My app'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
