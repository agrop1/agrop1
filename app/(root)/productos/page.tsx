"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./productos.module.css"; // Asumiendo que tienes un archivo CSS para estilos

type Producto = {
  _id: string; // Corregido a _id en lugar de *id
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
};

const Productos = () => {
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
        setError("No se pudieron cargar los productos. Por favor, intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) {
    return <div className="loading">Cargando productos...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (productos.length === 0) {
    return <div className="empty">No hay productos disponibles.</div>;
  }

  return (
    <div className="productos-container">
      <h1>Nuestros Productos</h1>
      <div className="productos-grid">
        {productos.map((producto) => (
          <div key={producto._id} className="producto-card">
            {producto.imagen && (
              <div className="producto-imagen">
                <Image
                  src={`/capturas/${producto.imagen}`}
                  alt={producto.nombre}
                  width={200}
                  height={200}
                  layout="responsive"
                />
              </div>
            )}
            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p className="precio">${producto.precio.toLocaleString()}</p>
            <button className="btn-agregar">Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;