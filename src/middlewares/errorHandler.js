const process = require('node:process');
const AppError = require('../utils/apiError');
const {
  devError,
  productionError,
  handleCastErrorDB,
  handleDuplicateFieldsDB,
  handleValidationErrorDB
} = require('../utils/errorHelpers');

const errorHandeler = (err, res) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    devError(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = {...err};
    if (error.name === 'CastError') {
      handleCastErrorDB(error);
    } else if (error.code === 11000) {
      handleDuplicateFieldsDB(error);
    } else if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    } else if (error.name === 'JsonWebTokenError') {
      error = new AppError('Invalid token. Please log in again!', 401);
    } else if (error.name === 'TokenExpiredError') {
      error = new AppError('Your token has expired! Please log in again.', 401);
    }

    productionError(error, res);
  }
};
module.exports = errorHandeler;
