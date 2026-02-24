const express = require('express');
const { author } = require('../controllers');
const { protect, restrictTo, validate } = require('../middlewares');
const { createAuthorSchema, updateAuthorSchema } = require('../validations/author');

const router = express.Router();

router.get('/', author.findAllAuthors);

router.get('/:id', author.findAuthorById);

router.post(
  '/',
  protect,
  restrictTo('admin'),
  validate(createAuthorSchema),
  author.createAuthor
);

router.put(
  '/:id',
  protect,
  restrictTo('admin'),
  validate(updateAuthorSchema),
  author.updateAuthor
);

router.delete(
  '/:id',
  protect,
  restrictTo('admin'),
  author.deleteAuthor
);

module.exports = router;
