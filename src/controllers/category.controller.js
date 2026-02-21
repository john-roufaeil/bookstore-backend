const Book = require('../models/book.model');
const Category = require('../models/category.model');
const { ApiResponse, ApiError } = require('../utils');

const getAllCategories = async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json(new ApiResponse(200, 'Categories fetched', categories));
};

const createCategory = async (req, res) => {
  const category = await Category.create({ name: req.body.name });
  res.status(201).json(new ApiResponse(201, 'Category created', category));
};

const updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, { returnDocument: 'after' });
  if (!category) throw new ApiError(404, 'Category not found');

  res.json(new ApiResponse(200, 'Category updated', category));
};

const deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw new ApiError(404, 'Category not found');

  await Book.updateMany({ category: req.params.id }, { category: null });
  await Category.findByIdAndDelete(req.params.id);

  res.json(new ApiResponse(200, 'Category deleted, Books in this Category are now uncategorized'));
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
