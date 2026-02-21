const express = require('express');

const router = express.Router();

router.use('/cart', require('./cart'));
router.use('/books', require('./book.routes'));
router.use('/categories', require('./category.routes'));

module.exports = router;
