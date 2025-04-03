"use client";

import { useState, useEffect, useRef } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  weight: number;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ id: 0, name: "", price: 0, weight: 0 });
  const [editing, setEditing] = useState(false);
  
  // Estados para el chatbot
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

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

  // Auto-scroll al último mensaje
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

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

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Añadir mensaje del usuario al chat
    const newUserMessage: ChatMessage = { role: "user", content: userInput };
    setChatMessages((prev) => [...prev, newUserMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatMessages, newUserMessage],
          products: products // Enviamos los productos para dar contexto
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del chatbot");
      }

      const data = await response.json();
      setChatMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch (error) {
      console.error("Error al comunicarse con el chatbot:", error);
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Lo siento, ha ocurrido un error. Por favor, intenta nuevamente." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-green-500 p-4 text-white flex justify-between items-center">
        <h1 className="text-xl font-bold">ECOMERCADO</h1>
        <ul className="flex space-x-4">
          <li><a href="#" className="hover:underline">Inicio</a></li>
          <li><a href="#" className="hover:underline">Productos</a></li>
          <li><a href="#" className="hover:underline">Contacto</a></li>
        </ul>
      </nav>

      <div className="max-w-2xl mx-auto p-4 flex-grow">
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

      {/* Chat Section */}
      <div className="border-t mt-4 bg-gray-50">
        <div className="max-w-2xl mx-auto p-4">
          <h2 className="text-xl font-semibold mb-2">Asistente de Productos</h2>
          
          {/* Chat Messages */}
          <div className="border rounded p-4 h-64 overflow-y-auto mb-4 bg-white">
            {chatMessages.length === 0 ? (
              <p className="text-gray-500 text-center">Haz preguntas sobre nuestros productos</p>
            ) : (
              chatMessages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.role === "user" ? "text-right" : ""}`}>
                  <div
                    className={`inline-block p-2 rounded ${
                      msg.role === "user" ? "bg-blue-100" : "bg-gray-100"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="text-gray-500">
                <span className="animate-pulse">Escribiendo...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleChatSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="¿Tienes alguna pregunta sobre nuestros productos?"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-grow p-2 border rounded"
              disabled={isLoading}
            />
            <button type="submit" className="bg-green-500 text-white p-2 rounded" disabled={isLoading}>
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}