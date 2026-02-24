const { Order } = require('../models');
const orderPlacement = require('../services/order');
const { ApiResponse, ApiError, paginate } = require('../utils');

const getMyOrders = async (req, res) => {
  const userId = req.user._id;
  const { page = 1, limit = 10 } = req.query;

  const result = await paginate(
    Order,
    { userId },
    { sort: { createdAt: -1 }, populate: 'items.bookId' },
    Number(page),
    Number(limit)
  );

  return res.json(new ApiResponse(200, 'Orders fetched successfully', result));
};

const placeOrder = async (req, res) => {
  const userId = req.user._id;
  const { shippingDetails, paymentMethod } = req.body;

  const order = await orderPlacement(userId, shippingDetails, paymentMethod);
  return res.status(201).json(new ApiResponse(201, 'Order placed successfully', order));
};

// Admin only
const getAllOrders = async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;
  const filter = {};
  if (status) filter.status = status;

  const result = await paginate(
    Order,
    filter,
    { sort: { createdAt: -1 }, populate: ['items.bookId', 'userId'] },
    Number(page),
    Number(limit)
  );

  return res.json(new ApiResponse(200, 'Orders fetched successfully', result));
};

const StateTransition = {
  processing: 'out_for_delivery',
  out_for_delivery: 'delivered'
};
// Admin only
const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status, paymentStatus } = req.body;

  const order = await Order.findById(id);
  if (!order) throw new ApiError(404, 'Order not found');

  if (status) {
    if (StateTransition[order.status] !== status) {
      throw new ApiError(400, `Can't change order status from '${order.status}' to '${status}'`);
    }
    order.status = status;
  }

  if (paymentStatus) order.paymentStatus = paymentStatus;
  await order.save();

  return res.json(new ApiResponse(200, 'Order updated successfully', order));
};

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
};
