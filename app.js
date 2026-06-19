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
import loginCustomersRouters from "./src/routes/loginCustomer.js";
import logoutRoutes from "./src/routes/logout.js";
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js";
import cors from "cors";
import limiter from "./src/middlewares/rateLimiter.js";
import providerRoutes from "./src/routes/provider.js";
import wompiRoutes from "./src/routes/wompiToken.js";
import deliveryDriverRoutes from "./src/routes/deliveryDriver.js"
import { validateAuthCokkie } from "./src/middlewares/authMiddleware.js";
import loginAdminRoutes from "./src/routes/loginAdmin.js";
import registerAdminController from "./src/routes/registerAdmin.js";
 
const app = express();

app.use(limiter);

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], 
    credentials: true
}));

app.use(cookieParser());
//Que acepte JSON desde cualquier lado
app.use(express.json());

//Rutas
app.use("/api/products", productsRouters)
app.use("/api/faqs", faqsRouters)
app.use("/api/branches", branchesRouters)
app.use("/api/employees", validateAuthCokkie(['admin']), employeesRouters)
app.use("/api/reviews", reviewsRouters)
app.use("/api/brands", brandsRouters)
app.use("/api/admins", adminsRouters)
app.use("/api/clients", clientsRouters)
app.use("/api/customers", customersRouters)
app.use("/api/registerCustomers", registerCustomersRouters)
app.use("/api/registerEmployees", registerEmployeesRouters)
app.use("/api/login", loginCustomersRouters)
app.use("/api/logout", logoutRoutes)
app.use("/api/recoveryPassword", recoveryPasswordRoutes)
app.use("/api/provider", validateAuthCokkie(['admin', 'customer']), providerRoutes)
app.use("/api/wompi", wompiRoutes)
app.use("/api/deliveryDriver", deliveryDriverRoutes)
app.use("/api/loginAdmin", loginAdminRoutes)
app.use("/api/registerAdmin", registerAdminController)

export default app;