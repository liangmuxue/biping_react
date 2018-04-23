const path = require('path');
const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '../src'),

  entry: {
    app: './index.js',
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
      name: ['vendor', 'manifest'],
      minChunks: ({ resource }) => (
        resource &&
      resource.indexOf('node_modules') >= 0 &&
      resource.match(/\.js$/)
      ),
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'echarts',
      minChunks: ({ resource } = {}) => (
        resource &&
      resource.includes('node_modules') &&
      /echarts|zrender/.test(resource)
      ),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'lodash',
      minChunks: ({ resource } = {}) => (
        resource &&
      resource.includes('node_modules') &&
      /lodash/.test(resource)
      ),
    }),
    new CopyWebpackPlugin([
      { from: 'assets/', to: '' },
    ]),
  ],
};
