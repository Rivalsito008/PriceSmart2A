import express from "express"
import {
    login
} from "../controllers/loginAdminController.js";
import { validateAuthCokkie } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/")
.post(validateAuthCokkie(['admin']), login)

export default router;