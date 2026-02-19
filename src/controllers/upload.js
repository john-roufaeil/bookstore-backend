const process = require('node:process');
const cloudinary = require('../config/cloudinary');

const getUploadSignature = async (req, res, next) => {
    try {
        const timestamp = Math.round(Date.now() / 1000);
        const folder = 'online-bookstore';

        const signature = cloudinary.utils.api_sign_request(
            {
                timestamp,
                folder
            },
            process.env.CLOUDINARY_API_SECRET
        );

        return res.status(200).json({
            success: true,
            message: 'Signature generated',
            data: {
                timestamp,
                signature,
                cloudName: process.env.CLOUDINARY_CLOUD_NAME,
                apiKey: process.env.CLOUDINARY_API_KEY,
                folder
            }
        });
    } catch (error) {
        console.error('Error generating upload signature: ', error.message);
    }
};

module.exports = {
    getUploadSignature
};