const express = require('express');

const router = express.Router();
const {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/category');
const { protect, restrictTo, validate } = require('../middlewares');
const { createCategorySchema, updateCategorySchema } = require('../validations/category');

router.get('/', getAllCategories);
router.post('/', protect, restrictTo('admin'), validate(createCategorySchema), createCategory);
router.patch('/:id', protect, restrictTo('admin'), validate(updateCategorySchema), updateCategory);
router.delete('/:id', protect, restrictTo('admin'), deleteCategory);

module.exports = router;
