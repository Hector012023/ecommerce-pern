import { Request, Response } from "express";
import { fetchProducts } from "../services/product.service";

//Controlador: obtiene productos
export const getProducts = (req: Request, res: Response) => {
  const products = fetchProducts();

  res.json(products);
};
