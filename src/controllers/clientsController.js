const clientsController = {};

import clientsModel from "../models/clients.js";

clientsController.getClients = async (req, res) => {
    try {
        const clients = await clientsModel.find();
        return res.status(200).json(clients);
    } catch (error) {
        console.log("Error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

clientsController.insertClients = async (req, res) => {
    try {
        let {name, email, password, birthday, status, isVerified, loginAttempts, timeOut} = req.body;
        name = name?.trim();
        email = email?.trim();
        password = password?.trim();
        if(!name || !email || !password){
            return res.status(400).json({ message: "Missing required fields" });
        }
        if(birthday > "2026-01-01"){
            return res.status(400).json({ message: "Invalid birthday" });
        }
        if (name.length < 3) {
            return res.status(400).json({ message: "Name too short" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password too short" });
        }
        const client = new clientsModel({name, email, password, birthday, status, isVerified, loginAttempts, timeOut});
        await client.save();
        return res.status(200).json({message: "Client saved"});
    } catch (error) {
        console.log("Error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

clientsController.deleteClients = async (req, res) => {
    try {
        const deleteClient = await clientsModel.findByIdAndDelete(req.params.id);
        if(!deleteClient){
            return res.status(404).json({ message: "Client not found" });
        }
        return res.status(200).json({message: "Client deleted"});
    } catch (error) {
        console.log("Error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

clientsController.updateClients = async (req, res) => {
    try {
        let {name, email, password, birthday, status, isVerified, loginAttempts, timeOut} = req.body;
        name = name?.trim();
        email = email?.trim();
        password = password?.trim();
        if(!name || !email || !password){
            return res.status(400).json({ message: "Missing required fields" });
        }
        if (name.length < 3) {
            return res.status(400).json({ message: "Name too short" });
        }
        if(birthday > "2026-01-01"){
            return res.status(400).json({ message: "Invalid birthday" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password too short" });
        }
        const updateClient = await clientsModel.findByIdAndUpdate(req.params.id, {name, email, password, birthday, status, isVerified, loginAttempts, timeOut}, {new: true});
        if(!updateClient){
            return res.status(404).json({ message: "Client not found" });
        }
        return res.status(200).json({message: "Client updated"});
    } catch (error) {
        console.log("Error" + error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default clientsController;