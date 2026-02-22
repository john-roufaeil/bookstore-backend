const User = require('../../models/usersModels');
const ApiError = require('../../utils/ApiError');
const ApiResponse = require('../../utils/ApiResponse');
const { generateToken } = require('./auth.service');

const register = async (req, res) => {
  const { email, firstName, lastName, dob, password } = req.body;

  if (await User.findOne({ email }))
    throw new ApiError(409, 'Email already in use');

  const newUser = await User.create({
    email,
    firstName,
    lastName,
    dob,
    password
  });
  const userObj = newUser.toObject();
  delete userObj.password;

  res
    .status(201)
    .json(new ApiResponse(201, 'User created successfully', userObj));
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new ApiError(400, 'please provide email and password');

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password)))
    throw new ApiError(401, 'incorrect email or password');

  const token = generateToken(user);

  res.json(new ApiResponse(200, 'User logged in successfully', { token }));
};

const logout = async (req, res) => {
  res.json(new ApiResponse(200, 'User logged out successfully'));
};

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) throw new ApiError(404, 'user not found');
  res.json(new ApiResponse(200, 'User retrieved successfully', user));
};

const updateUserProfile = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true
  });
  if (!user) throw new ApiError(404, 'user not found');
  res.json(new ApiResponse(200, 'User updated successfully', user));
};
module.exports = { register, login, logout, getUserProfile, updateUserProfile };
