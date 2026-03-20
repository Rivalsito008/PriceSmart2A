import express from "express"
import productsRouters from "./src/routes/products.js";
import faqsRouters from "./src/routes/faqs.js";
import branchesRouters from "./src/routes/branches.js";
import employeesRouters from "./src/routes/employee.js";
import reviewsRouters from "./src/routes/reviews.js";
import brandsRouters from "./src/routes/brands.js";
import adminsRouters from "./src/routes/admins.js";
import clientsRouters from "./src/routes/clients.js";

const app = express();

//Que acepte JSON desde cualquier lado
app.use(express.json());

//Rutas
app.use("/api/products", productsRouters)
app.use("/api/faqs", faqsRouters)
app.use("/api/branches", branchesRouters)
app.use("/api/employees", employeesRouters)
app.use("/api/reviews", reviewsRouters)
app.use("/api/brands", brandsRouters)
app.use("/api/admins", adminsRouters)
app.use("/api/clients", clientsRouters)

export default app;