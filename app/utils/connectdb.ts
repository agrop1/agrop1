import mongoose, { Connection } from 'mongoose';
import { ENV } from './env';


// Inicializa la propiedad si no existe
const connections = {} as Record<string, Connection>;

export async function connectDB(
  dbName: string = ENV.DB_NAME
): Promise<Connection> {
  if (connections[dbName]) {
    console.log(`🔄 Reutilizando conexión a la base de datos: ${dbName}`);
    return connections[dbName];
  }

  console.log(`📡 Conectando a la base de datos: ${dbName}`);

  try {
    const connection = mongoose.createConnection(ENV.MONGO_URI, { dbName });

    await connection.asPromise();

    console.log(`✅ Conectado a la base de datos: ${dbName}`);

    const db = connection.useDb(dbName);

    connections[dbName] = db;

    console.log('🔗 Conexiones almacenadas:', Object.keys(connections));

    return db;
  } catch (error) {
    console.error(`❌ Error al conectar a la base de datos ${dbName}:`, error);
    throw error;
  }
}