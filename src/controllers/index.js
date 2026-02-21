const author = require('./author');
const book = require('./book.controller');
const cart = require('./cart');
const category = require('./category.controller');
const cloudinary = require('./cloudinary');
const review = require('./review');

module.exports = { cart, book, category, cloudinary, review, author };
