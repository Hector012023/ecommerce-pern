import bcrypt from "bcrypt";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";
import { email } from "zod";

export const registerUser = async (data: {
  email: string;
  password: string;
}) => {
  //verificar si el email ingresado existe en la db
  const existingUser = await getUserByEmail(data.email);

  if (existingUser) {
    throw new Error("EMAIL_EXISTS");
  }
  //hashear la contraseña
  const hashedPassword = await bcrypt.hash(data.password, 10);

  //insertar el nuevo usuario
  const result = await db
    .insert(users)
    .values({ email: data.email, password: hashedPassword })
    .returning();

  return result[0];
};

export const loginUser = async (data: { email: string; password: string }) => {
  //Buscar usuario por email
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email));

  const user = result[0];

  //Si no existe el usuario
  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  //Comparar password
  const isMatch = await bcrypt.compare(data.password, user.password);

  if (!isMatch) {
    throw new Error("INVALID_CREDENTIALS");
  }

  //Retornar usuario válido
  return user;
};

export const getUserById = async (userId: number) => {
  const result = await db
    .select({ id: users.id, email: users.email, createdAt: users.createdAt })
    .from(users)
    .where(eq(users.id, userId));

  return result[0];
};

export const updateUser = async (
  userId: number,
  data: { email?: string; password?: string },
) => {
  // 🔴 validar email único SOLO si viene email
  if (data.email) {
    const existingUser = await getUserByEmail(data.email);

    if (existingUser && existingUser.id !== userId) {
      throw new Error("EMAIL_EXISTS");
    }
  }
  let hashedPassword;

  if (data.password) {
    hashedPassword = await bcrypt.hash(data.password, 10);
  }

  const result = await db
    .update(users)
    .set({
      ...(data.email && { email: data.email }),
      ...(hashedPassword && { password: hashedPassword }),
    })
    .where(eq(users.id, userId))
    .returning({ id: users.id, email: users.email });

  return result[0];
};;

export const getUserByEmail = async (email: string) => {
  const result = await db.select().from(users).where(eq(users.email, email));

  return result[0];
};
