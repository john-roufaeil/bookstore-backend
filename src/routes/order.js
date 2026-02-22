const express = require('express');

const router = express.Router();
const { placeOrder, getMyOrders, getAllOrders, updateOrderStatus } = require('../controllers/order');
const protect = require('../middlewares/authenticate');
const { restrictTo } = require('../middlewares/authorize');
const validate = require('../middlewares/validate');
const { placeOrderSchema, updateOrderStatusSchema } = require('../validations/order');

// User
router.post('/', protect, validate(placeOrderSchema), placeOrder);
router.get('/my', protect, getMyOrders);

// Admin
router.get('/', protect, restrictTo('admin'), getAllOrders);
router.patch('/:id', protect, restrictTo('admin'), validate(updateOrderStatusSchema), updateOrderStatus);

module.exports = router;
