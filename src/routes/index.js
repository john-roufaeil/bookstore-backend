const express = require('express');

const router = express.Router();

router.use('/cart', require('./cart'));
router.use('/orders', require('./order'));
router.use('/categories', require('./category'));
router.use('/books', require('./book'));
router.use('/authors', require('./author'));
router.use('/reviews', require('./review'));
router.use('/cloudinary-signature', require('./cloudinary'));
router.use('/auth', require('./auth'));

module.exports = router;
