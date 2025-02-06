"use client"

import { useState, ChangeEvent } from "react";

interface UserData {
  name: string;
  email: string;
  phone: string;
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Datos actualizados:", userData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Editar Perfil</h2>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={userData.name}
        onChange={handleChange}
        className="mb-3 p-2 border rounded w-full"
      />
      <input
        type="email"
        name="email"
        placeholder="Correo Electrónico"
        value={userData.email}
        onChange={handleChange}
        className="mb-3 p-2 border rounded w-full"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Teléfono"
        value={userData.phone}
        onChange={handleChange}
        className="mb-3 p-2 border rounded w-full"
      />
      <button onClick={handleSubmit} className="w-full bg-blue-500 text-white p-2 rounded">Guardar Cambios</button>
    </div>
  );
}
