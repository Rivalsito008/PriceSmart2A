import express from "express";
import {
    getCustomers,
    updateCustomer,
    deleteCustomers
} from "../controllers/customersController.js";
import { validateAuthCokkie } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/")
    .get(validateAuthCokkie(['admin']), getCustomers)

router.route("/:id")
    .put(validateAuthCokkie(['admin']), updateCustomer)
    .delete(validateAuthCokkie(['admin']), deleteCustomers);

export default router;