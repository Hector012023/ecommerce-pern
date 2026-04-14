import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //obtener header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "token requerido",
      });
    }

    //Extraer token (Bearer TOKEN)
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token inválido",
      });
    }

    //Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: number;
    };

    //Guardar userId en request
    req.userId = decoded.userId;

    next(); //continuar a la ruta
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
