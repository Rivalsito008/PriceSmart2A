import express from "express";
import customerController from "../controllers/customersController.js"

const router = express.Router();

router.route("/")
    .get(customerController.getCustomers)

router.route("/:id")
    .put(customerController.updateCustomer)
    .delete(customerController.deleteCustomers);

export default router;