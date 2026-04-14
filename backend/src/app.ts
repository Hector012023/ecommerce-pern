import express from "express";
import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth.routes";
import cors from "cors";

const app = express();

//Middleware: permite recibir JSON
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));
//Rutas
//Todas las rutas de productos comienzan con /api/products
app.use("/api/products", productRoutes);

app.use("/auth", authRoutes);

export default app;
