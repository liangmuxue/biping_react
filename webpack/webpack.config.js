const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '../src'),

  entry: {
    app: './index.js',
    vendor: ['react', 'axios', 'dva', 'emoji'],
  },
  output: {
    filename: '[name]-bundle.js',
    chunkFilename: '[name]-[chunkhash].chunk.js',
  },

  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' },
          { loader: 'postcss-loader', options: { modules: true, importLoaders: 1 } },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
        include: /node_modules/,
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ['style-loader',
          { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
          'less-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
        loader: 'url-loader?limit=100000&name=images/[name].[ext]',
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      path.join(__dirname, '../src'),
      'node_modules',
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks(module) {
      // 该配置假定你引入的 vendor 存在于 node_modules 目录中
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),
    new CopyWebpackPlugin([
      { from: 'assets/', to: '' },
    ]),
  ],
};
