const protect = require('./authenticate');
const { restrictTo } = require('./authorize');
const errorHandler = require('./errorHandler');
const validate = require('./validate');
const { httpLogger } = require('./logger');

module.exports = {
    protect,
    restrictTo,
    errorHandler,
    validate,
    httpLogger
};
