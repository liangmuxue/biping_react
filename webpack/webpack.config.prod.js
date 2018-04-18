const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const Uglify = require('uglifyjs-webpack-plugin');

module.exports = merge(require('./webpack.config'), {
  devtool: 'none',

  output: {
    path: path.join(__dirname, '../docs'),
  },

  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: false,
    }),

    new CleanWebpackPlugin(['docs'], {
      root: path.resolve(__dirname, '../'),
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),

    new Uglify(),
  ],
});
