const express = require("express");
const { Product } = require("../models");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// Create Product
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("price").isDecimal().withMessage("Price must be a decimal number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, description, price, imageURL } = req.body;
      const createdBy = req.userId;
      const product = await Product.create({
        name,
        description,
        price,
        imageURL,
        createdBy,
      });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Get Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get Product by ID
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update Product
router.put(
  "/:id",
  [
    body("name").optional().notEmpty().withMessage("Name is required"),
    body("price")
      .optional()
      .isDecimal()
      .withMessage("Price must be a decimal number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const productId = req.params.id;
      const { name, description, price, imageURL } = req.body;
      const product = await Product.findByPk(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.createdBy !== req.userId) {
        return res.status(403).json({ message: "Not authorized" });
      }

      await product.update({ name, description, price, imageURL });
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Delete Product
router.delete("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.createdBy !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await product.destroy();
    res.status(200).json({ message: "Product successfully deleted" }); // Updated response message
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
