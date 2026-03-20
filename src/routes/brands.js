import express from "express";
import brandController from "../controllers/brandsController.js";

const router = express.Router();

router.route("/")
.get(brandController.getBrands)
.post(brandController.insertBrands)

router.route("/:id")
.put(brandController.updateBrands)
.delete(brandController.deleteBrands)

export default router;