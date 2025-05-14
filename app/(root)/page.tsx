// app/page.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaLeaf,
  FaUsers,
  FaHandshake,
  FaArrowRight,
  FaQuoteLeft,
  FaShoppingBasket,
  FaSeedling,
  FaMapMarkerAlt,
  FaThumbsUp,
} from "react-icons/fa";
import {
  MdOutlineNature,
  MdShoppingCart,
  MdArrowForward,
  MdPerson,
} from "react-icons/md";

import hero from "@/public/assets/login-bg.webp";
import who from "@/public/assets/foto-quienessomos.jpg";

export const dynamic = "force-static";
export default function HomePage() {
  return (
    <main className="space-y-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-white opacity-10 transform -skew-y-3"></div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-2">
                <FaSeedling className="text-yellow-300 mr-2" />
                <span className="text-sm font-medium">
                  Del campo a tu hogar
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Bienvenido a <span className="text-yellow-300">ECOMERCADO</span>
              </h1>
              <p className="text-xl opacity-90 max-w-lg">
                Vuelve a lo natural, vuelve a ti. Conecta directamente con
                campesinos y disfruta de productos frescos y orgánicos.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/productos"
                  className="group bg-white text-teal-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
                >
                  Ver Productos
                  <MdShoppingCart
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </Link>
                <Link
                  href="/nosotros"
                  className="group bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition flex items-center"
                >
                  Conocer Más
                  <MdArrowForward
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={18}
                  />
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-yellow-300 rounded-full opacity-50"></div>
              <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl transform rotate-3 border-4 border-white">
                <Image
                  src={hero.src}
                  alt="Productos orgánicos"
                  width={600}
                  height={400}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            className="fill-white"
          >
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                value: "500+",
                label: "Productores",
                icon: (
                  <FaUsers className="mx-auto mb-4 text-teal-600" size={32} />
                ),
              },
              {
                value: "5000+",
                label: "Clientes",
                icon: (
                  <MdPerson className="mx-auto mb-4 text-teal-600" size={32} />
                ),
              },
              {
                value: "20+",
                label: "Regiones",
                icon: (
                  <FaMapMarkerAlt
                    className="mx-auto mb-4 text-teal-600"
                    size={32}
                  />
                ),
              },
              {
                value: "95%",
                label: "Satisfacción",
                icon: (
                  <FaThumbsUp
                    className="mx-auto mb-4 text-teal-600"
                    size={32}
                  />
                ),
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition"
              >
                {stat.icon}
                <p className="text-4xl font-bold text-teal-600 mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre Nosotros */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -left-4 -bottom-4 w-full h-full border-2 border-teal-500 rounded-lg"></div>
              <Image
                src={who.src}
                alt="Sobre nosotros"
                width={600}
                height={400}
                className="w-full rounded-lg shadow-lg relative z-10"
              />
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center bg-teal-100 text-teal-700 rounded-full px-4 py-1.5 text-sm font-semibold">
                <FaLeaf className="mr-2" />
                Nuestra Misión
              </div>
              <h2 className="text-4xl font-bold mb-4 text-gray-800">
                ¿Quiénes somos?
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                En ECOMERCADO, creemos en el poder de la tierra y en el valor de
                quienes la trabajan. Somos una plataforma que conecta
                directamente a campesinos y pequeños productores con compradores
                conscientes de la ciudad, creando un puente de confianza,
                sostenibilidad y comercio justo.
              </p>
              <Link
                href="/nosotros"
                className="inline-flex items-center text-teal-600 font-semibold hover:text-teal-700 group"
              >
                Leer más sobre nosotros
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-teal-100 text-teal-700 rounded-full px-4 py-1.5 text-sm font-semibold">
              <MdOutlineNature className="mr-2" size={18} />
              Nuestros Servicios
            </div>
            <h2 className="text-4xl font-bold mt-4 text-gray-800">
              Lo que ofrecemos
            </h2>
            <div className="w-24 h-1 bg-teal-500 mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Productos orgánicos",
                desc: "Frescos, locales y cultivados con respeto por la tierra y las personas.",
                icon: <FaLeaf className="text-teal-500 mb-4" size={36} />,
              },
              {
                title: "Impacto social",
                desc: "Apoyamos la economía rural y fomentamos un consumo consciente y justo.",
                icon: <FaUsers className="text-teal-500 mb-4" size={36} />,
              },
              {
                title: "Conexión directa",
                desc: "Acercamos a los campesinos con los compradores de la ciudad, sin intermediarios.",
                icon: <FaHandshake className="text-teal-500 mb-4" size={36} />,
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="p-8 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition bg-white text-center group hover:-translate-y-1 duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-50 mb-4 group-hover:bg-teal-100 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-teal-100 text-teal-700 rounded-full px-4 py-1.5 text-sm font-semibold">
              <FaShoppingBasket className="mr-2" />
              Catálogo
            </div>
            <h2 className="text-4xl font-bold mt-4 text-gray-800">
              Productos Destacados
            </h2>
            <div className="w-24 h-1 bg-teal-500 mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Frutas Orgánicas",
                price: "4.500",
                image:
                  "https://ik.imagekit.io/pih2kf580/assets/pexels-suzyhazelwood-1120581.jpg?updatedAt=1747257862590?tr=w-400,h-300,f-webp",
              },
              {
                name: "Verduras Frescas",
                price: "3.800",
                image:
                  "https://ik.imagekit.io/pih2kf580/assets/istockphoto-488758565-612x612.jpg?updatedAt=1747257680423?tr=w-400,h-300,f-webp",
              },
              {
                name: "Miel Pura",
                price: "12.000",
                image:
                  "https://ik.imagekit.io/pih2kf580/assets/pexels-pixabay-302163.jpg?updatedAt=1747257681225?tr=w-400,h-300,f-webp",
              },
            ].map((product, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md overflow-hidden group"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute top-4 right-4 z-10 bg-teal-500 text-white rounded-full px-3 py-1 text-sm font-medium">
                    Destacado
                  </div>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-teal-600 font-bold text-lg mb-4">
                    ${product.price}
                  </p>
                  <button className="w-full bg-teal-600 text-white font-semibold py-2 px-4 rounded hover:bg-teal-700 transition flex items-center justify-center gap-2">
                    <MdShoppingCart size={20} />
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/productos"
              className="inline-flex items-center bg-white border-2 border-teal-600 text-teal-600 font-semibold px-8 py-3 rounded-lg hover:bg-teal-50 transition group"
            >
              Ver todos los productos
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-teal-100 text-teal-700 rounded-full px-4 py-1.5 text-sm font-semibold">
              <FaQuoteLeft className="mr-2" />
              Testimonios
            </div>
            <h2 className="text-4xl font-bold mt-4 text-gray-800">
              Lo que dicen nuestros clientes
            </h2>
            <div className="w-24 h-1 bg-teal-500 mx-auto mt-4"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Los productos son realmente frescos y de excelente calidad. Además, me encanta saber que estoy apoyando directamente a los campesinos.",
                author: "Carlos Mendoza",
                role: "Cliente frecuente",
                image:
                  "https://ik.imagekit.io/pih2kf580/people/pexels-italo-melo-881954-2379004.jpg?updatedAt=1747257434204?tr=w-64,h-64,f-webp",
              },
              {
                quote:
                  "ECOMERCADO ha transformado la manera en que mi familia se alimenta. Ahora consumimos productos más saludables y con mejor sabor.",
                author: "Laura Gómez",
                role: "Cliente desde 2022",
                image:
                  "https://ik.imagekit.io/pih2kf580/people/michael-dam-mEZ3PoFGs_k-unsplash.jpg?updatedAt=1747257434812?tr=w-64,h-64,f-webp",
              },
              {
                quote:
                  "Como productor, esta plataforma me ha permitido llegar a más personas y recibir un precio justo por mi trabajo. Muy recomendado.",
                author: "Pedro Ramírez",
                role: "Productor asociado",
                image:
                  "https://ik.imagekit.io/pih2kf580/people/pexels-chloekalaartist-1043474.jpg?updatedAt=1747257434415?tr=w-64,h-64,f-webp",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-xl shadow relative hover:shadow-lg transition-shadow"
              >
                <FaQuoteLeft className="h-8 w-8 text-teal-500 mb-4 opacity-30" />
                <p className="italic mb-6 text-gray-600">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200 border-2 border-teal-100">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-teal-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/4 top-1/4 w-32 h-32 rounded-full bg-yellow-300 opacity-50"></div>
          <div className="absolute right-1/4 bottom-1/4 w-48 h-48 rounded-full bg-yellow-300 opacity-30"></div>
          <div className="absolute right-1/3 top-1/3 w-24 h-24 rounded-full bg-white opacity-20"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">¿Listo para comenzar?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Únete a nuestra comunidad y comienza a disfrutar de productos
            frescos directamente de los productores locales.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="group bg-white text-teal-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition shadow-lg flex items-center"
            >
              Crear una cuenta
              <MdArrowForward
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </Link>
            <Link
              href="/contacto"
              className="group bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition flex items-center"
            >
              Contáctanos
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
