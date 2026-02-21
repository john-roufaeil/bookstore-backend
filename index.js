require('dotenv').config();
const process = require('node:process');
const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.MONGO_URI;
mongoose
  .connect(DB)
  .then(() => {
    console.log('Connected to DB successfully');
  })
  .catch((err) => {
    console.error('Failed to connect to DB, ', err.message);
  });

if (
  !process.env.CLOUDINARY_CLOUD_NAME
  || !process.env.CLOUDINARY_API_KEY
  || !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error('Cloudinary environment variables are missing');
}

app.use((err, req, res) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: err.status || 'error',
    message: err.message
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
