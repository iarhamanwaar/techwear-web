const express = require("express");
const router = express.Router();
const imageController = require("../controllers/images");

// Create a new image
router.post("/", imageController.createImage);

// Get all images
router.get("/", imageController.getAllImages);

// Get an image by ID
router.get("/:id", imageController.getImageById);

// Update an image by ID
router.put("/:id", imageController.updateImage);

// Delete an image by ID
router.delete("/:id", imageController.deleteImage);

module.exports = router;
