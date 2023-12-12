const express = require("express");
const Product = require("../models/product");
const Category = require("../models/category");
const Image = require("../models/image");
const User = require("../models/user");
const Cart = require("../models/cart");
const { getCartById } = require("../controllers/carts");
const CartItem = require("../models/cartitem");

const router = express.Router();

/* GET home page. */
router.get("/", async (req, res) => {
  const user = await User.findOne({
    where: { email: "arhamanwaar+5@gmail.com" },
  });

  const cart = await Cart.findByPk(user.cartId, {
    include: [
      {
        model: CartItem,
        include: [
          {
            model: Product,
          },
        ],
      },
    ],
  }).then(function (cart) {
    if (!cart || (cart.CartItems && cart.CartItems.length === 0)) {
      return {
        data: {
          id: cartId,
          total: 0,
          CartItems: [],
        },
      };
    }

    cart = cart.toJSON();

    var total = 0;

    cart.CartItems.forEach(function (cartItem) {
      cartItem.name = cartItem.Product.name;
      cartItem.description = cartItem.Product.description;
      cartItem.price = parseFloat(
        (cartItem.quantity * cartItem.Product.price).toFixed(3)
      );

      delete cartItem.Product;
      total += cartItem.price;
    });

    cart.total = total;

    return cart;
  });

  if (!cart) {
    return res.status(404).json({ error: "Cart not found" });
  }

  const data = {
    cart,
  };

  res.render("../views/index", data);
});

/* GET men page. */
router.get("/men", async (req, res) => {
  const categoryId = 2;

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

  res.render("../views/men", data);
});

/* GET women page. */
router.get("/women", async (req, res) => {
  const categoryId = 3;

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

/* GET contact page. */
router.get("/contact", (req, res) => {
  res.render("../views/contact");
});

/* GET home page. */
router.get("/profile", (req, res) => {
  if (req.session.user) {
    res.render("../views/profile");
  } else {
    res.redirect("/signup");
  }
});

router.get("/login", (req, res) => {
  res.render("../views/login");
});

router.get("/signup", (req, res) => {
  res.render("../views/signup");
});

router.post("/signup", async (req, res) => {
  const { email } = req.body;

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    res.status(401).send("User account already exists, please login instead.");
  }

  const cart = await Cart.create();
  await User.create({
    ...req.body,
    cartId: cart.id,
  });

  req.session.user = { email: email };

  res.status(200).send("User account created successfully.");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return res.status(401).send("Invalid credentials");
  }

  if (user.password != password) {
    return res.status(401).send("Invalid credentials");
  }

  req.session.user = { email: email };

  res.status(200).send("User account fetched successfully.");
});

module.exports = router;
