const joi = require('joi');

const reviewSchema = joi.object({
  userId: joi.string().required(),
  bookId: joi.string().required(),
  rating: joi.number().integer().min(1).max(5).required(),
  comment: joi.string().max(500).optional()
});

module.exports = reviewSchema;
