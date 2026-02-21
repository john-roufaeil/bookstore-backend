const mongoose = require('mongoose');

const {Schema} = mongoose;

const authorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  bio: {
    type: String
  }
}, {timestamps: true});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
