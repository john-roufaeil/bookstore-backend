const joi = require('joi');

const addItemSchema = joi.object({
  bookId: joi.string().required(),
  quantity: joi.number().integer().min(1).default(1)
});

const updateQuantitySchema = joi.object({
  bookId: joi.string().required(),
  action: joi.string().valid('increment', 'decrement').required()
});

const removeItemSchema = joi.object({
  bookId: joi.string().required()
});

module.exports = {
  addItemSchema,
  updateQuantitySchema,
  removeItemSchema
};
