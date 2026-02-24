const cors = require('cors');
const express = require('express');
const { httpLogger, errorHandler } = require('./src/middlewares');
const routes = require('./src/routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(httpLogger);

app.use('/api', routes);

app.use(errorHandler);

module.exports = app;
