import express from "express"
import productsRouters from "./src/routes/products.js";

const app = express();

//Que acepte JSON desde cualquier lado
app.use(express.json());

//Rutas
app.use("/app/products", productsRouters)

export default app;