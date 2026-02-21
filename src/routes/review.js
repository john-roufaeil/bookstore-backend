const express = require('express');
const { review } = require('../controllers');

const router = express.Router();

router.delete('/:id', review.deleteReview); // TODO: Add auth
module.exports = router;
