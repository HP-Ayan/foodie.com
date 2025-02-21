const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getOrderById } = require('../controller/order.controller');

router.post('/create', createOrder);
router.get('/', getAllOrders);
router.get('/:oid', getOrderById);

module.exports = router;