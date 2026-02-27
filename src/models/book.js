const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  coverImage: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

bookSchema.virtual('status').get(function () {
  if (this.stock > 10) return 'In Stock';
  if (this.stock > 0) return 'Low Stock';
  return 'Out of Stock';
});

bookSchema.index({ name: 'text' });
bookSchema.index({ price: 1 });

module.exports = mongoose.model('Book', bookSchema);
