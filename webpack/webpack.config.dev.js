const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

module.exports = merge(require('./webpack.config'), {
  devtool: 'source-map',
  devServer: {
    compress: false,
    port: 9000,
    host: '0.0.0.0',
    contentBase: path.resolve(__dirname, '../src'),
    historyApiFallback: true,
    hot: true,
    disableHostCheck: true,
    publicPath: '/',
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
});
