import { useEffect, useState } from "react";
import { getProducts } from "../services/product.service";
import type { Product } from "../types/product";

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar productos", error);
      }
    };
    fetchProducts()
  },[]);
  return (
    <div>
      <h1>Productos</h1>
      {products.map((product)=>(
        <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
};
