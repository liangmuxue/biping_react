const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Uglify = require('uglifyjs-webpack-plugin');
const AliyunOSSPlugin = require('aliyun-oss-webpack-plugin');

module.exports = merge(require('./webpack.config'), {
  devtool: 'none',

  output: {
    path: path.join(__dirname, '../docs'),
    publicPath: 'http://webapp.closerhearts.net.cn/',
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
    new AliyunOSSPlugin({
      accessKeyId: 'LTAIvAQwnZS1DyZE',
      accessKeySecret: 'akWYSJarftuqGat4tDUxlmcq7qr7UW',
      region: 'oss-cn-beijing',
      bucket: 'biping-webapp',
      headers: {
        'Cache-Control': 'max-age=3600',
      },
    }),
    new Uglify(),
  ],
});
