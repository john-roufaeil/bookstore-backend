const joi = require('joi');

const addToCart = joi.object({
  userId: joi.string().required(),
  bookId: joi.string().required(),
  quantity: joi.number().integer().min(1).default(1)
});

const updateQuantity = joi.object({
  userId: joi.string().required(),
  bookId: joi.string().required(),
  action: joi.string().valid('increment', 'decrement').required()
});

module.exports = {
  addToCart,
  updateQuantity
};
