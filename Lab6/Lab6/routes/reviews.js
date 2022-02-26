const express = require("express");
const router = express.Router();
const data = require("../data");

const reviewsData = data.reviews;
const ObjectId = require("mongodb").ObjectID;

router.get("/:restaurantId", async (req, res) => {
  try {
    if (!req.params.restaurantId) {
      res.status(400).json({ error: "You must provide ID" });
      return;
    }
    let restaurantId = req.params.restaurantId;
    if (!ObjectId.isValid(restaurantId)) {
      res.status(400).json({ error: "You must provide a valid ID" });
      return;
    }
    let reviews = await reviewsData.getAll(restaurantId);
    if (reviews.length === 0) {
      res.status(404).json({ error: "Reviews not found" });
      return;
    } else {
      res.json(reviews);
    }
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.post("/:restaurantId", async (req, res) => {
  try {
    let data = req.body;
    if (!req.params.restaurantId) {
      res.status(400).json({ error: "You must provide ID" });
      return;
    }
    let restaurantId = req.params.restaurantId;
    if (!ObjectId.isValid(restaurantId)) {
      res.status(400).json({ error: "You must provide a valid ID" });
      return;
    }
    const { title, reviewer, rating, dateOfReview, review } = data;
    try {
      reviewsData.commonErrorHandling(
        restaurantId,
        title,
        reviewer,
        rating,
        dateOfReview,
        review
      );
    } catch (error) {
      res.status(400).json({ error: error });
      return;
    }
    let newReview = await reviewsData.create(
      restaurantId,
      title,
      reviewer,
      rating,
      dateOfReview,
      review
    );
    res.json(newReview);
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.get("/review/:reviewId", async (req, res) => {
  try {
    if (!req.params.reviewId) {
      res.status(400).json({ error: "You must provide ID" });
      return;
    }
    let id = req.params.reviewId;
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: "You must provide a valid ID" });
      return;
    }
    let review = await reviewsData.get(id);
    if (Object.keys(review).length === 0) {
      res.status(404).json({ error: "Review not found" });
    } else {
      res.json(review);
    }
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let data = req.body;
    data.id = req.params.id;
    let updatedReview = await reviewsData.create(data);
    res.json(updatedReview);
  } catch (e) {
    res.status(404).send();
  }
});

router.delete("/review/:reviewId", async (req, res) => {
  try {
    if (!req.params.reviewId) {
      res.status(400).json({ error: "You must provide ID" });
      return;
    }
    let id = req.params.reviewId;
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: "You must provide a valid ID" });
      return;
    }
    let deletedResaurant = await reviewsData.remove(id);
    res.json({ reviewId: req.params.reviewId, deleted: true });
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

module.exports = router;
