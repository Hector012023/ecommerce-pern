import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña es requerida"),
});

export const updateUserSchema = z
  .object({
    email: z.string().email("Email inválido").optional(),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .optional(),
  })
  .refine((data) => data.email || data.password, {
    message: "Debes actualizar al menos tu email o password",
    path: [], //error general
  });
