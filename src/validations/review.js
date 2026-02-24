const joi = require('joi');

const createReviewSchema = joi.object({
  userId: joi.string().required(),
  bookId: joi.string().required(),
  rating: joi.number().integer().min(1).max(5).required(),
  comment: joi.string().max(500).optional()
}).unknown(false);

const updateReviewSchema = joi.object({
  rating: joi.number().integer().min(1).max(5).optional(),
  comment: joi.string().max(500).optional()
}).unknown(false);

module.exports = {
  createReviewSchema,
  updateReviewSchema
};
