import { Router } from "express";
import {
  createProductController,
  deleteProductControler,
  getProducts,
  updateProductController,
} from "../controllers/product.controller";

const router = Router();

//GET /api/products
router.get("/", getProducts);

//POST /api/products
router.post("/", createProductController);

//PUT /api/products/:id
router.put("/:id", updateProductController);

//POST /api/products/:id
router.delete("/:id", deleteProductControler);

export default router;
