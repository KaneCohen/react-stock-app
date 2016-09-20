var fs = require('fs');
var path = require('path');
var watch = require('watch');
var sass = require('node-sass');
var webpack = require('webpack');

var config = {
  debug: (process.env.NODE_ENV === 'production' ? false : true),
  entry: './src/index.js',
  target: 'web',
  devtool: (process.env.NODE_ENV === 'production' ? null : 'inline-source-map'),
  node: {
    fs: 'empty'
  },
  output: {
    path: __dirname + '/public/assets/js',
    filename: 'app.js',
    sourceMapFilename: 'app.map.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.join(__dirname, 'src/')
        ],
        loaders: ['babel', 'eslint']
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};

var compiler = webpack(config);
var callback = function(err, stats) {
  console.log('Generating minified bundle for production use via Webpack...');

  if (err) {
    console.log(err);
    return 1;
  }

  var jsonStats = stats.toJson();

  if (jsonStats.hasErrors) return jsonStats.errors.map(function(error) {
    return console.log(error);
  });

  if (jsonStats.hasWarnings) {
    console.log('Webpack generated the following warnings: ');
    jsonStats.warnings.map(function(warning) {
      return console.log(warning);
    });
  }

  console.log('Webpack stats: ' + stats.toString());

  //if we got this far, the build succeeded.
  console.log('Package has been compiled into /public/assets/js.');
  return 0;
};

compiler.run(callback);

compiler.watch({ // watch options:
    aggregateTimeout: 300, // wait so long for more changes
    poll: true // use polling instead of native watchers
  }, callback);


watch.watchTree('src/scss', {
  ignoreDotFiles: true
}, function() {
  compileScss();
});

function compileScss() {

  sass.render({
    sourceMap: true,
    sourceMapEmbed: true,
    file: './src/scss/index.scss',
    outFile: __dirname + '/public/assets/css/app.css'
  }, function(err, result) {
    if (err) {
      console.log(err);
      return 1;
    }

    fs.writeFile(__dirname + '/public/assets/css/app.css', result.css, function(err) {
      if (err) {
        console.log(err);
        return 1;
      }

      fs.writeFile(__dirname + '/public/assets/css/app.css.map', result.map, function(err) {
        if (err) {
          console.log(err);
          return 1;
        }
        console.log('SASS compiled to CSS');
      });
    });
  });
}
