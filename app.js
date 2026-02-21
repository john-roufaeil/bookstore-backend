const cors = require('cors');
const express = require('express');
const {getUploadSignature} = require('./src/controllers/upload');
const bookRoutes = require('./src/routes/book.routes');
const cartRoutes = require('./src/routes/cart');
const categoryRoutes = require('./src/routes/category.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/categories', categoryRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/cart', cartRoutes);
app.get('/api/upload/signature', getUploadSignature);

module.exports = app;
