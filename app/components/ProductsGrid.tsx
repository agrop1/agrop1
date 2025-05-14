"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

type Producto = {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
};

const ProductsGrid = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/productos");

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        setProductos(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching productos:", err);
        setError(
          "No se pudieron cargar los productos. Por favor, intenta de nuevo más tarde.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12 text-lg text-gray-600">
        Cargando productos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-lg text-red-600">{error}</div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className="text-center py-12 text-lg text-gray-600 italic">
        No hay productos disponibles.
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl sm:max-w-7xl mx-auto px-2 sm:px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-10 relative after:content-[''] after:absolute after:bottom-[-8px] sm:after:bottom-[-10px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-16 sm:after:w-20 after:h-1 after:bg-teal-600 after:rounded">
        Nuestros Productos
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 sm:gap-8">
        {productos.map((producto) => (
          <div key={producto._id} className="flex h-full w-full">
            <ProductCard
              nombre={producto.nombre}
              descripcion={producto.descripcion}
              precio={producto.precio}
              imagen={producto.imagen}
              _id={producto._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
