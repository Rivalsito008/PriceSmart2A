import express from "express"
import productController from "../controllers/productsController.js";

const router = express.Router();

router.route("/")
.get(productController.getProducts)
.post(productController.insertProducts)

router.route("/:id")
.put(productController.updateProducts)
.delete(productController.deleteProducts)

export default router;