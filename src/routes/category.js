const express = require('express');

const router = express.Router();
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/category');
const validate = require('../middlewares/validate');
const { createCategorySchema, updateCategorySchema } = require('../validations/category');
// const {authenticate} = require('../middlewares/authenticate');
// const {authorize} = require('../middlewares/authorize');

router.get('/', getAllCategories);
router.post('/', validate(createCategorySchema), createCategory);
router.patch('/:id', validate(updateCategorySchema), updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
