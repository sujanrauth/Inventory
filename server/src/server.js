const dotenv = require('dotenv');

const app = require('./app');

/* Load config = require( .env file at very beginning of app */
if (process.env.NODE_ENV !== 'production') dotenv.config();

app.start();
