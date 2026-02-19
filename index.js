require("dotenv").config();
const process = require("node:process");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

const DB = process.env.MONGO_URI;
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected to DB successfully");
  })
  .catch((err) => {
    console.error("Failed to connect to DB, ", err.message);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
