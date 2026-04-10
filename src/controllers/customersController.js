import customerModel from "../models/customers.js"

const customerController = {};

customerController.getCustomers = async (req, res) => {
    try{
        const customers = await customerModel.find();
        return res.status(200).json(customers)
    } catch (error) {
        console.log("error " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

customerController.deleteCustomers = async (req, res) => {
    try{
        const deletedCustomers = await customerModel.findByIdAndDelete(req.param.id);
        if(!deletedCustomers){
            return res.status(404).json({message: "customer not found"})
        }
        return res.status(200).json(customers)
    } catch (error) {
        console.log("error " + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

customerController.updateCustomer = async (req, res) => {
    try{
        let {
            name,
            lastName,
            birthdate,
            email,
            password,
            isVerified,
            loginAttempts,
            timeOut
        } = req.body;

        name = name?.trim();
        email = email?.trim();

        if(name.length < 3 || name.length > 15){
            return res.status(400).json({message: "Invalid name"})
        }

        const updateCustomer = await customerModel.findByIdAndUpdate(req.params.id,
            {
                name,
                lastName,
                birthdate,
                email,
                password,
                isVerified,
                loginAttempts,
                timeOut
            }, {new:true}
        );

        if(!updateCustomer){
            return res.status(400).json({message:"customer not found"});
        }

        return res.status(200).json({message: "customer updated"});
    } catch(error){
        console.log("error " + error);
        return res.status(500).json({message : "Internal server error"});
    }
}

export default customerController;