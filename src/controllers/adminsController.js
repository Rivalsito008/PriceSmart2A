const adminsController = {};

import adminsModel from "../models/admins.js";

//Obtener admins
adminsController.getAdmins = async (req, res) => {
    try {
        const admins = await adminsModel.find();
        return res.status(200).json(admins);
    } catch (error) {
        console.log("Error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

//Insertar admins
adminsController.insertAdmins = async (req, res) => {
    try {
        let {name, email, password, isVerified} = req.body;
        name = name?.trim();
        email = email?.trim();
        password = password?.trim();
        if(!name || !email || !password){
            return res.status(400).json({ message: "Missing required fields" });
        }
        if (name.length < 3) {
            return res.status(400).json({ message: "Name too short" });
        }
        if (email.length > 100) {
            return res.status(400).json({ message: "Email too long" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password too short" });
        }
        const admin = new adminsModel({name, email, password, isVerified});
        await admin.save();
        return res.status(200).json({message: "Admin saved"});
    } catch (error) {
        console.log("Error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

adminsController.deleteAdmins = async (req, res) => {
    try {
        const deleteAdmin = await adminsModel.findByIdAndDelete(req.params.id);
        if(!deleteAdmin){
            return res.status(404).json({ message: "Admin not found" });
        }
        return res.status(200).json({message: "Admin deleted"});
    } catch (error) {
        console.log("Error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

adminsController.updateAdmins = async (req, res) => {
    try {
        let {name, email, password, isVerified} = req.body;
        name = name?.trim();
        email = email?.trim();
        password = password?.trim();
        if(!name || !email || !password){
            return res.status(400).json({ message: "Missing required fields" });
        }
        if (name.length < 3) {
            return res.status(400).json({ message: "Name too short" });
        }
        if (email.length > 100) {
            return res.status(400).json({ message: "Email too long" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password too short" });
        }
        const updateAdmin = await adminsModel.findByIdAndUpdate(req.params.id, {name, email, password, isVerified}, {new: true});
        if(!updateAdmin){
            return res.status(404).json({ message: "Admin not found" });
        }
        return res.status(200).json({message: "Admin updated"});
    } catch (error) {
        console.log("Error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
export default adminsController;