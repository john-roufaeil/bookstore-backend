const express = require('express');

const router = express.Router();
const {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/book.controller');
const validate = require('../middlewares/validate');
const {createBookSchema, updateBookSchema} = require('../validations/book.validation');
// const {authenticate} = require('../middlewares/authenticate');
// const {authorize} = require('../middlewares/authorize');

router.get('/', getAllBooks);
router.get('/:id', getBook);
router.post('/', validate(createBookSchema), createBook);
router.patch('/:id', validate(updateBookSchema), updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
