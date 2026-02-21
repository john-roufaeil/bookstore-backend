const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      priceAtPurchase: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ],
  shippingDetails: {
    fullName: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['processing', 'out_for_delivery', 'delivered'],
    default: 'processing'
  },
  paymentMethod: {
    type: String,
    enum: ['COD', 'credit_card'],
    default: 'COD'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'success'],
    default: 'pending'
  }
}, {timestamps: true});

module.exports = mongoose.model('Order', orderSchema);
