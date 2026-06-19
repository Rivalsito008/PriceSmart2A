import express from "express";
import registerAdminController from "../controllers/registerAdminController.js";
const router = express.Router();

router.route("/")
.post(registerAdminController.registrar);

router.route("/verifyCodeEmail")
.post(registerAdminController.verifyCode)

export default router;

