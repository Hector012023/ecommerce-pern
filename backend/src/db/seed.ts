import { db } from "../db";
import { users, products } from "./schema";

export const seed = async () => {
  try {
    // insertar usuarios
    await db.insert(users).values([
      {
        email: "test1@email.com",
        password: "123456",
      },
      {
        email: "test2@email.com",
        password: "123456",
      },
    ]);

    // insertar productos
    await db.insert(products).values([
      {
        name: "Laptop",
        price: 1000,
      },
      {
        name: "Mouse",
        price: 50,
      },
    ]);

    console.log("Seed ejecutado correctamente");
  } catch (error) {
    console.error("Error en seed:", error);
  }
};

seed();