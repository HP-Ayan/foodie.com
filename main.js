const express = require("express");
const cors = require("cors");
const env = require("dotenv").config(); // Load environment variables

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

// Import and use order routes
const orderRouter = require("./routes/order.routes");
app.use("/api/orders", orderRouter);

// Default route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Online Food Order Application</h1>");
});

// Start the server
app.listen(port, host, () => {
  console.log(`Express server started at http://${host}:${port}/`);
});
