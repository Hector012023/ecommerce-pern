import { Request, Response } from "express";
import {
  registerSchema,
  loginSchema,
  updateUserSchema,
} from "../validators/auth.validator";
import {
  registerUser,
  loginUser,
  getUserById,
  updateUser,
} from "../services/auth.service";
import { generateToken } from "../utils/jwt";
import { ZodError } from "zod";

export const registerController = async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);

    const user = await registerUser(data);

    res.status(201).json({
      id: user.id,
      email: user.email,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ errors: error.errors });
    }
    //Error de negocio
    if (error.message === "EMAIL_EXISTS") {
      return res.status(400).json({
        message: "El email ya está registrado",
      });
    }
    res.status(500).json({
      message: "Error al registrar usuario",
    });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    //Validar datos
    const data = loginSchema.parse(req.body);

    //Validar credenciales
    const user = await loginUser(data);

    //Generar token
    const token = generateToken(user.id);

    //Respuesta
    res.json({ token, user: { id: user.id, email: user.email } });
  } catch (error: any) {
    //validación Zod
    if (error.name === "ZodError") {
      return res.status(400).json({ errors: error.errors });
    }

    //Credenciales incorrectas
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({
        message: "Email o contraseña incorrectos",
      });
    }

    //Error general
    res.status(500).json({
      message: "Error al iniciar sessión",
    });
  }
};

export const getMeController = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!; //viene del middleware

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    res.json(user);
  } catch {
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

export const updateMeController = async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;

    //validar datos
    const data = updateUserSchema.parse(req.body);

    const updatedUser = await updateUser(userId, data);

    res.json(updatedUser);
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({ errors: error.issues });
    }
    if(error.message==='EMAIL_EXISTS'){
      return res.status(400).json({
        errors:[
          {path:['Email'],
            message:'El email ya está en uso'
          }
        ]
      })
    }
    return res.status(500).json({ message: "Error al actualizar usuario" });
  }
};
