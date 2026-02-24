const protect = require('./authenticate');
const { restrictTo } = require('./authorize');
const errorHandler = require('./errorHandler');
const { httpLogger } = require('./logger');
const rateLimiter = require('./rateLimit');
const validate = require('./validate');

module.exports = {
  protect,
  restrictTo,
  errorHandler,
  validate,
  httpLogger,
  rateLimiter
};
