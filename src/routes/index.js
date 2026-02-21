const express = require('express');
const { getUploadSignature } = require('../controllers/cloudinary');

const router = express.Router();

router.get('/cloudinary-signature', getUploadSignature);
router.use('/cart', require('./cart'));
// router.use('/authors', require('./author'));
// router.use('/reviews', require('./review'));
router.use('/categories', require('./category.routes'));
router.use('/books', require('./book.routes'));

module.exports = router;
