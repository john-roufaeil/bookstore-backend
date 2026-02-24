const express = require('express');
const { review } = require('../controllers');
const { protect, validate } = require('../middlewares');
const { updateReviewSchema } = require('../validations/review');

const router = express.Router();

router.delete('/:id', protect, review.deleteReview); // TODO: admin or owner
router.patch('/:id', protect, validate(updateReviewSchema), review.updateReview); // TODO: admin or owner

module.exports = router;
