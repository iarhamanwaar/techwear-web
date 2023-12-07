const express = require("express");
const Product = require("../models/product");
const Category = require("../models/category");
const Image = require("../models/image");
const router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  const data = {
    imageUrl: "https://wallpapercave.com/wp/wp12113051.jpg",
    title1: "CYBER DARK",
    title2: "COLLECTION",
    title3: "FW//",
    title4: "2324",
  };

  res.render("../views/index", data);
});

/* GET men page. */
router.get("/men", (req, res) => {
  const data = {
    imageUrl: "https://wallpapercave.com/wp/wp12113051.jpg",
    title1: "CYBER DARK",
    title2: "COLLECTION",
    title3: "FW//",
    title4: "2324",
  };

  res.render("../views/men", data);
});

/* GET women page. */
router.get("/women", (req, res) => {
  const data = {
    imageUrl: "https://wallpapercave.com/wp/wp12113051.jpg",
    title1: "CYBER DARK",
    title2: "COLLECTION",
    title3: "FW//",
    title4: "2324",
  };

  res.render("../views/women", data);
});

/* GET jewelry page. */
router.get("/jewelry", async (req, res) => {
  const categoryId = 1;

  // Find the category to ensure it exists
  const category = await Category.findByPk(categoryId);
  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }

  // Retrieve all products with their associated images based on the category id
  let products = await Product.findAll({
    where: { categoryId },
    include: [{ model: Image }],
  });

  // Convert each product and its associated images to JSON
  const productsJSON = products.map((product) => {
    const productJSON = product.toJSON();

    // Check if the product has associated images
    if (product.Images && product.Images.length > 0) {
      // Convert each image to JSON
      const imagesJSON = product.Images.map((image) => image.toJSON());

      // Replace the original images with the JSON representations
      productJSON.Images = imagesJSON;
    }

    return productJSON;
  });

  const data = {
    products: productsJSON,
  };

  res.render("../views/jewelry", data);
});

module.exports = router;
