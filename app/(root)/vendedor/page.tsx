import React from "react";
import ProductForm from "@/app/components/ProductForm";

export const dynamic = "force-static";
const VendedorPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <ProductForm />
      </div>
    </div>
  );
};

export default VendedorPage;
