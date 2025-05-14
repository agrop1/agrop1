import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  _id: string;
};

const ProductCard = ({
  nombre,
  descripcion,
  precio,
  imagen,
  _id,
}: ProductCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg w-full">
      {imagen && (
        <div className="relative overflow-hidden w-full h-40 sm:h-64">
          <Link href={`/productos/${_id}`}>
            <Image
              src={`${imagen}?tr=w-600,h-300,f-webp`}
              alt={nombre}
              fill
              className="object-cover w-full h-full transition-transform duration-500 hover:scale-105 aspect-[3/2]"
              sizes="(max-width: 640px) 100vw, 288px"
            />
          </Link>
        </div>
      )}
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-800 line-clamp-1">
          {nombre}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4 flex-grow line-clamp-2">
          {descripcion}
        </p>
        <p className="text-lg sm:text-xl font-bold text-teal-600 mb-2 sm:mb-4">
          ${precio.toLocaleString()}
        </p>
        <button className="bg-teal-600 text-white font-semibold py-2 sm:py-3 px-4 rounded-md transition-colors duration-300 hover:bg-teal-700 text-base sm:text-lg mt-auto">
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
