import express from "express";
import adminsController from "../controllers/adminsController.js";

const router = express.Router();

router.route("/")
.get(adminsController.getAdmins)
.post(adminsController.insertAdmins)

router.route("/:id")
.put(adminsController.updateAdmins)
.delete(adminsController.deleteAdmins)

export default router;