"use client";

import React, { useState, useRef } from "react";
import {
  FaLeaf,
  FaDollarSign,
  FaSpinner,
  FaPlus,
  FaCloudUploadAlt,
} from "react-icons/fa";

type ProductFormData = {
  nombre: string;
  descripcion: string;
  precio: string;
  imagen: string;
};

const ProductForm = () => {
  const [formData, setFormData] = useState<ProductFormData>({
    nombre: "",
    descripcion: "",
    precio: "",
    imagen: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadImage = async (file: File) => {
    try {
      setUploadProgress(0);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/image/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al subir la imagen");
      }

      const data = await response.json();
      setUploadProgress(100);
      return data.url;
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      throw error;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Mostrar preview inmediatamente
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Subir la imagen
        const imageUrl = await uploadImage(file);
        setFormData((prev) => ({ ...prev, imagen: imageUrl }));
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        setSubmitStatus({
          type: "error",
          message: "Error al subir la imagen. Por favor, intenta de nuevo.",
        });
        setPreviewImage(null);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      try {
        // Mostrar preview inmediatamente
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Subir la imagen
        const imageUrl = await uploadImage(file);
        setFormData((prev) => ({ ...prev, imagen: imageUrl }));
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        setSubmitStatus({
          type: "error",
          message: "Error al subir la imagen. Por favor, intenta de nuevo.",
        });
        setPreviewImage(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const res = await fetch("/api/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          descripcion: formData.descripcion,
          precio: parseFloat(formData.precio),
          imagen: formData.imagen,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error creando producto");
      }

      setSubmitStatus({
        type: "success",
        message: "¡Producto creado exitosamente! 🎉",
      });
      setFormData({ nombre: "", descripcion: "", precio: "", imagen: "" });
      setPreviewImage(null);
    } catch (error) {
      console.error("Error al crear producto:", error);
      setSubmitStatus({
        type: "error",
        message:
          "Hubo un error al crear el producto. Por favor, intenta de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center bg-teal-100 text-teal-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-2">
          <FaLeaf className="mr-2" />
          Nuevo Producto
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Agregar Producto</h2>
        <p className="text-gray-600 mt-2">
          Completa el formulario para agregar un nuevo producto a tu catálogo.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaLeaf className="text-teal-500" />
          </div>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre del producto"
            required
            className="input w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
          />
        </div>

        <div>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción del producto"
            required
            className="input h-36 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none"
          ></textarea>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaDollarSign className="text-teal-500" />
          </div>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            placeholder="Precio"
            required
            min="0"
            step="0.01"
            className="input w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
          />
        </div>

        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragging ? "border-teal-500 bg-teal-50" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {previewImage ? (
            <div className="space-y-4">
              <img
                src={previewImage}
                alt="Preview"
                className="max-h-48 mx-auto rounded-lg"
              />
              {uploadProgress !== null && uploadProgress < 100 && (
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-teal-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
              <button
                type="button"
                onClick={() => {
                  setPreviewImage(null);
                  setFormData((prev) => ({ ...prev, imagen: "" }));
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Eliminar imagen
              </button>
            </div>
          ) : (
            <div
              className="cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <FaCloudUploadAlt className="mx-auto text-4xl text-gray-400 mb-3" />
              <p className="text-gray-600 mb-1">
                Arrastra y suelta una imagen aquí, o{" "}
                <span className="text-teal-600 font-medium">
                  haz clic para seleccionar
                </span>
              </p>
              <p className="text-sm text-gray-500">PNG, JPG o GIF (máx. 5MB)</p>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin" />
              Creando producto...
            </>
          ) : (
            <>
              <FaPlus />
              Crear producto
            </>
          )}
        </button>

        {submitStatus.type && (
          <div
            className={`p-4 rounded-lg ${
              submitStatus.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {submitStatus.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default ProductForm;
