// app/page.tsx

import React from "react";

export default function HomePage() {
  return (
    <main className="space-y-24">
      {/* Hero Section */}
      <section className="text-center py-20 bg-success from-blue-500 to-indigo-600 text-white rounded-lg shadow-md">
        <h1 className="text-5xl font-bold mb-4">Bienvenido a ECOMERCADO</h1>
        <p className="text-lg mb-6">Vuelve a lo natural, vuelve a ti, compra y conecta con campesinos.</p>
        <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">
          Empieza Ahora
        </button>
      </section>

      {/* Sobre Nosotros */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">¿Quiénes somos?</h2>
          <p className="text-gray-600 text-lg">
          En ECOMERCADO, creemos en el poder de la tierra y en el valor de quienes la trabajan. Somos una plataforma que conecta directamente a campesinos y pequeños productores con compradores conscientes de la ciudad, creando un puente de confianza, sostenibilidad y comercio justo.
          </p>
        </div>
        <img
          src="../../capturas/foto-quienessomos.jpg"
          alt="Sobre nosotros"
          className="w-full rounded-lg shadow-lg"
        />
      </section>

      {/* Servicios */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">Lo que ofrecemos</h2>
        <div className="grid md:grid-cols-3 gap-8 ">
          {[
            { title: "Productos orgánicos", desc: "Frescos, locales y cultivados con respeto por la tierra y las personas." },
            { title: "Impacto social", desc: "Apoyamos la economía rural y fomentamos un consumo consciente y justo." },
            { title: "Conexión directa", desc: "Acercamos a los campesinos con los compradores de la ciudad, sin intermediarios." },
          ].map((service, idx) => (
            <div key={idx} className="p-6 border rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonios */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros clientes</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              quote: "Increíble trabajo, el equipo superó nuestras expectativas.",
              author: "Carlos M.",
            },
            {
              quote: "Muy profesionales y atentos a cada detalle.",
              author: "Laura G.",
            },
          ].map((testimonial, idx) => (
            <div key={idx} className="bg-gray-100 p-6 rounded-lg shadow">
              <p className="italic mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold text-right">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-16 bg-indigo-600 text-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
        <p className="mb-6">Ponte en contacto con nosotros y transforma tu presencia digital.</p>
        <button className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition">
          Contáctanos
        </button>
      </section>
    </main>
  );
}
