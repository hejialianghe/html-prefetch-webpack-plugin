const fs = require('fs')
const path = require('path')
const webpack= require('webpack')
var rimraf = require('rimraf');
var webpackMajorVersion = require('webpack/package.json').version.split('.')[0];


var examples = fs.readdirSync(__dirname).filter(function (file) {
    return fs.statSync(path.join(__dirname, file)).isDirectory();
  });
  

  examples.forEach(function (exampleName) {
    var examplePath = path.join(__dirname, exampleName);
    var configFile = path.join(examplePath, 'webpack.config.js');
  
    var config = require(configFile);

    if (Number(webpackMajorVersion) >= 4) {
        config.plugins.unshift(new webpack.LoaderOptionsPlugin({
          options: {
            context: process.cwd() 
          }
        }));
        config.mode = 'production';
        config.optimization = config.optimization || {};
        config.optimization.minimizer = [];
      }
 
    rimraf.sync(path.join(examplePath, 'dist'));

    webpack(config, function (err, stats) {
        console.log('err:::::',err,stats)
        if (err) {
          console.error(err.stack || err);
          if (err.details) {
            console.error(err.details);
          }
          return;
        }
    
        const info = stats.toJson();
    
        if (stats.hasErrors()) {
          console.error(info.errors);
        }
    
        if (stats.hasWarnings()) {
          console.warn(info.warnings);
        }
      });
  })
