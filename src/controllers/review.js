const { Review, Book, Order } = require('../models');
const { ApiResponse, ApiError } = require('../utils');

const createReview = async (req, res) => {
  const userId = req.user._id;
  const { bookId } = req.params;
  const { rating, comment } = req.body;

  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(404, 'Book not found');
  }

  const hasPurchased = await Order.exists({
    userId,
    'status': 'delivered',
    'items.bookId': bookId
  });
  if (!hasPurchased) {
    throw new ApiError(403, 'You can not review this book until you have purchased and received it.');
  }

  try {
    const review = await Review.create({ userId, bookId, rating, comment });
    return res.json(new ApiResponse(201, 'Review created successfully', review));
  } catch (err) {
    if (err.code === 11000) {
      throw new ApiError(409, 'You have already reviewed this book');
    }
  }
};

const getBookReviews = async (req, res) => {
  const { bookId } = req.params;
  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(404, 'Book not found');
  }

  const reviews = await Review
    .find({ bookId })
    .populate('userId', 'firstName lastName')
    .sort({ createdAt: -1 });

  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return res.json(new ApiResponse(
    200,
    'Reviews fetched successfully',
    { reviews, averageRating }
  ));
};

const deleteReview = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const review = await Review.findById(id);
  if (!review) {
    throw new ApiError(404, 'Review not found');
  }
  if (review.userId.toString() !== userId.toString()) {
    throw new ApiError(403, 'You are not authorized to delete this review');
  }
  await Review.findByIdAndDelete(id);
  return res.json(new ApiResponse(200, 'Review deleted successfully'));
};

module.exports = {
  createReview,
  getBookReviews,
  deleteReview
};
