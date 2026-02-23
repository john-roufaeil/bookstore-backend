const joi = require('joi');

const createAuthorSchema = joi.object({
  name: joi.string().min(2).max(100).required(),
  bio: joi.string().max(500).optional()
}).unknown(false);

const updateAuthorSchema = joi.object({
  name: joi.string().min(2).max(100).optional(),
  bio: joi.string().max(500).optional()
}).min(1).unknown(false);

module.exports = { createAuthorSchema, updateAuthorSchema };
