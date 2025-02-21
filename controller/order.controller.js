const asyncHandler = require('express-async-handler');
const Order = require('../model/order.model');
console.log(`Order controller is working`);

// Generate random order ID
function generateOrderID() {
  return "order-" + Math.floor(Math.random() * 99999) + "-" + Date.now();
}

// Create a new order
const createOrder = asyncHandler(async (req, res) => {
  const { userId, items, totalPrice } = req.body;
  const newOrder = await Order.create({
    userId,
    items,
    totalPrice,
    orderDate: new Date(),
    status: 'Pending'
  });

  if (!newOrder) {
    res.status(400).json({ message: "Order creation failed" });
  } else {
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  }
});

// Retrieve all orders
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('userId').populate('items.foodId').exec();
  if (orders.length > 0) {
    res.status(200).json(orders);
  } else {
    res.status(200).json({ message: "No orders found" });
  }
});

// Get order by ID
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.oid).populate('userId').populate('items.foodId').exec();
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});

module.exports = { createOrder, getAllOrders, getOrderById };