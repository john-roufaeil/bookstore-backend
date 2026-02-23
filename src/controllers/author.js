const { Author } = require('../models');
const { ApiResponse, ApiError } = require('../utils');

const createAuthor = async (req, res) => {
  const { name, bio } = req.body;
  const author = await Author.create({ name, bio });
  return res.json(new ApiResponse(201, 'Author created successfully', author));
};

const updateAuthor = async (req, res) => {
  const { id } = req.params;
  const { name, bio } = req.body;
  const author = await Author.findByIdAndUpdate(id, { name, bio }, { new: true });
  if (!author) {
    throw new ApiError(404, 'Author not found');
  }
  return res.json(new ApiResponse(200, 'Author updated successfully', author));
};

const findAllAuthors = async (req, res) => {
  const authors = await Author.find().sort({ name: 1 });
  return res.json(new ApiResponse(200, 'Authors fetched successfully', authors));
};

module.exports = {
  createAuthor,
  updateAuthor,
  findAllAuthors
};
