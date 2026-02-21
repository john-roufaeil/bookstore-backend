const cors = require('cors');
const express = require('express');
const { httpLogger } = require('./src/middlewares/logger');
const routes = require('./src/routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(httpLogger);

app.use('/api', routes);

module.exports = app;
