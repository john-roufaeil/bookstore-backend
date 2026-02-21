const cors = require('cors');
const express = require('express');
const {getUploadSignature} = require('./src/controllers/upload');
const {httpLogger} = require('./src/middlewares/logger');
const bookRoutes = require('./src/routes/book.routes');
const cartRoutes = require('./src/routes/cart');
const categoryRoutes = require('./src/routes/category.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(httpLogger);

app.use('/api', routes);

module.exports = app;
