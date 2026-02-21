const mongoose = require('mongoose');

const { Schema } = mongoose;

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100
  },
  bio: {
    type: String,
    maxlength: 500
  }
}, { timestamps: true });

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
