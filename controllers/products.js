const Category = require("../models/category");
const Image = require("../models/image");
const Product = require("../models/product");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// create a new product and associated image
exports.createProductWithImage = async (req, res) => {
  try {
    const { categoryId, name, description, price, stock_quantity, imageUrl } =
      req.body;

    // Create the product
    const product = await Product.create({
      categoryId,
      name,
      description,
      price,
      stock_quantity,
    });

    // Create the associated image
    const image = await Image.create({
      url: imageUrl,
      productId: product.id,
    });

    res.status(201).json({ product, image });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get products by category id
exports.getProductByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Find the category to ensure it exists
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Retrieve all products with their associated images based on the category id
    const products = await Product.findAll({
      where: { categoryId },
      include: [{ model: Image }],
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  try {
    const [updatedRowsCount, [updatedProduct]] = await Product.update(
      req.body,
      {
        returning: true,
        where: { id: req.params.id },
      }
    );
    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  try {
    const deletedRowCount = await Product.destroy({
      where: { id: req.params.id },
    });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
