const express = require('express');
const { getUploadSignature } = require('../controllers/cloudinary');
const { protect, restrictTo } = require('../middlewares');

const router = express.Router();

router.get('/', protect, restrictTo('admin'), getUploadSignature);

module.exports = router;
