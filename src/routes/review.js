const express = require('express');
const {
  getBookReviews,
  createReview,
  deleteReview
} = require('../controllers/review');
const validate = require('../middlewares/validate');
const reviewSchema = require('../validations/review');

const router = express.Router();

router.get('/:bookId', getBookReviews);
router.post('/:bookId', validate(reviewSchema), createReview); // TODO: Add auth
router.delete('/:id', deleteReview); // TODO: Add auth

module.exports = router;
