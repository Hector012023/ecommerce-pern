import { Product } from "../types/product.types";

//Simulación de base de datos
const products: Product[] = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Mouse", price: 50 },
];

//Servicio obtener productos
export const fetchProducts = (): Product[] => {
  return products;
};
