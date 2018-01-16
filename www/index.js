var express = require('express');
var config = require('./config.json')

// Initialize Express
var app = express();

//Initialize Router
var router = express.Router()
router.get('*', (req, res) => {
    res.sendFile('index.html', {
        root: './html'
    });
});

app.use('/', router);

// Launch the server on port 3000
var server = app.listen(config.port, () => {
  var fullAddress = server.address();
  console.log("Listening at http://" + fullAddress.address + ":" + fullAddress.port);
});