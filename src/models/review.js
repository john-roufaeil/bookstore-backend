const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxLength: 500
  }
}, { timestamps: true });

// unique review per user per book
reviewSchema.index({ user: 1, book: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
