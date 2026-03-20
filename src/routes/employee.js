import express from "express";
import employeeController from "../controllers/employeeControllers.js";

const router = express.Router();

router.route("/")
.get(employeeController.getEmployees)
.post(employeeController.insertEmployees)

router.route("/:id")
.put(employeeController.updateEmployees)
.delete(employeeController.deleteEmployees)
export default router;