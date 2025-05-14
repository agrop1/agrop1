import { connectDB } from '@/app/utils/connectdb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const db = await connectDB();
    const collection = db.collection('productos');
    const productos = await collection.find({}).toArray();
    
    // Transformar los documentos para asegurar que _id sea un string
    const productosTransformados = productos.map(producto => ({
      ...producto,
      _id: producto._id.toString() // Convertir ObjectId a string
    }));
    
    return NextResponse.json(productosTransformados, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
export async function POST(req: Request) {
  try {
    const db = await connectDB();
    const collection = db.collection('productos');
    const body = await req.json();

    if (!body.nombre || !body.descripcion || !body.precio || !body.imagen) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
    }

    const nuevoProducto = {
      nombre: body.nombre,
      descripcion: body.descripcion,
      precio: body.precio,
      imagen: body.imagen,
    };

    const result = await collection.insertOne(nuevoProducto);
    return NextResponse.json({ message: 'Producto creado', producto: { ...nuevoProducto, _id: result.insertedId.toString() } }, { status: 201 });
  }
  catch (error) {
    console.error('Error creando producto:', error);
    return NextResponse.json({ error: 'Error creando producto' }, { status: 500 });
  }
}