var webpack = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

var getHtmlConfig = function(name) {
  return {
    template: './src/view/' + name + '.html',
    filename: 'view/' + name + '.html',
    inject: true,
    hash: true,
    chunks: ['common', name]
  };
}

var config = {
  entry: {
    'common': ['./src/page/common/index.js'],
    'index': ['./src/page/index/index.js'],
    'login': ['./src/page/login/index.js'],
  },
  output: {
    path: './dist',
    publicPath: '/dist',
    filename: 'js/[name].js'
  },
  // 加载外部变量或模块
  externals: {
    'jquery': 'window.jQuery'
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader','css-loader')},
      {test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'}
    ]
  },
  plugins: [
    // 提取全局与公用模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    }),
    // 单独处理 CSS
    new ExtractTextPlugin('css/[name].css'),
    // html 模板处理
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login')),
  ]
};

// npm run dev
if ('dev' == WEBPACK_ENV) {
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;