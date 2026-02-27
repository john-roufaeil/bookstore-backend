const { Cart, Book } = require('../models');
const { ApiResponse, ApiError } = require('../utils');

const getCartItems = async (req, res) => {
  const userId = req.user._id;
  const cart = await Cart.findOne({ userId }).populate({ path: 'books.bookId', select: 'name price coverImage stock author', populate: { path: 'author', select: 'name' } });

  if (!cart || cart.books.length === 0) {
    return res.json(new ApiResponse(200, 'Cart is empty', { books: [], totalPrice: 0 }));
  }

  const totalPrice = cart.books.reduce((acc, item) => acc + item.bookId.price * item.quantity, 0);
  return res.json(new ApiResponse(200, 'Cart fetched successfully', { cart, totalPrice }));
};

const addItem = async (req, res) => {
  const userId = req.user._id;
  const { bookId, quantity = 1 } = req.body;

  const book = await Book.findById(bookId);
  if (!book) {
    throw new ApiError(404, 'Book not found');
  }

  const cart = await Cart.findOne({ userId }) || new Cart({ userId, books: [] });
  const bookInCart = cart.books.find((b) => b.bookId.toString() === bookId);
  const newQuantity = (bookInCart?.quantity || 0) + quantity;
  if (newQuantity > book.stock) {
    throw new ApiError(400, `Not enough stock. Only ${book.stock} available`);
  }
  if (bookInCart) {
    bookInCart.quantity = newQuantity;
  } else {
    cart.books.push({ bookId, quantity: newQuantity });
  }

  await cart.save();
  await cart.populate({ path: 'books.bookId', select: 'name price coverImage stock author', populate: { path: 'author', select: 'name' } });

  const totalPrice = cart.books.reduce((acc, item) => acc + item.bookId.price * item.quantity, 0);
  return res.json(new ApiResponse(201, 'Book added to cart successfully', { cart, totalPrice }));
};

const removeItem = async (req, res) => {
  const userId = req.user._id;
  const { bookId } = req.body;
  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $pull: { books: { bookId } } },
    { new: true }
  );

  if (!cart) {
    throw new ApiError(404, 'Cart or book not found');
  }

  return res.json(
    new ApiResponse(200, 'Book removed from cart successfully', cart)
  );
};

const updateItemQuantity = async (req, res) => {
  const userId = req.user._id;
  const { bookId, action } = req.body;

  const cart = await Cart.findOne({ userId });
  if (!cart) {
    throw new ApiError(404, 'Cart not found');
  }

  const bookInCart = cart.books.find((b) => b.bookId.toString() === bookId);
  if (!bookInCart) {
    throw new ApiError(404, 'Book not found in cart');
  }

  if (action === 'increment') {
    const book = await Book.findById(bookId);
    if (!book) throw new ApiError(404, 'Book not found');
    if (bookInCart.quantity >= book.stock) {
      throw new ApiError(400, `Not enough stock. Only ${book.stock} available`);
    }
    bookInCart.quantity += 1;
  } else if (bookInCart.quantity <= 1) {
    cart.books.pull({ bookId });
  } else {
    bookInCart.quantity -= 1;
  }
  await cart.save();

  const updatedCart = await Cart.findOne({ userId }).populate({ path: 'books.bookId', select: 'name price coverImage stock author', populate: { path: 'author', select: 'name' } });
  const totalPrice = updatedCart.books.reduce((acc, item) => acc + item.bookId.price * item.quantity, 0);
  return res.json(new ApiResponse(200, `Quantity ${action}ed successfully`, { cart: updatedCart, totalPrice }));
};

module.exports = {
  getCartItems,
  addItem,
  removeItem,
  updateItemQuantity
};
