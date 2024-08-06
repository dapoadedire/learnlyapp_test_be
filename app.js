const express = require("express");
const morgan = require('morgan');
const bodyParser = require("body-parser");
const { User, Product } = require("./models");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const authMiddleware = require("./middleware/auth");
const cors = require('cors')
require('dotenv').config();
const app = express();


// Enable CORS
app.use(cors());

// Parse JSON bodies (as sent by API clients)
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

const PORT = process.env.PORT || 3000;
app.listen(3000, () => {
  console.log(`CORS-enabled web server listening on port ${PORT}`);
});
