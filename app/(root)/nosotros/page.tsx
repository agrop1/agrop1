import { FaLeaf, FaHandshake, FaUsers, FaSeedling } from "react-icons/fa";

export const dynamic = "force-static";
export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-teal-700 mb-2 text-center">
          Sobre Nosotros
        </h1>
        <p className="text-gray-600 text-center mb-8">
          En <span className="font-semibold text-teal-600">Ecomercado</span>{" "}
          creemos en el poder de la agricultura local, el comercio justo y la
          sostenibilidad. Nuestra misión es conectar productores y consumidores
          para crear una comunidad más saludable y consciente.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="flex flex-col gap-4 justify-center">
            <div className="flex items-center gap-3 text-gray-700">
              <FaLeaf className="text-teal-600 text-2xl" />
              <span className="font-semibold">Misión:</span>
            </div>
            <p className="text-gray-600 ml-9">
              Fomentar el consumo responsable y apoyar a los pequeños
              productores, ofreciendo productos frescos, orgánicos y de calidad.
            </p>
            <div className="flex items-center gap-3 text-gray-700 mt-4">
              <FaSeedling className="text-teal-600 text-2xl" />
              <span className="font-semibold">Visión:</span>
            </div>
            <p className="text-gray-600 ml-9">
              Ser la plataforma líder en comercio local sostenible, generando
              impacto positivo en la sociedad y el medio ambiente.
            </p>
          </div>
          <div className="flex flex-col gap-6 justify-center">
            <div className="flex items-center gap-3 text-gray-700">
              <FaHandshake className="text-teal-600 text-2xl" />
              <span>Comercio Justo</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FaUsers className="text-teal-600 text-2xl" />
              <span>Comunidad y Confianza</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <FaLeaf className="text-teal-600 text-2xl" />
              <span>Sostenibilidad</span>
            </div>
          </div>
        </div>
        <div className="bg-teal-50 rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold text-teal-700 mb-2">
            Nuestro Compromiso
          </h2>
          <p className="text-gray-700">
            Trabajamos cada día para acercar productos frescos y saludables a tu
            mesa, apoyando a quienes cultivan con pasión y responsabilidad.
            ¡Gracias por ser parte de Ecomercado!
          </p>
        </div>
      </div>
    </div>
  );
}
