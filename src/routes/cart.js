const express = require('express');

const router = express.Router();
const { cart } = require('../controllers');
const protect = require('../middlewares/authenticate');
const validate = require('../middlewares/validate');
const { addItemSchema, updateQuantitySchema, removeItemSchema } = require('../validations/cart');

router.use(protect);
router.get('/', cart.getCartItems);
router.post('/', validate(addItemSchema), cart.addItem);
router.patch('/quantity', validate(updateQuantitySchema), cart.updateItemQuantity);
router.delete('/', validate(removeItemSchema), cart.removeItem);

module.exports = router;
