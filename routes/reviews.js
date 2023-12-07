const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviews");

// Create a new review
router.post("/", reviewController.createReview);

// Get all reviews
router.get("/", reviewController.getAllReviews);

// Get a review by ID
router.get("/:id", reviewController.getReviewById);

// Update a review by ID
router.put("/:id", reviewController.updateReview);

// Delete a review by ID
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
