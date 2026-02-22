const express = require('express');
const { author } = require('../controllers');
const validate = require('../middlewares/validate');
const { createAuthorSchema, updateAuthorSchema } = require('../validations/author');

const router = express.Router();

router.get('/', author.findAllAuthors);
router.post('/', validate(createAuthorSchema), author.createAuthor); // TODO: Add auth
router.put('/:id', validate(updateAuthorSchema), author.updateAuthor); // TODO: Add auth

module.exports = router;
