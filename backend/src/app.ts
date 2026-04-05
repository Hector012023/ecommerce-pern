import express from "express";
import productRoutes from './routes/product.routes'

const app = express();

//Middleware: permite recibir JSON
app.use(express.json());

//Rutas
//Todas las rutas de productos comienzan con /api/products
app.use("/api/products", productRoutes);


export default app;
