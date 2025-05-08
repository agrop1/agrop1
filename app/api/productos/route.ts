import { connectDB } from '@/app/utils/connectdb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const db = await connectDB();
        const collection = db.collection('productos');
        const productos = await collection.find({}).toArray();
        return NextResponse.json(productos, { status: 200 });
    }
    catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}