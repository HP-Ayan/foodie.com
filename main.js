const express = require('express');
const cors = require("cors");
require('dotenv').config();

// Define port and host globally
var port = process.env.HOST_PORT || 3000;
var host = process.env.HOST || "127.0.0.1";

const app = express();
app.use(cors());

// Serve static resources from the public folder
app.use(express.static("public"));
console.log(`SSR is working on the public folder`);

// Middleware to parse incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes
const userRouter = require("./routes/user.route");
app.use("/api/users", userRouter);

const foodRouter = require("./routes/foods.routes");
app.use("/api/foods", foodRouter);

const orderRouter = require("./routes/order.routes");
app.use("/api/orders", orderRouter);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Food Ordering API');
});

// Start the server
app.listen(port, () => {
  console.log(`express server started on  http://${host}:${port}`);
});