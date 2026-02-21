const express = require('express');
const {
  getAllAuthors,
  createAuthor,
  updateAuthor
} = require('../controllers/a');
const validate = require('../middlewares/validate');
const { authorSchema } = require('../validations/author');

const router = express.Router();

router.get('/', getAllAuthors);
router.post('/', validate(authorSchema), createAuthor); // TODO: Add auth
router.put('/:id', validate(authorSchema), updateAuthor); // TODO: Add auth

module.exports = router;
