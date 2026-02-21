const joi = require('joi');

const objectId = joi.string().hex().length(24);

const createBookSchema = joi.object({
  name: joi.string().min(1).max(200).required(),
  price: joi.number().positive().required(),
  stock: joi.number().integer().min(0).required(),
  coverImage: joi.string().uri().required(),
  author: objectId.required(),
  category: objectId.optional()
});

const updateBookSchema = joi.object({
  name: joi.string().min(1).max(200),
  price: joi.number().positive(),
  stock: joi.number().integer().min(0),
  coverImage: joi.string().uri(),
  author: objectId,
  category: objectId.allow(null)
}).min(1);
module.exports = {
  createBookSchema,
  updateBookSchema
};
