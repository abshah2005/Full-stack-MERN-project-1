import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/User.routes.js";
import { sellerRoute } from "./routes/Seller.routes.js";
import productsRoutes from "./routes/Product.routes.js";
import categoryRoutes from "./routes/Category.route.js";
import ordersRoutes from "./routes/Orders.routes.js"

import BrandRoutes from "./routes/Brands.route.js"

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Adjust to your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/users", userRoute);
app.use("/api/v1/sellers", sellerRoute);
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/categories",categoryRoutes);
app.use("/api/v1/orders",ordersRoutes);
app.use("/api/v1/Brands",BrandRoutes);

export { app };
