require('dotenv').config();
const process = require('node:process');
const mongoose = require('mongoose');
const app = require('./app');
const errorHandler = require('./src/middlewares/errorHandler');

// Error handler — must be the last middleware
app.use(errorHandler);

const DB = process.env.MONGO_URI;

// Cache DB connection across serverless invocations (Vercel cold starts)
// mongoose automatically reuses the existing connection if already connected
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return; // already connected or connecting
  return mongoose.connect(DB);
};

// Wrap app to ensure DB is connected before handling any request
const handler = async (req, res) => {
  await connectDB();
  return app(req, res);
};

if (require.main === module) {
  // Local Development
  // Only runs when executing `node index.js` or `nodemon index.js` directly.
  // NOT executed by Vercel (which imports this file as a module).

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

// Vercel Serverless
// Vercel imports this file as a module, so it uses the handler that ensures DB is connected first.
module.exports = handler;
