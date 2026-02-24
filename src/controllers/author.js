const { Author, Book } = require('../models');
const { ApiResponse, ApiError, paginate } = require('../utils');

const createAuthor = async (req, res) => {
  const { name, bio } = req.body;
  const author = await Author.create({ name, bio });
  return res.json(new ApiResponse(201, 'Author created successfully', author));
};

const updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  const author = await Author.findByIdAndUpdate(id, { name, bio }, { new: true });
  if (!author) throw new ApiError(404, 'Author not found');
  return res.json(new ApiResponse(200, 'Author updated successfully', author));
};

const findAllAuthors = async (req, res) => {
  const { data: authors, pagination } = await paginate(
    Author,
    {},
    { sort: { name: 1 } }
  );
  return res.json(new ApiResponse(200, 'Authors fetched successfully', { authors, pagination }));
};

const findAuthorById = async (req, res) => {
  const { id } = req.params;
  const author = await Author.findById(id);
  if (!author) throw new ApiError(404, 'Author not found');
  return res.json(new ApiResponse(200, 'Author fetched successfully', author));
};

const deleteAuthor = async (req, res) => {
  const { id } = req.params;

  const hasBooks = await Book.exists({ author: id });
  if (hasBooks) throw new ApiError(400, 'Cannot delete author with associated books');
  const author = await Author.findByIdAndDelete(id);
  if (!author) throw new ApiError(404, 'Author not found');

  return res.json(new ApiResponse(200, 'Author deleted successfully', author));
};

module.exports = {
  createAuthor,
  updateAuthor,
  findAllAuthors,
  findAuthorById,
  deleteAuthor
};
