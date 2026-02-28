const joi = require('joi');

const placeOrderSchema = joi.object({
  shippingDetails: joi.object({
    fullName: joi.string().required(),
    address: joi.string().required(),
    city: joi.string().required(),
    phone: joi.string()
      .pattern(/^\+?\d{11,15}$/)
      .required()
      .messages({
        'string.pattern.base': 'Phone number is not valid'
      })
  }).required(),
  paymentMethod: joi.string().valid('COD', 'credit_card').default('COD')
});

const updateOrderStatusSchema = joi.object({
  status: joi.string().valid('out_for_delivery', 'delivered').required()
});

module.exports = {
  placeOrderSchema,
  updateOrderStatusSchema
};
