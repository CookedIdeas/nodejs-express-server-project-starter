const express = require('express');
const hpp = require('hpp');
const helmet = require('helmet');
const filter = require('content-filter');
require('dotenv').config();

const routes = require('./routes/routes');

const app = express();

// SECURITY : protect against HTTP Parameter Pollution attacks
app.use(hpp());

// SECURITY :  secure http headers with helmet
app.use(helmet());

// Add here your allowed origins
const yourAllowedOrigins = {
  allowedOrigins: ['http://localhost:8888', 'YOUR_ALLOWED_ORIGIN_HERE'],
  default: 'http://localhost:8888',
};

app.use((req, res, next) => {
  // test if req header origin exists in your allowedOrigins array
  // if true → Access-Control-Allow-Origin header is set to req header origin
  // if false → Access-Control-Allow-Origin header is set to yourAllowedOrigins.default
  const allowedOrigin = req.header('origin')
    ? yourAllowedOrigins.allowedOrigins.includes(
        req.header('origin').toLowerCase()
      )
      ? req.headers.origin
      : yourAllowedOrigins.default
    : yourAllowedOrigins.default;

  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);

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

// error handling

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
  throw new Error(err);
});

module.exports = app;

// server logic
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
const port = normalizePort(process.env.PORT || '3000');

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
