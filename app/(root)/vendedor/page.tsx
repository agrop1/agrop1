"use client";

import React, { useEffect, useState } from "react";

const CrearProducto = () => {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensaje("Creando producto...");

    try {
      const res = await fetch("/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: form.nombre,
          descripcion: form.descripcion,
          precio: parseFloat(form.precio),
          imagen: form.imagen,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error creando producto");
      }

      setMensaje("Producto creado exitosamente 🎉");
      setForm({ nombre: "", descripcion: "", precio: "", imagen: "" });
    } catch (error: any) {
      console.error("Error al crear producto:", error);
      setMensaje(error.message || "Error desconocido");
    }
  };

  return (
    <div>
      <h2>Crear nuevo producto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="descripcion"
          placeholder="Descripción"
          value={form.descripcion}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="imagen"
          placeholder="URL de la imagen"
          value={form.imagen}
          onChange={handleChange}
          required
        />
        <button type="submit">Crear producto</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default CrearProducto;
