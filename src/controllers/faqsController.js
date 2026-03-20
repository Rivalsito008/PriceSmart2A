const faqsController = {}

import faqsModel from "../models/faqs.js";

//Obtener faqs
faqsController.getFaqs = async (req, res) => {
    const faqs = await faqsModel.find();
    res.json(faqs);
}

//Insertar faqs
faqsController.insertFaqs = async (req, res) => {
    const {question, answer, isActive} = req.body;
    const newFaq = new faqsModel({question, answer, isActive});
    await newFaq.save();
    res.json({message: "Faq saved"});
}

//Eliminar faqs
faqsController.deleteFaqs = async (req, res) => {
    await faqsModel.findByIdAndDelete(req.params.id);
    res.json({message: "Faq deleted"});
}

//Actualizar faqs
faqsController.updateFaqs = async (req, res) => {
    const {question, answer, isActive} = req.body;
    await faqsModel.findByIdAndUpdate(req.params.id, {question, answer, isActive}, {new: true});
    res.json({message: "Faq updated"});
}

export default faqsController;