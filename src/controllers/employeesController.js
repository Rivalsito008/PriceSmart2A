import employeesModel from "../models/employees.js"

const employeeController = {};

employeeController.getEmployees = async (req, res) => {
    try{
        const employees = await employeesModel.find();
        return res.status(200).json(employees)
    } catch (error) {
        console.log("error " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

employeeController.deleteEmployees = async (req, res) => {
    try{
        const deletedEmployees = await employeesModel.findByIdAndDelete(req.param.id);
        if(!deletedEmployees){
            return res.status(404).json({message: "employees not found"})
        }
        return res.status(200).json(employees)
    } catch (error) {
        console.log("error " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

employeeController.updateEmployees = async (req, res) => {
    try{
        let {
            name,
            lastName,
            salary,
            DUI,
            email,
            phone,
            password,
            idBranches,
            isVerified
        } = req.body;

        name = name?.trim();
        email = email?.trim();

        if(name.length < 3 || name.length > 15){
            return res.status(400).json({message: "Invalid name"})
        }

        const updateEmployees = await employeesModel.findByIdAndUpdate(req.params.id,
            {
                name,
                lastName,
                salary,
                DUI,
                email,
                phone,
                password,
                idBranches,
                isVerified
            }, {new:true}
        );

        if(!updateEmployees){
            return res.status(400).json({message:"employees not found"});
        }

        return res.status(200).json({message: "employees updated"});
    } catch(error){
        console.log("error " + error);
        return res.status(500).json({message : "Internal server error"});
    }
}

export default employeeController;