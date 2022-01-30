[![npm][npm]][npm-url]
[![node][node]][node-url]
![npm](https://img.shields.io/npm/dw/html-webpack-plugin.svg)
 [![GitHub forks](https://img.shields.io/github/forks/hejialianghe/html-webpack-plugin.svg?style=flat-square)](https://github.com/hejialianghe/Senior-FrontEnd/network) [![GitHub stars](https://img.shields.io/github/stars/hejialianghe/html-webpack-plugin.svg?style=flat-square)](https://github.com/hejialianghe/Senior-FrontEnd/stargazers) [![GitHub issues](https://img.shields.io/github/issues/hejialianghe/html-webpack-plugin.svg?style=flat-square)](https://github.com/hejialianghe/Senior-FrontEnd/issues) [![GitHub last commit](https://img.shields.io/github/last-commit/hejialianghe/html-webpack-plugin.svg?style=flat-square)](https://github.com/hejialianghe/Senior-FrontEnd/commits/master)
# html-prefetch-webpack-plugin

> If you want to load some large resources during the browser's idle time, you can use this plugin. Prefetch works for non-first screen loading; Preload applies to the first screen loading

> 如果你想在浏览器空闲时段加载一些较大的资源，那么你可以使用此插件，prefetch适用于非首屏加载；preload适用于首屏加载

## Install

```bash
npm i html-prefetch-webpack-plugin -D
# or
yarn add html-prefetch-webpack-plugin -D
```

## Example

 before:

 ```html
 <!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>Webpack App</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <script defer="defer" src="./main.025b57ab4efabca2e393.js"></script>
</head>

<body></body>

</html>

 ```
after:

```js
<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <title>Webpack App</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <script defer="defer" src="./main.025b57ab4efabca2e393.js"></script>
+    <link as="script" href="./big-file.e4cd65aaa70ad26eba0d.js" rel="prefetch">
</head>

<body></body>

</html>
```
### webpack config

```diff
const HtmlPrefetchWebpackPlugin = require('html-prefetch-webpack-plugin')
   plugins:[
    new htmlWwebpackPlugin(),
+   new HtmlPrefetchWebpackPlugin({
+       rel:'prefetch',
+       include:['big-file']
+  })
   ]
```
## options

| key（键）|  value（值）| Default（默认值）| remarks（备注）|
| :-----: | :--------: | :------------: | :------: | 
|  rel |  'prefetch' or 'preload' |  null |  指定类型  |
|  include |  string[] |  null |  需要预读取和预加载的chunk文件名|