"use client";
import React, { useEffect, useState } from "react";

type Producto = {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
};

const Productos = () => {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const res = await fetch("/api/productos");
      const data = await res.json();
      setProductos(data);
    };

    fetchProductos();
  }, []);

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10">Productos disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <div key={producto._id} className="card bg-base-200 shadow-xl">
            <figure>
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{producto.nombre}</h2>
              <p>{producto.descripcion}</p>
              <div className="card-actions justify-between mt-4">
                <span className="text-primary font-bold">${producto.precio}</span>
                <button className="btn btn-sm btn-success">Agregar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productos;
