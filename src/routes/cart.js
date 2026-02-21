const express = require('express');

const router = express.Router();
const {cart} = require('../controllers');
const validate = require('../middlewares/validate');
const {addToCart, updateQuantity} = require('../validations/cartValidation');

router.get('/:userId', cart.getCartItems);
router.post('/', validate(addToCart), cart.addItem);
router.patch('/quantity', validate(updateQuantity), cart.updateItemQuantity);
router.delete('/', cart.removeItem);

module.exports = router;
