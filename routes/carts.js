const express = require("express");
const router = express.Router();
const { get, update } = require("../controllers/carts");

// Get a cart
router.get("/", get);

// Update a cart
router.post("/", update);

module.exports = router;
