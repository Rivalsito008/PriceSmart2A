import deliveryDriverModel from "../models/deliveryDrivers.js";
import {v2 as cloudinary} from "cloudinary"

const deliveryDriverController = {}

deliveryDriverController.getAllDrivers = async (req, res) => {
    try {
        const drivers = await deliveryDriverModel.find()
        return res.status(200).json(drivers)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

deliveryDriverController.insertDriver = async (req, res) => {
    try {
        const {name, phone, cars, isActive} = req.body;

        const newDriver = new deliveryDriverModel({
            name,
            phone,
            image: req.file.path,
            public_id: req.file.filename,
            cars,
            isActive
        })

        await newDriver.save()

        return res.status(200).json({message: "Delivery driver saved"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

deliveryDriverController.deleteDriver = async (req, res) => {
    try {
        const driverFound = await deliveryDriverModel.findById(req.params.id)

        await cloudinary.uploader.destroy(driverFound.public_id)

        await deliveryDriverModel.findByIdAndDelete(req.params.id)

        return res.status(200).json({message: "Driver deleted"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

deliveryDriverController.updateDriver = async (req, res) => {
    try {
        const {name, phone, cars, isActive} = req.body;

        const driverFound = await deliveryDriverModel.findById(req.params.id)

        const updatedData = {
            name,
            phone,
            cars,
            isActive
        }

        if(req.file){
            await cloudinary.uploader.destroy(driverFound.public_id)

            updatedData.image = req.file.path
            updatedData.public_id = req.file.filename
        }

        await deliveryDriverModel.findByIdAndUpdate(
            req.params.id,
            updatedData,
            {new: true}
        )

        return res.status(200).sjon({message: "Driver updated"})
    } catch (error){
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default deliveryDriverController