import { notFound } from "next/navigation";
import ProductDetail from "@/app/components/ProductDetail";
import { getProduct } from "@/app/utils/fetch/actions";

export const dynamic = "force-static";
export default async function ProductPage({
  params,
}: {
  params: Promise<{ _id: string }>;
}) {
  const { _id } = await params;
  const product = await getProduct(_id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
