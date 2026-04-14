import { Router } from "express";
import {
  registerController,
  loginController,
  getMeController,
  updateMeController,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);

router.get("/me", authMiddleware, getMeController);
router.put("/me", authMiddleware, updateMeController);

export default router;
