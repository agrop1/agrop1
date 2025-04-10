import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "1234",
  port: 5433, 
});

// Cerrar la conexión cuando el proceso se detiene
process.on("exit", () => {
  pool.end();
  console.log("Conexión con PostgreSQL cerrada.");
});

// GET: Obtener todos los productos
export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM productos");
    client.release();
    return NextResponse.json(result.rows);
  } catch (error: unknown) {
    console.error("Error al obtener productos:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// POST: Crear un nuevo producto
export async function POST(req: Request) {
  try {
    const { name, price, weight } = await req.json();

    if (!name || isNaN(price) || isNaN(weight)) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO productos (name, price, weight) VALUES ($1, $2, $3) RETURNING *",
      [name, parseFloat(price), parseFloat(weight)]
    );
    client.release();

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: unknown) {
    console.error("Error al insertar producto:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// PUT: Actualizar un producto existente
export async function PUT(req: Request) {
  try {
    const { id, name, price, weight } = await req.json();

    if (!id || !name || isNaN(price) || isNaN(weight)) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const client = await pool.connect();
    const result = await client.query(
      "UPDATE productos SET name=$1, price=$2, weight=$3 WHERE id=$4 RETURNING *",
      [name, parseFloat(price), parseFloat(weight), id]
    );
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error: unknown) {
    console.error("Error al actualizar producto:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// DELETE: Eliminar un producto
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID es requerido" }, { status: 400 });
    }

    const client = await pool.connect();
    const result = await client.query("DELETE FROM productos WHERE id=$1 RETURNING *", [id]);
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }

    return NextResponse.json({ message: "Producto eliminado correctamente" });
  } catch (error: unknown) {
    console.error("Error al eliminar producto:", error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}