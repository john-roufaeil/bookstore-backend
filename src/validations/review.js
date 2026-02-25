const joi = require('joi');

const createReviewSchema = joi.object({
  rating: joi.number().integer().min(1).max(5).required(),
  comment: joi.string().max(500).optional()
}).unknown(false);

const updateReviewSchema = joi.object({
  rating: joi.number().integer().min(1).max(5).optional(),
  comment: joi.string().max(500).optional()
}).unknown(false).min(1);

module.exports = {
  createReviewSchema,
  updateReviewSchema
};
