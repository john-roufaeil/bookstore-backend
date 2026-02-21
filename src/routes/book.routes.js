const express = require('express');

const router = express.Router();
const { book, review } = require('../controllers');
const validate = require('../middlewares/validate');
const { createBookSchema, updateBookSchema } = require('../validations/book.validation');
// const {authenticate} = require('../middlewares/authenticate');
// const {authorize} = require('../middlewares/authorize');

router.get('/', book.getAllBooks);
router.get('/:id', book.getBook);
router.post('/', validate(createBookSchema), book.createBook);
router.patch('/:id', validate(updateBookSchema), book.updateBook);
router.delete('/:id', book.deleteBook);
// Book's reviews routes
router.post('/:bookId/reviews', review.createReview); // TODO: Add auth
router.get('/:bookId/reviews', review.getBookReviews);

module.exports = router;
