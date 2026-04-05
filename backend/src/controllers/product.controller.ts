import { Request, Response } from "express";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/product.service";

//Controlador: obtiene productos
export const getProducts = async (req: Request, res: Response) => {
  const data = await fetchProducts();

  res.json(data);
};

//Controlador: crea un producto

export const createProductController = async (req: Request, res: Response) => {
  try {
    const { name, price } = req.body;

    // 1. Validar existencia
    if (!name) {
      return res.status(400).json({
        message: "El nombre es requerido",
      });
    }

    if (price === undefined) {
      return res.status(400).json({
        message: "El precio es requerido",
      });
    }

    // 2. Validar tipo
    if (typeof price !== "number") {
      return res.status(400).json({
        message: "El precio debe ser un número",
      });
    }

    // 3. Regla de negocio (opcional pero recomendable)
    if (price <= 0) {
      return res.status(400).json({
        message: "El precio no puede ser negativo",
      });
    }

    const product = await createProduct({ name, price });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el producto.",
    });
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, price } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        message: "Id inválido",
      });
    }

    if (price !== undefined && typeof price !== "number") {
      return res.status(400).json({ message: "El precio debe ser un número" });
    }

    const updatedProduct = await updateProduct(id, { name, price });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar producto",
    });
  }
};

export const deleteProductControler = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "Id inválido",
      });
    }

    const deletedProduct = await deleteProduct(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.json({
      message: "Producto eliminado correctamente",
      product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar producto",
    });
  }
};
