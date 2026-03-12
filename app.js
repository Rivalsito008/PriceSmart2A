import express from "express"
import productsRouters from "./src/routes/products";

const app = express();

app.use("/app/products", productsRouters)
export default app;