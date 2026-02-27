const express = require('express');
const { review } = require('../controllers');
const { protect, validate, restrictTo } = require('../middlewares');
const { updateReviewSchema } = require('../validations/review');

const router = express.Router();

router.get('/', protect, restrictTo('admin'), review.getAllReviews);
router.delete('/:id', protect, review.deleteReview);
router.patch('/:id', protect, validate(updateReviewSchema), review.updateReview);

module.exports = router;
