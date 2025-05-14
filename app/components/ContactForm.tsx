"use client";

import React, { useState } from "react";
import {
  FaEnvelope,
  FaUser,
  FaPhone,
  FaPaperPlane,
  FaSpinner,
} from "react-icons/fa";

type FormData = {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
};

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      // Simulando envío de formulario
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitStatus({
        type: "success",
        message:
          "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.",
      });
      setFormData({ nombre: "", email: "", telefono: "", mensaje: "" });
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setSubmitStatus({
        type: "error",
        message:
          "Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center bg-teal-100 text-teal-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-2">
          <FaEnvelope className="mr-2" />
          Contáctanos
        </div>
        <h2 className="text-3xl font-bold text-gray-800">
          ¿Tienes alguna pregunta?
        </h2>
        <p className="text-gray-600 mt-2">
          Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo
          antes posible.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-teal-500" />
            </div>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-teal-500" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Tu correo electrónico"
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
            />
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaPhone className="text-teal-500" />
          </div>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Tu número de teléfono"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
          />
        </div>

        <div>
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            placeholder="Tu mensaje"
            required
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              <FaPaperPlane />
              Enviar mensaje
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

export default ContactForm;
