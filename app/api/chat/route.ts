// /app/api/chat/route.ts
import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

// Inicializar el cliente de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { messages, products } = await request.json();

    // Crear contexto con la información de los productos
    const productContext = products.length > 0 
      ? `Información sobre nuestros productos: ${products.map(
          (p: any) => `ID: ${p.id}, Nombre: ${p.name}, Precio: $${p.price}, Peso: ${p.weight}kg`
        ).join('. ')}.` 
      : "Actualmente no hay productos disponibles.";

    // Preparar mensajes para la API de OpenAI
    const systemMessage = {
      role: "system",
      content: `Eres un asistente para una tienda en línea llamada ECOMERCADO. Respondes preguntas sobre productos, 
      precios, disponibilidad y brindas recomendaciones basadas en las necesidades del cliente. 
      ${productContext}
      Si el usuario pregunta por un producto que no está en la lista, indícale amablemente que no está disponible.
      Mantén tus respuestas breves y útiles.`
    };

    const apiMessages = [
      systemMessage,
      ...messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    // Llamar a la API de OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Puedes usar 'gpt-4' para respuestas de mayor calidad
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 500
    });

    // Retornar la respuesta
    return NextResponse.json({
      content: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('Error en la API de chat:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud de chat' },
      { status: 500 }
    );
  }
}