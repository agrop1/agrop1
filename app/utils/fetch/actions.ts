"use server";

import { auth } from "@clerk/nextjs/server";

export async function getProduct(id: string) {
  const { getToken } = await auth();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/productos/${id}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Producto no encontrado");
  }

  const data = await res.json();

  return data;
}
