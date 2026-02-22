require('dotenv').config();
const process = require('node:process');
const mongoose = require('mongoose');
const app = require('./app');

// unhandeled uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('shutting down');
  console.log(err);
  process.exit(1);
});

const DB = process.env.MONGO_URI;
mongoose
  .connect(DB)
  .then(() => {
    console.log('Connected to DB successfully');
  })
  .catch((err) => {
    console.error('Failed to connect to DB, ', err.message);
  });
app.use('/api/auth', require('./src/modules/auth/auth.routes'));

app.use((err, req, res) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: err.status || 'error',
    message: err.message
  });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});

// unhandeled promise rejection handeling via closing the server
process.on('unhandledRejection', (err) => {
  console.log('shutting down');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
