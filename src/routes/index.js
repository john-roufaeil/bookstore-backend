const express = require('express');

const router = express.Router();

router.use('/cart', require('./cart'));
router.use('/authors', require('./author'));
router.use('/reviews', require('./review'));
router.use('/categories', require('./category.routes'));
router.use('/books', require('./book.routes'));
router.use('/cloudinary-signature', require('./cloudinary'));

module.exports = router;
