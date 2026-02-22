const joi = require('joi');

const placeOrderSchema = joi.object({
  shippingDetails: joi.object({
    fullName: joi.string().required(),
    address: joi.string().required(),
    city: joi.string().required(),
    phone: joi.string().required()
  }).required(),
  paymentMethod: joi.string().valid('COD', 'credit_card').default('COD')
});

const updateOrderStatusSchema = joi.object({
  status: joi.string().valid('processing', 'out_for_delivery', 'delivered').required(),
  paymentStatus: joi.string().valid('pending', 'success')
});

module.exports = {
  placeOrderSchema,
  updateOrderStatusSchema
};
