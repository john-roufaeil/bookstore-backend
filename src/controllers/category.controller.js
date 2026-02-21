const Book = require('../models/book.model');
const Category = require('../models/category.model');
const {createCategorySchema, updateCategorySchema} = require('../validations/category.validation');

const getAllCategories = async (req, res) => {
  const categories = await Category.find().sort({name: 1});
  res.status(200).json({success: true, message: 'Categories fetched', data: categories});
};

const createCategory = async (req, res) => {
  const {error, value} = createCategorySchema.validate(req.body);
  if (error) return res.status(400).json({success: false, message: error.details[0].message});

  const category = await Category.create({name: value.name});
  res.status(201).json({success: true, message: 'Category created', data: category});
};

const updateCategory = async (req, res) => {
  const {error, value} = updateCategorySchema.validate(req.body);
  if (error) return res.status(400).json({success: false, message: error.details[0].message});

  const category = await Category.findByIdAndUpdate(req.params.id, {name: value.name}, {new: true});
  if (!category) return res.status(404).json({success: false, message: 'Category not found'});

  res.status(200).json({success: true, message: 'Category updated', data: category});
};

const deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).json({success: false, message: 'Category not found'});

  await Book.updateMany({category: req.params.id}, {category: null});
  await Category.findByIdAndDelete(req.params.id);

  res.status(200).json({success: true, message: 'Category deleted, Books in this Category are now uncategorized'});
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
