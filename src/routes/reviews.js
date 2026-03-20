import express from "express";
import reviewController from "../controllers/reviewsControllers.js";

const router = express.Router();

router.route("/")
.get(reviewController.getReviews)
.post(reviewController.insertReviews)

router.route("/:id")
.put(reviewController.updateReviews)
.delete(reviewController.deleteReviews)

export default router;
