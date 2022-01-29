const {join} = require('path')
var HtmlPrefetchWebpackPlugin = require('../..');
const htmlWwebpackPlugin = require('html-webpack-plugin')

module.exports ={
    context: __dirname,
   entry:{
    main: './main.js'
   },
   output:{
    path:join(__dirname,'./dist'),
    filename: '[name].[contenthash].js',
    publicPath:  './',
   },
   module:{
    rules: [
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      ]
   },
   optimization:{

   },
   plugins:[
    new htmlWwebpackPlugin(),
    new HtmlPrefetchWebpackPlugin({
        rel:'prefetch',
        include:['big-file']
    })
   ]
}