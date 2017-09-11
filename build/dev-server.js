require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

const fs = require('fs');

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

// var appData = require('../data.json');
// var newslist = appData.newslist;
// var newsDetails = appData.newsDetails;


var apiRoutes = express.Router();

// apiRoutes.get('/news', function (req, res) {
//   res.json(appData.newslist);
// });
//
// apiRoutes.get('/news/detail', function (req, res) {
//   res.json(appData.newsDetails);
// });

// app.use('/testapi', apiRoutes);

app.use(function(req, res, next){
    console.log(req.originalUrl);
    if (req.originalUrl.indexOf('/debugger/') > -1) {
        // var mockJson = require('../mock/index.js');
        var mockJson = JSON.parse(fs.readFileSync(__dirname.slice(0, -5) + 'mock/index.json'));
        var realUrl = '';
        if (req.originalUrl.indexOf('/debugger/api/') > -1) {
            realUrl = req.originalUrl.slice('13');
        } else {
            realUrl = req.originalUrl.slice('14');
        }
        if (mockJson[realUrl]) {
            try {
                var redJson = JSON.parse(fs.readFileSync(__dirname.slice(0, -5) + 'mock/' + mockJson[realUrl] + '.json'));
                res.send(redJson);
            } catch (err) {
                res.send('读取mock数据错误');
            }
        } else {
            req.originalUrl =  req.originalUrl.slice('9');
            console.error(req.originalUrl);
            next();
        }
    } else {
        next();
    }
});

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))
var imagesPath = path.posix.join(config.dev.imagesPublicPath, config.dev.imagesSubDirectory)
app.use(imagesPath, express.static('./images'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
