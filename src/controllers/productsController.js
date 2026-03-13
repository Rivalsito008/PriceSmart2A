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
    await productsModel.findByIdAndDelete(id);
    res.json({message: "Product deleted"});
}

//Actualizar productos
productController.updateProducts = async (req, res) => {
    //solicitamos los nuevos valores
    const {name, description, price, stock} = req.body;
    await productsModel.findByIdAndUpdate(req.params.id, {name, description, price, stock}, {new: true});
    res.json({message: "Product updated"});
}

export default productController;