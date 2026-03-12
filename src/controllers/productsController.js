const productController = {};

import producctModel from "../models/product.js";

productController.getProducts = async (req, res) => {
    const products = await producctModel.find();
    res.json(products); 
}
