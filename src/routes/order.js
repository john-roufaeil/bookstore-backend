const express = require('express');

const router = express.Router();
const { placeOrder, getMyOrders, getAllOrders, updateOrderStatus } = require('../controllers/order');
const validate = require('../middlewares/validate');
const { placeOrderSchema, updateOrderStatusSchema } = require('../validations/order');

// User
router.post('/', validate(placeOrderSchema), placeOrder);
router.get('/my/:userId', getMyOrders);

// Admin
router.get('/', getAllOrders);
router.patch('/:id', validate(updateOrderStatusSchema), updateOrderStatus);

module.exports = router;
