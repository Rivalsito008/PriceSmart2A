const productController = {};

import productsModel from "../models/products.js";

//Obtener productos
productController.getProducts = async (req, res) => {
    const products = await productsModel.find();
    res.json(products); 
}

//Insertar productos
productController.insertProducts = async (req, res) => {
    const {name, description, price, stock} = req.body;
    const product = new productsModel({name, description, price, stock});
    await product.save();
    res.json({message: "Product saved"});
}

//Eliminar productos
productController.deleteProducts = async (req, res) => {
    await productsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Product deleted"});
}

//Actualizar productos
productController.updateProducts = async (req, res) => {
    //solicitamos los nuevos valores
    const {name, description, price, stock} = req.body;
    await productsModel.findByIdAndUpdate(req.params.id, {name, description, price, stock}, {new: true});
    res.json({message: "Product updated"});
}

//Obtener por ID
productController.getProductById = async (req, res) => {
    try{
        const product = await productsModel.findById(req.params.id);

        if (!product){
            return res.status(404).json({message: "Product not found"});
        }

        return res.status(200).json(product);
    }catch(error){
        console.error("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

//Obtener por nombre
productController.getProductByName = async (req, res) => {
    try{
        const {name} = req.body;
        const products = await productsModel.find({name: {$regex: name, $options: "i"}});

        if (!products){
            return res.status(404).json({message: "Products not found"});
        }

        return res.status(200).json(products);
    }catch(error){
        console.error("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

//Products con stock bajo
productController.getLowStock = async (req, res) => {
    try{
 
        const products = await productsModel.find({stock: { $lt: 5}})
 
        if(!products){
            return res.status(404).json({message: "Not products with low stock"})
        }
 
        return res.status(200).json(products)
    }catch{
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}


//Filtro que el usuario coloque
productController.getProductsByPriceRange = async (req, res) => {
    try{
        const {min, max} = req.body;
        const products = await productsModel.find({price: {$gte: min, $lte: max}})
        if (!products)
            return res.status(404).json({message: "Products not found"})

        return res.status(200).json(products);
    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

//Contar cuantos elementos hay en una coleccion
productController.countProducts = async (req, res) => {
    try{
        const count = await productsModel.countDocuments();
        return res.status(200).json({count});
    } catch (error) {
        console.error("Error: " + error);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default productController;