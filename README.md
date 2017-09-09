Front End

## prepare
### 环境配置
nodejs: 构建工具 webpack 的环境依赖
nodejs 使用 4.4.7 版本，偶数版本为稳定版

### npm
初始化
```sh
npm init
```
安装
```sh
npm install xxx@v.v.v
```
全局安装
```sh
npm install xxx@v.v.v -g
```
卸载
```sh
npm uninstall xxx@v.v.v
```
改变 npm 源
```
npm --registry=https://registry.npm.taobao.org
```

### 初始化
```sh
# 生成 package.json
npm init

# 全局安装
npm install webpack -g

# 本地安装
# 初始化项目中的 webpack 依赖 并存到 package.json 中
# npm 优先使用项目中的 webpack
npm install webpack@1.15.0 --save-dev

# 查看版本号
webpack -v
```

## webpack
### config
entry: js 入口文件
externals: 外部依赖声明
output: 目标文件
resolve: 配置别名
module: 各种文件及 loader
plugins: 插件

```sh
module.exports = {
  entry: './src/page/index/index.js',
  output: {
    path: './dist',
    filename: 'app.js'
  }
};
```

### 编译打包
```sh
webpack
```

### 提取 config
```js
var config = {
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'app.js'
  }
};

module.exports = config;
```

### 多入口
```js
var config = {
  entry: {
    'index': ['./src/index.js'],
    'login': ['./src/login/index.js']
  },
  output: {
    path: './dist',
    filename: 'js/[name].js'
  }
};

module.exports = config;
```

### jQuery 引入
#### 方法一
```sh
npm install jquery --save
```
```js
var $ = require('jquery');
$('body').html('Hello Jquery');
```
#### 方法二
外部文件引入
```js
var config = {
  entry: {
    'index': ['./src/index.js'],
    'login': ['./src/login/index.js']
  },
  output: {
    path: './dist',
    filename: 'js/[name].js'
  }，
  externals: {
    'jquery': 'window.jQuery'
  }
};

module.exports = config;
```

### 自动提取公共模块
CommonChunkPlugin
```js
var webpack = require('webpack');

var config = {
  entry: {
    // 公共模块 全局
    'common': ['./src/module/index.js'],
    'index': ['./src/index.js'],
    'login': ['./src/login/index.js']
  },
  output: {
    path: './dist',
    filename: 'js/[name].js'
  }，
  externals: {
    'jquery': 'window.jQuery'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name : 'common',
      filename : 'js/base.js'
    })
  ]
};

module.exports = config;
```

### css loader 与 打包
```sh
npm install css-loader style-loader --save-dev
npm install extract-text-webpack-plugin@1.0.1 --save-dev
```
```js
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  entry: {
    // 公共模块 全局
    'common': ['./src/module/index.js'],
    'index': ['./src/index.js'],
    'login': ['./src/login/index.js']
  },
  output: {
    path: './dist',
    filename: 'js/[name].js'
  }，
  externals: {
    'jquery': 'window.jQuery'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')}
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name : 'common',
      filename : 'js/base.js'
    }),
    new ExtractTextPlugin('css/[name].css'),
  ]
};

module.exports = config;
```

### html 模板
```sh
npm install html-webpack-plugin --save-dev
npm install html-loader --save-dev
```
```js
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var getHtmlConfig = function (name) {
  return {
    template: './src/view/' + name + '.html',
    filename: 'view/' + name + '.html',
    inject: true,
    hash: true,
    chunks: ['common', name]
  }
}

var config = {
  entry: {
    // 公共模块 全局
    'common': ['./src/module/index.js'],
    'index': ['./src/index.js'],
    'login': ['./src/login/index.js']
  },
  output: {
    path: './dist',
    filename: 'js/[name].js'
  }，
  externals: {
    'jquery': 'window.jQuery'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')}
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name : 'common',
      filename : 'js/base.js'
    }),
    new ExtractTextPlugin('css/[name].css'),

    // html 模板处理
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login'))
  ]
};

module.exports = config;
```

抽取 html 公共头部
```
<%= require('html-loader!./layout/html-head.html') %>
```

### 图片字体
```sh
npm install url-loader --save-dev
```
```js
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var getHtmlConfig = function (name) {
  return {
    template: './src/view/' + name + '.html',
    filename: 'view/' + name + '.html',
    inject: true,
    hash: true,
    chunks: ['common', name]
  }
}

var config = {
  entry: {
    // 公共模块 全局
    'common': ['./src/module/index.js'],
    'index': ['./src/index.js'],
    'login': ['./src/login/index.js']
  },
  output: {
    path: './dist',
    filename: 'js/[name].js'
  }，
  externals: {
    'jquery': 'window.jQuery'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
      { test: /\.(gif|png|svg|ttf)\??.*$/, loader: 'url-loader?limit=100&name=res/[name].[ext]' }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name : 'common',
      filename : 'js/base.js'
    }),
    new ExtractTextPlugin('css/[name].css'),

    // html 模板处理
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login'))
  ]
};

module.exports = config;
```

## webpack-dev-server
```sh
npm install webpack-dev-server@1.16.5 --save-dev
npm install webpack-dev-server@1.16.5 -g
```

### 启动
```sh
webpack-dev-server --inline --port 8088
```

### 环境变量配置
```js
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

var getHtmlConfig = function (name) {
  return {
    template: './src/view/' + name + '.html',
    filename: 'view/' + name + '.html',
    inject: true,
    hash: true,
    chunks: ['common', name]
  }
}

var config = {
  entry: {
    // 公共模块 全局
    'common': ['./src/module/index.js'],
    'index': ['./src/index.js'],
    'login': ['./src/login/index.js']
  },
  output: {
    path: './dist',
    publicPath: '/dist',
    filename: 'js/[name].js'
  }，
  externals: {
    'jquery': 'window.jQuery'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},
      { test: /\.(gif|png|svg|ttf)\??.*$/, loader: 'url-loader?limit=100&name=res/[name].[ext]' }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name : 'common',
      filename : 'js/base.js'
    }),
    new ExtractTextPlugin('css/[name].css'),

    // html 模板处理
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login'))
  ]
};

if ('dev' === WEBPACK_ENV) {
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;
```

pakcage.json
```js
{
  "scripts": {
    "dev": "WEBPACK_ENV=dev webpack-dev-server --inline --port 8088",
    "dist": "WEBPACK_ENV=online webpack -p",
    "dev-win": "set WEBPACK_ENV=dev && webpack-dev-server --inline --port 8088",
    "dist-win": "set WEBPACK_ENV=online && webpack -p"
  }
}
```

## 模板渲染
```sh
npm install hogan --save
```

## 图标
```sh
npm install font-awesome --save
```

## release
```sh
git tag <tag-name>
git push origin <tag-name>
```