const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");

// Create a new product
router.post("/", productController.createProduct);

// Create a new product
router.post("/image", productController.createProductWithImage);

// Get products by category id
router.get("/categories/:categoryId", productController.getProductByCategory);

// Get all products
router.get("/", productController.getAllProducts);

// Get a product by ID
router.get("/:id", productController.getProductById);

// Update a product by ID
router.put("/:id", productController.updateProduct);

// Delete a product by ID
router.delete("/:id", productController.deleteProduct);

module.exports = router;
