import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';

import config from './config';
import routes from './routes';
import responses from './responses';
import models, { connectDb } from './models';

const app = express();

app.enable('trust proxy');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(config.cors));

const port = parseInt(process.env.PORT || config.port, 10);

/* global */
global.config = config;
global.models = models;
/* global */

/* configure port to app */
app.set('port', port);

/* Attaching custom response methods to res object */
app.use(responses);

/* configure routes */
routes(app);

// Make sure k8s health check does not fail
// app.get('/healthz', (req, res) => {
//   res.sendStatus(200);
// });

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((error, req, res) => {
  // eslint-disable-next-line no-console
  console.error(error);

  res.status(error.status || 500);
  res.json({
    message: "Oops! Couldn't perform this action at the moment. Please try again",
    error,
  });
});

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

const isTest = process.env.NODE_ENV === 'test';
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Bind onError and onListening handler
 */
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`); // eslint-disable-line no-console
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`); // eslint-disable-line no-console
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  // eslint-disable-next-line no-console
  console.log(`Listening on ${bind}`);
});

function start(done) {
  connectDb().then(async () => {
    if (isTest || isProduction) {
      // Setup testing/prod environment
    }

    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port, done);
  });
}

function lower(done) {
  server.close(done);
}

module.exports = {
  lower,
  start,
  default: app,
};
