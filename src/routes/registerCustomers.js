import express from "express";
import registerCustomersController from "../controllers/registerCustomerController.js";

const router = express.Router();

router.route("/")
.post(registerCustomersController.registrar);

router.route("/verifyCodeEmail")
.post(registerCustomersController.verifyCode)

export default router;

