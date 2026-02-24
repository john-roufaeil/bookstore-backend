const protect = require('./authenticate');
const { restrictTo } = require('./authorize');
const errorHandler = require('./errorHandler');
const { httpLogger } = require('./logger');
const validate = require('./validate');

module.exports = {
  protect,
  restrictTo,
  errorHandler,
  validate,
  httpLogger
};
