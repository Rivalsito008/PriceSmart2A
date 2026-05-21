import express from "express";
import providersController from "../controllers/providersController.js"
import upload from "../utils/cloudinaryConfig.js"


const router = express.Router()

router.route("/")
    .get(providersController.getProviders)
    .post(upload.single("image"), providersController.insertProviders)

router.route("/:id")
    .put(upload.single("image"), providersController.updateProviders)
    .delete(providersController.deletedProviders)

export default router;
