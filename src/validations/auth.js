const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  dob: Joi.date().min('1900-01-01').max('now').required().messages({
    'date.min': 'Birth date must be after 01-01-1900',
    'date.max': 'Birth date cannot be in the future'
  }),
  password: Joi.string()
    .min(8)
    .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      'string.pattern.base': 'Password needs uppercase, lowercase, and a number'
    })
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const updateProfileSchema = Joi.object({
  firstName: Joi.string().min(2).max(50),
  lastName: Joi.string().min(2).max(50),
  dob: Joi.date().min('1900-01-01').max('now').messages({
    'date.min': 'Birth date must be after 01-01-1900',
    'date.max': 'Birth date cannot be in the future'
  })
}).min(1);

module.exports = {registerSchema, loginSchema, updateProfileSchema};
