'use strict';

const { resolve } = require('path')

module.exports = {
  entry: './app/main',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  target: 'electron-renderer',
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        include: resolve(__dirname, './app'),
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css$/, // use the style-loader/css-loader combos for anything matching the .css extension
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      // "file" loader for svg
      {
        test: /\.(woff2?|ttf|eot|svg)$/,
        loader: 'file-loader',
        query: {
          name: 'static/[name].[hash:8].[ext]'
        }
      }
    ]
  }
};
