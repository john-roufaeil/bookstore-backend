// Removed unused imports
const User = require('../../models/usersModels');
const ApiError = require('../../utils/apiError');
const ApiResponse = require('../../utils/apiResponse');

const register = async (req, res) => {
  const {email, firstName, lastName, dob, password} = req.body;

  if (await User.findOne({email}))
    throw new ApiError(409, 'Email already in use');

  const newUser = await User.create({
    email,
    firstName,
    lastName,
    dob,
    password
  });
  // Token generation removed since it is unused in the register response
  const userObj = newUser.toObject();
  delete userObj.password;

  ApiResponse.success(res, 201, 'User created successfully', userObj);
};
module.exports = {register};
