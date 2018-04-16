import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { Authorizer } from './app/services/'
import config from './server_config.js';
import router from './app/routes.js';
const pgp = require('pg-promise')({});

// Initialize Express
var app = express();

app.use(morgan('combined'));

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// Initialize the Database
// TODO: Setup database.
const db = pgp(config.db);

// Load our authorization once.
const Auth = Authorizer(db, config);
app.use(Auth.init());
//Initialize Router
app.use('/', router(db, config, Auth));

// Launch the server on port 3000
const server = app.listen(config.port, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});

export default app;