const { Author, Book, Category } = require('../models');
const { ApiResponse, ApiError } = require('../utils');

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

  res.json(new ApiResponse(200, 'Books fetched', {
    books,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit)
    }
  }));
};

const createBook = async (req, res) => {
  const author = await Author.findById(req.body.author);
  if (!author) throw new ApiError(404, 'Author not found');

  if (req.body.category) {
    const category = await Category.findById(req.body.category);
    if (!category) throw new ApiError(404, 'Category not found');
  }

  const book = await Book.create(req.body);
  const populated = await book.populate('author category');
  res.status(201).json(new ApiResponse(201, 'Book created', populated));
};

const updateBook = async (req, res) => {
  if (req.body.author) {
    const author = await Author.findById(req.body.author);
    if (!author) throw new ApiError(404, 'Author not found');
  }

  if (req.body.category) {
    const category = await Category.findById(req.body.category);
    if (!category) throw new ApiError(404, 'Category not found');
  }

  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' }).populate('author category');
  if (!book) throw new ApiError(404, 'Book not found');

  res.json(new ApiResponse(200, 'Book updated', book));
};

const deleteBook = async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) throw new ApiError(404, 'Book not found');

  res.json(new ApiResponse(200, 'Book deleted'));
};

const getBook = async (req, res) => {
  const book = await Book.findById(req.params.id).populate('author').populate('category');
  if (!book) throw new ApiError(404, 'Book not found');

  res.json(new ApiResponse(200, 'Book fetched', book));
};

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
};
