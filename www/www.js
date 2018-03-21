// var express = require('express');
// var config = require('./config.json')

// // Initialize Express
// var app = express();

// //Initialize Router
// var router = express.Router()
// router.get('*', (req, res) => {
//     res.sendFile('index.html', {
//         root: './www'
//     });
// });

// app.use('/', router);

// // Launch the server on port 3000
// var server = app.listen(config.port, () => {
//   var fullAddress = server.address();
//   console.log("Listening at http://" + fullAddress.address + ":" + fullAddress.port);
// });

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname+'/www')).listen(8081);
console.log("Running on port 8081");