const joi = require('joi');

const addItemSchema = joi.object({
  userId: joi.string().required(),
  bookId: joi.string().required(),
  quantity: joi.number().integer().min(1).default(1)
});

const updateQuantitySchema = joi.object({
  userId: joi.string().required(),
  bookId: joi.string().required(),
  action: joi.string().valid('increment', 'decrement').required()
});

module.exports = {
  addItemSchema,
  updateQuantitySchema
};
