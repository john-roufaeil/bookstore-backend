const process = require('node:process');
const ApiError = require('../utils/ApiError');
const {
  devError,
  productionError,
  handleCastErrorDB,
  handleDuplicateFieldsDB,
  handleValidationErrorDB
} = require('../utils/errorHelpers');

const errorHandler = (err, req, res, _next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    devError(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'CastError') {
      error = handleCastErrorDB(error);
    } else if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    } else if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    } else if (error.name === 'JsonWebTokenError') {
      error = new ApiError(401, 'Invalid token. Please log in again!');
    } else if (error.name === 'TokenExpiredError') {
      error = new ApiError(401, 'Your token has expired! Please log in again.');
    }

    productionError(error, res);
  }
};
module.exports = errorHandler;
