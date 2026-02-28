require('dotenv').config();
const process = require('node:process');
const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.MONGO_URI;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(DB);
};

const handler = async (req, res) => {
  await connectDB();
  return app(req, res);
};

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    console.error('Uncaught exception, shutting down:', err);
    process.exit(1);
  });

  mongoose
    .connect(DB)
    .then(() => console.log('Connected to DB successfully'))
    .catch((err) => console.error('Failed to connect to DB:', err.message));

  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
  });

  process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection, shutting down:', err);
    server.close(() => process.exit(1));
  });
}

module.exports = handler;
