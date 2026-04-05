import { eq } from "drizzle-orm";
import { db } from "../db";
import { products } from "../db/schema";

//Servicio obtener productos
export const fetchProducts = async () => {
  return await db.select().from(products);
};

//Servicio crear producto
export const createProduct = async (data: { name: string; price: number }) => {
  const result = await db.insert(products).values(data).returning();
  return result[0];
};

//Servicio actualizar producto
export const updateProduct = async (
  id: number,
  data: { name?: string; price?: number },
) => {
  const result = await db
    .update(products)
    .set(data)
    .where(eq(products.id, id))
    .returning();
  return result[0];
};

//Servicio eliminar producto
export const deleteProduct= async(id:number)=>{
  const result = await db.delete(products).where(eq(products.id, id)).returning();

  return result[0]
}