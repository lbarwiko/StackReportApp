// Reverse Proxy server to handle REST requests to multiple servers
// Code taken from https://nodebb.readthedocs.io/en/latest/configuring/proxies/node.html

var http = require('http'),
httpProxy = require('http-proxy'),
HttpProxyRules = require('http-proxy-rules');
express = require('express'),
bodyParser = require('body-parser'),
cors = require('cors');

var PORT = process.env.PORT || 8000;

var app = express();

app.use(cors());

var proxyRules = new HttpProxyRules({
    rules: {
        '.*/api': 'http://localhost:8080/api',
        '.*/api/*': 'http://localhost:8080/api/'
    },
    default: 'http://localhost:8081' // default target, will be landing page (Right now its not)
});

var proxy = httpProxy.createProxyServer();

app.use(function (req, res) {
    try{
        var target = proxyRules.match(req);
        if (target) {
                //console.log("TARGET", target, req.url)
            return proxy.web(req, res, {
                target: target
            }, function(err) {
                //console.log('PROXY ERR',e)
                res.sendStatus(500);
            });
        } else {
            res.sendStatus(404);
        }
    } catch(e) {
        res.sendStatus(500);
    }
});

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// TODO: Change this to https !VERY IMPORTANT
// TODO: Create Options
var server = http.createServer(app);
server.listen(PORT, function(){
    console.log("Listening on port " + PORT);
});
