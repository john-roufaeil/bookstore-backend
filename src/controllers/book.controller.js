const Author = require('../models/author');
const Book = require('../models/book.model');
const Category = require('../models/category.model');

const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find().populate('author', 'name').populate('category');
    res.status(200).json({success: true, message: 'Books fetched', data: books});
  } catch (error) {
    next(error);
  }
};

const createBook = async (req, res, next) => {
  try {
    const author = await Author.findById(req.body.author);
    if (!author) return res.status(404).json({success: false, message: 'Author not found'});

    if (req.body.category) {
      const category = await Category.findById(req.body.category);
      if (!category) return res.status(404).json({success: false, message: 'Category not found'});
    }

    const book = await Book.create(req.body);
    const populated = await book.populate('author category');
    res.status(201).json({success: true, message: 'Book created', data: populated});
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    if (req.body.author) {
      const author = await Author.findById(req.body.author);
      if (!author) return res.status(404).json({success: false, message: 'Author not found'});
    }

    if (req.body.category) {
      const category = await Category.findById(req.body.category);
      if (!category) return res.status(404).json({success: false, message: 'Category not found'});
    }

    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('author category');
    if (!book) return res.status(404).json({success: false, message: 'Book not found'});

    res.status(200).json({success: true, message: 'Book updated', data: book});
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({success: false, message: 'Book not found'});

    res.status(200).json({success: true, message: 'Book deleted'});
  } catch (error) {
    next(error);
  }
};

const getBook = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate('author').populate('category');
    if (!book) return res.status(404).json({success: false, message: 'Book not found'});
    res.status(200).json({success: true, message: 'Book fetched', data: book});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
};
