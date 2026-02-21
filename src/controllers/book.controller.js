const Author = require('../models/author');
const Book = require('../models/book.model');
const Category = require('../models/category.model');
const { createBookSchema, updateBookSchema } = require('../validations/book.validation');

const getAllBooks = async (req, res) => {
  const { search, category, author, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

  const query = {};
  if (search) query.$text = { $search: search };
  if (category) query.category = category;
  if (author) query.author = author;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const skip = (page - 1) * limit;
  const total = await Book.countDocuments(query);
  const books = await Book.find(query)
    .populate('author', 'name')
    .populate('category', 'name')
    .skip(skip)
    .limit(Number(limit));

  res.status(200).json({
    success: true,
    message: 'Books fetched',
    data: books,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit)
    }
  });
};

const createBook = async (req, res) => {
  const { error, value } = createBookSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  const author = await Author.findById(value.author);
  if (!author) return res.status(404).json({ success: false, message: 'Author not found' });

  if (value.category) {
    const category = await Category.findById(value.category);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
  }

  const book = await Book.create(value);
  const populated = await book.populate('author category');
  res.status(201).json({ success: true, message: 'Book created', data: populated });
};

const updateBook = async (req, res) => {
  const { error, value } = updateBookSchema.validate(req.body);
  if (error) return res.status(400).json({ success: false, message: error.details[0].message });

  if (value.author) {
    const author = await Author.findById(value.author);
    if (!author) return res.status(404).json({ success: false, message: 'Author not found' });
  }

  if (value.category) {
    const category = await Category.findById(value.category);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found' });
  }

  const book = await Book.findByIdAndUpdate(req.params.id, value, { new: true }).populate('author category');
  if (!book) return res.status(404).json({ success: false, message: 'Book not found' });

  res.status(200).json({ success: true, message: 'Book updated', data: book });
};

const deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ success: false, message: 'Book not found' });

  res.status(200).json({ success: true, message: 'Book deleted' });
};

const getBook = async (req, res) => {
  const book = await Book.findById(req.params.id).populate('author').populate('category');
  if (!book) return res.status(404).json({ success: false, message: 'Book not found' });

  res.status(200).json({ success: true, message: 'Book fetched', data: book });
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
};
