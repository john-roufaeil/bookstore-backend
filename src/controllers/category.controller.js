const Book = require('../models/book.model');
const Category = require('../models/category.model');

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({name: 1});
    res.status(200).json({success: true, message: 'Categories fetched', data: categories});
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create({name: req.body.name});
    res.status(201).json({success: true, message: 'Category created', data: category});
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
    if (!category) {
      return res.status(404).json({success: false, message: 'Category not found'});
    }
    res.status(200).json({success: true, message: 'Category updated', data: category});
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({success: false, message: 'Category not found'});

    await Book.updateMany({category: req.params.id}, {category: null});

    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({success: true, message: 'Category deleted, Books in this Category are now uncategorized'});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
};
