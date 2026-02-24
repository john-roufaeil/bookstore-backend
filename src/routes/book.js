const express = require('express');

const router = express.Router();
const { book, review } = require('../controllers');
const { protect, restrictTo, validate } = require('../middlewares');
const { createBookSchema, updateBookSchema } = require('../validations/book');
const { createReviewSchema } = require('../validations/review');

router.get('/', book.getAllBooks);
router.get('/:id', book.getBook);
router.post('/', protect, restrictTo('admin'), validate(createBookSchema), book.createBook);
router.patch('/:id', protect, restrictTo('admin'), validate(updateBookSchema), book.updateBook);
router.delete('/:id', protect, restrictTo('admin'), book.deleteBook);
router.post('/:bookId/reviews', validate(createReviewSchema), protect, review.createReview);
router.get('/:bookId/reviews', review.getBookReviews);

module.exports = router;
