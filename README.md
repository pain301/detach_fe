Front End

## prepare
```sh
npm init

# 全局安装
npm install webpack -g
# 本地安装
npm install webpack@1.15.0 --save-dev

webpack -v
```

## config
```sh
module.exports = {
     entry: './src/page/index/index.js',
     output: {
         path: './dist',
         filename: 'app.js'
     }
};
```

## compile
```sh
webpack
```

## 提取 JS 共用模块

## 单独打包 CSS
```sh
npm install extract-text-webpack-plugin@1.0.1 --save-dev
npm install css-loader style-loader --save-dev
```

## 打包 HTML
```sh
npm install html-webpack-plugin --save-dev
npm install html-loader --save-dev
```

## 图片字体
```sh
npm install url-loader --save-dev
```

## server
```sh
npm install webpack-dev-server@1.16.5 --save-dev
npm install webpack-dev-server@1.16.5 --save-dev -g
```
```sh
webpack-dev-server --inline --port 8088
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