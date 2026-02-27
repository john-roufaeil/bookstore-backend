const ApiError = require('../utils/ApiError');

const validate = (schema) => (req, res, next) => {
  const {error, value} = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });
  if (!error) req.body = value;
  if (error) {
    const message = error.details.map((d) => d.message).join(', ');
    throw new ApiError(400, message);
  }
  next();
};

module.exports = validate;
