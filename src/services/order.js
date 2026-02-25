const mongoose = require('mongoose');
const { Cart, Book, Order } = require('../models');
const { ApiError } = require('../utils');

const orderPlacement = async (userId, shippingDetails, paymentMethod) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cart = await Cart.findOne({ userId }).session(session);
    if (!cart || cart.books.length === 0) {
      throw new ApiError(400, 'Cart is empty');
    }

    const orderItems = [];
    for (const item of cart.books) {
      const book = await Book.findById(item.bookId).session(session);
      if (!book) {
        throw new ApiError(404, `Book ${item.bookId} not found`);
      }
      if (book.stock < item.quantity) {
        throw new ApiError(400, `Not enough stock for '${book.name}'. Only ${book.stock} available`);
      }

      orderItems.push({
        bookId: item.bookId,
        quantity: item.quantity,
        priceAtPurchase: book.price
      });
    }

    for (const item of orderItems) {
      await Book.findByIdAndUpdate(
        item.bookId,
        { $inc: { stock: -item.quantity } },
        { session }
      );
    }

    const [order] = await Order.create([{
      userId,
      items: orderItems,
      shippingDetails,
      paymentMethod,
      status: 'processing',
      paymentStatus: paymentMethod === 'credit_card' ? 'success' : 'pending'
    }], { session });

    cart.books = [];
    await cart.save({ session });

    await session.commitTransaction();
    return order;
  } catch (error) {
    await session.abortTransaction();
    throw new ApiError(500, 'Failed to place order', error.message);
  } finally {
    session.endSession();
  }
};

module.exports = orderPlacement;
