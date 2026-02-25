const { Review, Book, Order } = require('../models');
const { ApiResponse, ApiError, paginate } = require('../utils');

const isAllowedToToDelete = (user, review) => {
  if (user.role === 'admin') return true;
  return user._id.toString() === review.user.toString();
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

  if (!rating) throw new ApiError(400, 'Rating is required');
  if (rating < 1 || rating > 5) throw new ApiError(400, 'Rating must be between 1 and 5');

  try {
    const review = await Review.create({ user: userId, book: bookId, rating, comment });
    return res.json(new ApiResponse(201, 'Review created successfully', review));
  } catch (err) {
    if (err.code === 11000) {
      throw new ApiError(409, 'You have already reviewed this book');
    }
    throw new ApiError(500, 'Failed to create review', err);
  }
};

const getBookReviews = async (req, res) => {
  const { bookId } = req.params;

  const book = await Book.findById(bookId);
  if (!book) throw new ApiError(404, 'Book not found');

  const { data: reviews, pagination } = await paginate(
    Review,
    { book: bookId },
    {
      sort:
        { createdAt: -1 },
      populate: 'user',
      select: 'rating comment user createdAt'
    }
  );

  const ratings = await Review.find({ book: bookId }).select('rating').lean();
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

  const review = await Review.findById(id);
  if (!review) throw new ApiError(404, 'Review not found');
  if (!isAllowedToToDelete(req.user, review))
    throw new ApiError(403, 'Unauthorized to delete this review');

  await Review.findByIdAndDelete(id);
  return res.json(new ApiResponse(200, 'Review deleted successfully'));
};

const updateReview = async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  const review = await Review.findById(id);
  if (!review) throw new ApiError(404, 'Review not found');
  if (req.user._id.toString() !== review.user.toString())
    throw new ApiError(403, 'Unauthorized to update this review');

  const updatedReview = await Review.findByIdAndUpdate(
    id,
    { rating, comment },
    { new: true, runValidators: true }
  );
  return res.json(new ApiResponse(200, 'Review updated successfully', updatedReview));
};

module.exports = {
  createReview,
  getBookReviews,
  deleteReview,
  updateReview
};
