const express = require('express');
const hpp = require('hpp');
const toobusy_js = require('toobusy-js');
const helmet = require('helmet');
const filter = require('content-filter');
require('dotenv').config();

const routes = require('./routes/routes');

const app = express();

//SECURITY : protect against HTTP Parameter Pollution attacks
app.use(hpp());

//SECURITY : toobusy package send response if server is too busy
//Keeps the app responsive
//Protection against DoS Attack
app.use(function (req, res, next) {
  if (toobusy_js()) {
    logger.log('verbose', `server is too busy`);
    res.status(503).send('Server Too Busy');
  } else {
    next();
  }
});
//SECURITY :  secure http headers with helmet
app.use(helmet());

// Add here your allowed origins
const cors = {
  allowedOrigin: [
    'http://localhost:3000',
    'http://localhost:3000/',
    'YOUR ALLOWED ORIGIN HERE',
  ],
  default: 'http://localhost:3000',
};

app.use((req, res, next) => {
  const origin = cors.allowedOrigin.includes(req.header('origin').toLowerCase())
    ? req.headers.origin
    : cors.default;
  res.setHeader('Access-Control-Allow-Origin', origin);
  // res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// SECURITY : limit requests size
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '1kb', extended: false }));

// SECURITY : prevent NoSQL injection -> ne permet pas d'envoyer "{" ou "$" etc...
// blacklist from https://github.com/cr0hn/nosqlinjection_wordlists
let blackList = ['$', '{', '&&', '||', '%00', "';sleep(5000);", '=='];
let filterOptions = {
  urlBlackList: blackList,
  bodyBlackList: blackList,
};
app.use(filter(filterOptions));

app.use('/api', routes);

module.exports = app;

//server.js
const http = require('http');

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT);
console.log(port);
app.set('port', port);

const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
