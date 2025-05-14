import { connectDB } from "@/app/utils/connectdb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ _id: string }> },
) {
  try {
    const db = await connectDB();
    const collection = db.collection("productos");

    const { _id } = await params;

    // Validar que el ID sea válido
    if (!ObjectId.isValid(_id)) {
      return NextResponse.json(
        { error: "ID de producto inválido" },
        { status: 400 },
      );
    }

    const producto = await collection.findOne({
      _id: new ObjectId(_id),
    });

    if (!producto) {
      return NextResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 },
      );
    }

    // Transformar el documento para asegurar que _id sea un string
    const productoTransformado = {
      ...producto,
      _id: producto._id.toString(),
    };

    return NextResponse.json(productoTransformado, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Error al obtener el producto" },
      { status: 500 },
    );
  }
}
