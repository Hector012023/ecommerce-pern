import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),

  price: z
    .string()
    .transform((val) => Number(val))
    .superRefine((val, ctx) => {
      if (isNaN(val)) {
        ctx.addIssue({
          code: "custom",
          message: "El precio debe ser un número válido",
        });
        return; // 🔥 corta ejecución
      }

      if (val <= 0) {
        ctx.addIssue({
          code: "custom",
          message: "El precio debe ser mayor a 0",
        });
      }
    }),
});
