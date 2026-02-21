const express = require('express');

const router = express.Router();
const {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/book.controller');
// const {authenticate} = require('../middlewares/authenticate');
// const {authorize} = require('../middlewares/authorize');

router.get('/', getAllBooks);
router.get('/:id', getBook);
router.post('/', createBook);
router.patch('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
