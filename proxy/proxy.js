// Reverse Proxy server to handle REST requests to multiple servers
// Code taken from https://nodebb.readthedocs.io/en/latest/configuring/proxies/node.html

var fs = require('fs'),
http = require('http'),
https = require('https'),
httpProxy = require('http-proxy'),
HttpProxyRules = require('http-proxy-rules');
express = require('express'),
bodyParser = require('body-parser'),
cors = require('cors');

var PROD = process.env.PROD == 'TRUE';

var HTTP_PORT   = PROD ? 80     : 8000;
var HTTPS_PORT  = PROD ? 443    : 4443;

var credentials = {};
if(PROD){
    var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
    var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
    credentials = {key: privateKey, cert: certificate};
}

var app = express();

app.use(cors());

var proxyRules = new HttpProxyRules({
    rules: {
        '.*/api': 'http://localhost:8080/api',
        '.*/api/*': 'http://localhost:8080/api/',
        '.*/.well-known/*': 'http://localhost:8080/api/.well-known/',
        '.*/.well-known': 'http://localhost:8080/api/.well-known'
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
var httpServer = http.createServer(app);
httpServer.listen(HTTP_PORT, function(){
    console.log("Http Listening on port " + HTTP_PORT);
});

if(PROD){
    var httpsServer = https.createServer(credentials, app);
    httpsServer.listen(HTTPS_PORT, function(){
        console.log("Https Listening on port " + HTTPS_PORT);
    });
}