"use client";

import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ id: 0, name: "", price: 0, quantity: 0 });
  const [editing, setEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      setProducts(products.map((p) => (p.id === form.id ? form : p)));
      setEditing(false);
    } else {
      setProducts([...products, { ...form, id: Date.now() }]);
    }
    setForm({ id: 0, name: "", price: 0, quantity: 0 });
  };

  const handleEdit = (product: Product) => {
    setForm(product);
    setEditing(true);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Administrar Productos</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 border p-4 rounded">
        <input type="text" name="name" placeholder="Nombre" value={form.name} onChange={handleInputChange} required className="p-2 border rounded" />
        <input type="number" name="price" placeholder="Precio" value={form.price} onChange={handleInputChange} required className="p-2 border rounded" />
        <input type="number" name="quantity" placeholder="Cantidad" value={form.quantity} onChange={handleInputChange} required className="p-2 border rounded" />
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
                <span>{product.name} - ${product.price} ({product.quantity} disponibles)</span>
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
  );
}
