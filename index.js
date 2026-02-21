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
