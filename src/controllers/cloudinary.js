const process = require('node:process');
const cloudinary = require('../config/cloudinary');
const { ApiResponse, ApiError } = require('../utils');

const getUploadSignature = async (req, res) => {
  const timestamp = Math.round(Date.now() / 1000);
  const folder = 'online-bookstore';

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET
  );

  if (!signature) {
    throw new ApiError(500, 'Failed to generate signature');
  }

  return res.json(
    new ApiResponse(
      200,
      'Signature generated',
      {
        timestamp,
        signature,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        folder
      }
    )
  );
};

module.exports = {
  getUploadSignature
};
