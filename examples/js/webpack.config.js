const {join} = require('path')
var PrefetchWebpackPlugin = require('../..');

module.exports={
   entry:{
    main: './main.js'
   },
   output:{
    path:join(__dirname,'./dist'),
    filename: 'bundle.js'
   },
   module:{

   },
   plugins:[
    new PrefetchWebpackPlugin({
        rel:'prefetch',
        include:['bundle']
    })
   ]
}