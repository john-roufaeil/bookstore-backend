require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./src/config/logger');
const connectDB = require('./src/config/database');
const errorHandler = require('./src/middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(errorHandler);

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});

module.exports = app;
