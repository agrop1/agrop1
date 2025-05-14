"use client";

import React from "react";
import Image from "next/image";
import { FaLeaf, FaShoppingCart, FaUser, FaMapMarkerAlt } from "react-icons/fa";

type ProductDetailProps = {
  product: {
    _id: string;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen: string;
    vendedor?: {
      nombre: string;
      ubicacion?: string;
    };
  };
};

const ProductDetail = ({ product }: ProductDetailProps) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Imagen del Producto */}
            <div className="relative aspect-square rounded-lg overflow-hidden group">
              <Image
                src={product.imagen + "?tr=w-512,h-512,f-webp"}
                alt={product.nombre}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
            </div>

            {/* Información del Producto */}
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center bg-teal-100 text-teal-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-2">
                  <FaLeaf className="mr-2" />
                  Producto Orgánico
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {product.nombre}
                </h1>
                <p className="text-2xl font-bold text-teal-600">
                  ${product.precio.toLocaleString()}
                </p>
              </div>

              <div className="prose prose-teal max-w-none">
                <p className="text-gray-600">{product.descripcion}</p>
              </div>

              {/* Información del Vendedor */}
              {product.vendedor && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-2 text-gray-700">
                    <FaUser className="text-teal-500" />
                    <span className="font-medium">
                      {product.vendedor.nombre}
                    </span>
                  </div>
                  {product.vendedor.ubicacion && (
                    <div className="flex items-center space-x-2 text-gray-600">
                      <FaMapMarkerAlt className="text-teal-500" />
                      <span>{product.vendedor.ubicacion}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Botones de Acción */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="flex-1 bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2">
                  <FaShoppingCart />
                  Agregar al Carrito
                </button>
                <button className="flex-1 bg-white border-2 border-teal-600 text-teal-600 font-semibold py-3 px-6 rounded-lg hover:bg-teal-50 transition-colors flex items-center justify-center gap-2">
                  <FaUser />
                  Contactar Vendedor
                </button>
              </div>
            </div>
          </div>

          {/* Características Adicionales */}
          <div className="bg-gray-50 border-t border-gray-200">
            <div className="max-w-6xl mx-auto px-8 py-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Características del Producto
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Calidad Garantizada",
                    description:
                      "Productos seleccionados y verificados por nuestro equipo.",
                    icon: <FaLeaf className="text-teal-500" size={24} />,
                  },
                  {
                    title: "Envío Seguro",
                    description:
                      "Empaque especial para mantener la frescura de tu producto.",
                    icon: (
                      <FaShoppingCart className="text-teal-500" size={24} />
                    ),
                  },
                  {
                    title: "Soporte 24/7",
                    description:
                      "Estamos aquí para ayudarte con cualquier consulta.",
                    icon: <FaUser className="text-teal-500" size={24} />,
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
