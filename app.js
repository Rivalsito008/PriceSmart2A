import express from "express"
import productsRouters from "./src/routes/products.js";
import faqsRouters from "./src/routes/faqs.js";
import branchesRouters from "./src/routes/branches.js";

const app = express();

//Que acepte JSON desde cualquier lado
app.use(express.json());

//Rutas
app.use("/api/products", productsRouters)
app.use("/api/faqs", faqsRouters)
app.use("/api/branches", branchesRouters)

export default app;