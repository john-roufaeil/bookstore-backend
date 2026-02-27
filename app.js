const cors = require('cors');
const express = require('express');
const { httpLogger, errorHandler, rateLimiter } = require('./src/middlewares');
const routes = require('./src/routes');

const app = express();
app.use(
  cors({
    origin: [
      'http://localhost:4200', // Angular dev server
      'https://your-frontend.vercel.app' // TODO: replace with your actual Vercel frontend URL after deploying
    ],
    credentials: true
  })
);
app.use(express.json());
app.use(httpLogger);
app.use(rateLimiter);

app.use('/api', routes);

app.use(errorHandler);

module.exports = app;
