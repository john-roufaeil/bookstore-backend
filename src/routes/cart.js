const express = require('express');

const router = express.Router();
const { cart } = require('../controllers');
const validate = require('../middlewares/validate');
const { addItemSchema, updateQuantitySchema } = require('../validations/cart');

router.get('/:userId', cart.getCartItems);
router.post('/', validate(addItemSchema), cart.addItem);
router.patch('/quantity', validate(updateQuantitySchema), cart.updateItemQuantity);
router.delete('/', cart.removeItem);

module.exports = router;
