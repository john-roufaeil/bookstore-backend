const { restrictTo } = require('../middlewares');
const { Review, Book, Order } = require('../models');
const { ApiResponse, ApiError, paginate } = require('../utils');

const isAllowedToModify = (userId, reviewUserId) => {
  if (restrictTo('admin')) return true;
  return userId.toString() === reviewUserId.toString();
};

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
  if (!book) throw new ApiError(404, 'Book not found');

  const { data: reviews, pagination } = await paginate(
    Review,
    { bookId },
    {
      sort:
        { createdAt: -1 },
      populate: 'userId',
      select: 'rating comment userId createdAt'
    }
  );

  const ratings = await Review.find({ bookId }).select('rating').lean();
  const averageRating = ratings.length > 0
    ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(1)
    : 0;

  return res.json(new ApiResponse(
    200,
    'Reviews fetched successfully',
    { reviews, averageRating, pagination }
  ));
};

const deleteReview = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const review = await Review.findById(id);
  if (!review) throw new ApiError(404, 'Review not found');
  if (!isAllowedToModify(userId, review.userId)) throw new ApiError(403, 'Unauthorized to delete this review');

  await Review.findByIdAndDelete(id);
  return res.json(new ApiResponse(200, 'Review deleted successfully'));
};

const updateReview = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const { rating, comment } = req.body;

  const review = await Review.findById(id);
  if (!review) throw new ApiError(404, 'Review not found');
  if (!isAllowedToModify(userId, review.userId)) throw new ApiError(403, 'Unauthorized to update this review');

  review.rating = rating;
  review.comment = comment;
  await review.save();
  return res.json(new ApiResponse(200, 'Review updated successfully', review));
};

module.exports = {
  createReview,
  getBookReviews,
  deleteReview,
  updateReview
};
