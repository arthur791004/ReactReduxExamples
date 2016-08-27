var path = require('path');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var plugins = [
  new CleanPlugin('build'),
  new ExtractPlugin('[name].[hash].css', { allChunks: true }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'app/index.html'),
    filename: 'index.html'
  }),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[chunkhash].js'),
  new webpack.optimize.OccurenceOrderPlugin()
];

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'app/index.js'),
    vendor: ['react', 'react-dom', 'material-ui'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractPlugin.extract('style', 'css!sass')
      },
      {
        test: /\.(jpg|git|png)$/,
        loader: 'url?limit=8192&name=images/[name].[hash:20].[ext]'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=8192&name=images/[name].[hash:20].[ext]'
      },
      {
        test:  /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=8192&minetype=application/font-woff2&name=images/[name].[hash:20].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: plugins,
  devtool: 'eval',
  devServer: {
    contentBase: 'build',
    host: '0.0.0.0',
  },
};
