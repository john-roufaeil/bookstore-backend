const express = require('express');
const { getUploadSignature } = require('../controllers/cloudinary');

const router = express.Router();

router.get('/cloudinary-signature', getUploadSignature);
router.use('/cart', require('./cart'));
router.use('/orders', require('./order'));
// router.use('/authors', require('./author'));
// router.use('/reviews', require('./review'));
router.use('/categories', require('./category'));
router.use('/books', require('./book'));

module.exports = router;
