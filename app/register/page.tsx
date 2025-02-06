"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    role: "cliente",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nombre || !formData.email || !formData.password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setError("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registro exitoso 🎉");
        router.push("/");
      } else {
        setError("Error en el registro, intenta nuevamente.");
      }
    } catch (err) {
      setError("Error en el servidor.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Registro de Usuario</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Ingresa tu nombre"
          />
        </div>

        <div>
          <label className="block text-gray-700">Correo:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="ejemplo@correo.com"
          />
        </div>

        <div>
          <label className="block text-gray-700">Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="••••••"
          />
        </div>

        <div>
          <label className="block text-gray-700">Rol:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="cliente">Cliente</option>
            <option value="agricultor">Agricultor</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}
