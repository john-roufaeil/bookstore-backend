const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (!error) return next();
  const errors = error.details.map((d) => d.message);
  return res
    .status(400)
    .json({ success: false, message: 'Validation failed', errors });
};

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  dob: Joi.date()
    .max('now')
    .required()
    .messages({ 'date.max': 'Date of birth must be in the past' }),
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
  dob: Joi.date().max('now')
}).min(1);

module.exports = { validate, registerSchema, loginSchema, updateProfileSchema };
