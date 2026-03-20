const employeeController = {};

import employeesModel from "../models/employees.js";

//Obtener empleados
employeeController.getEmployees = async (req, res) => {
    const employees = await employeesModel.find();
    res.json(employees);
}

//Insertar empleados
employeeController.insertEmployees = async (req, res) => {
    const {name, lastName, salary, DUI, email, phone, password, idBranches} = req.body;
    const employee = new employeesModel({name, lastName, salary, DUI, email, phone, password, idBranches});
    await employee.save();
    res.json({message: "Employee saved"});
}

//Eliminar empleados
employeeController.deleteEmployees = async (req, res) => {
    await employeesModel.findByIdAndDelete(req.params.id);
    res.json({message: "Employee deleted"});
}

//Actualizar empleados
employeeController.updateEmployees = async (req, res) => {
    const {name, lastName, salary, DUI, email, phone, password, idBranches} = req.body;
    await employeesModel.findByIdAndUpdate(req.params.id, {name, lastName, salary, DUI, email, phone, password, idBranches}, {new: true});
    res.json({message: "Employee updated"});
}

export default employeeController;