import express from "express";
import deliveryDriverController from "../controllers/deliveryDriverController.js";
import updload from "../utils/cloudinaryConfig.js";

const router = express.Router()

router.route("/")
.get(deliveryDriverController.getAllDrivers)
.post(updload.single("image"), deliveryDriverController.insertDriver)

router.route("/:id")
.put(updload.single("image"), deliveryDriverController.updateDriver)
.delete(deliveryDriverController.deleteDriver)

export default router