const joi = require('joi');

const authorSchema = joi.object({
  name: joi.string().min(2).max(100).required(),
  bio: joi.string().max(500).optional()
});

module.exports = authorSchema;
