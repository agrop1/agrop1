"use client";

import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  weight: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ id: 0, name: "", price: 0, weight: 0 });
  const [editing, setEditing] = useState(false);

  // Cargar productos desde la API
  useEffect(() => {
    fetch("/api/productos")
      .then((res) => res.json())
      .then((data) => {
        console.log("Productos obtenidos:", data);
        setProducts(data);
      })
      .catch((error) => console.error("Error cargando productos:", error));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const url = "/api/productos";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      const newProduct = await response.json();
      setProducts((prev) =>
        editing ? prev.map((p) => (p.id === newProduct.id ? newProduct : p)) : [...prev, newProduct]
      );
      setEditing(false);
      setForm({ id: 0, name: "", price: 0, weight: 0 });
    }
  };

  const handleEdit = (product: Product) => {
    setForm(product);
    setEditing(true);
  };

  const handleDelete = async (id: number) => {
    const response = await fetch("/api/productos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-green-500 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">ECOMERCADO</h1>
        <ul className="flex space-x-4">
          <li><a href="#" className="hover:underline">Inicio</a></li>
          <li><a href="#" className="hover:underline">Productos</a></li>
          <li><a href="#" className="hover:underline">Contacto</a></li>
        </ul>
      </nav>

      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Administrar Productos</h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 border p-4 rounded">
          <input type="text" name="name" placeholder="Nombre" value={form.name} onChange={handleInputChange} required className="p-2 border rounded" />
          <input type="number" name="price" placeholder="Precio" value={form.price} onChange={handleInputChange} required className="p-2 border rounded" />
          <input type="number" name="weight" placeholder="Peso" value={form.weight} onChange={handleInputChange} required className="p-2 border rounded" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            {editing ? "Actualizar Producto" : "Agregar Producto"}
          </button>
        </form>

        {/* Lista de productos */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Mis Productos</h2>
          {products.length === 0 ? (
            <p className="text-gray-500">No hay productos.</p>
          ) : (
            <ul className="space-y-2">
              {products.map((product) => (
                <li key={product.id} className="flex justify-between p-2 border rounded">
                  <span>{product.name} - ${product.price} ({product.weight} kg)</span>
                  <div className="space-x-2">
                    <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white p-1 rounded">Editar</button>
                    <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white p-1 rounded">Eliminar</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
