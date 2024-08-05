const express = require("express");
const morgan = require('morgan');
const bodyParser = require("body-parser");
const { User, Product } = require("./models");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const authMiddleware = require("./middleware/auth");
require('dotenv').config();
const app = express();
app.use(bodyParser.json());

// Set up morgan for logging HTTP requests
app.use(morgan('combined')); // Use 'combined' for standard Apache combined log output


app.get("/", (req, res) => {
  res.json({ message: "Welcome to the online store!" });
});

// Public Routes
app.use("/auth", authRoutes);

// Protected Routes
app.use("/products", authMiddleware, productRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
