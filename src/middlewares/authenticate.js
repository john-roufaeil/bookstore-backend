const User = require('../models/usersModels');
const { verifyToken } = require('../modules/auth/auth.service');
const ApiError = require('../utils/ApiError');

const protect = async (req, res, next) => {
  if (
    !req.headers.authorization
    || !req.headers.authorization.startsWith('Bearer')
  ) {
    throw new ApiError(401, 'you are not logged in');
  }
  const token = req.headers.authorization.split(' ')[1];

  if (!token) throw new ApiError(401, 'you are not logged in');

  const decodedToken = verifyToken(token);

  const freshUser = await User.findById(decodedToken._id);
  if (!freshUser) throw new ApiError(401, 'user not found');

  if (freshUser.changedPasswordAfter(decodedToken.iat))
    throw new ApiError(401, 'user recently changed password');

  req.user = freshUser;
  next();
};
module.exports = protect;
