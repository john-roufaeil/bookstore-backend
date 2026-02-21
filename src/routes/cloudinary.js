const express = require('express');
const { getUploadSignature } = require('../controllers/cloudinary');

const router = express.Router();

router.get('/', getUploadSignature); // TODO: auth

module.exports = router;
