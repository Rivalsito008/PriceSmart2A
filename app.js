import express from "express"
import productsRouters from "./src/routes/products.js";
import faqsRouters from "./src/routes/faqs.js";
import branchesRouters from "./src/routes/branches.js";
import employeesRouters from "./src/routes/employee.js";
import reviewsRouters from "./src/routes/reviews.js";
import brandsRouters from "./src/routes/brands.js";
import adminsRouters from "./src/routes/admins.js";
import clientsRouters from "./src/routes/clients.js";
import customersRouters from "./src/routes/customers.js"
import registerCustomersRouters from "./src/routes/registerCustomers.js";
import registerEmployeesRouters from "./src/routes/registerEmployees.js"
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
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
app.use("/api/customers", customersRouters)
app.use("/api/registerCustomers", registerCustomersRouters)
app.use("/api/registerEmployees", registerEmployeesRouters)


export default app;