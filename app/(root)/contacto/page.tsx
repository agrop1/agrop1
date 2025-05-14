import React from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import ContactForm from "@/app/components/ContactForm";

export const dynamic = "force-static";
export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-teal-700 mb-2 text-center">
          Contáctanos
        </h1>
        <p className="text-gray-600 text-center mb-8">
          ¿Tienes preguntas, sugerencias o quieres trabajar con nosotros?
          ¡Escríbenos!
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Formulario */}
          <div>
            <ContactForm />
          </div>
          {/* Información de contacto */}
          <div className="flex flex-col gap-6 justify-center">
            <div className="flex items-center gap-3 text-gray-700">
              <FaEnvelope className="text-teal-600 text-xl" />
              <span>contacto@ecomercado.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FaPhone className="text-teal-600 text-xl" />
              <span>+57 300 123 4567</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FaWhatsapp className="text-teal-600 text-xl" />
              <span>+57 300 987 6543</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FaMapMarkerAlt className="text-teal-600 text-xl" />
              <span>Medellín, Colombia</span>
            </div>
            <div className="mt-4 text-gray-500 text-sm">
              Te responderemos lo antes posible. ¡Gracias por confiar en
              Ecomercado!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
