const process = require('node:process');
const jwt = require('jsonwebtoken');

const generateToken = (user) =>
  jwt.sign(
    {_id: user._id, email: user.email, role: user.role},
    process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_EXPIRES_IN}
  );

module.exports = {generateToken};
