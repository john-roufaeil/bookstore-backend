const joi = require('joi');

const createCategorySchema = joi.object({
  name: joi.string().min(2).max(100).required()
});

const updateCategorySchema = joi.object({
  name: joi.string().min(2).max(100).required()
});

module.exports = {
  createCategorySchema,
  updateCategorySchema
};
