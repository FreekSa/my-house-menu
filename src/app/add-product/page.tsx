"use client";

import ProductSearch from "@/components/product-search";
import { useState } from "react";

export default function AddProductPage() {
  const [myProducts, setMyProducts] = useState<any[]>([]);

  const handleAdd = (product: any) => {
    setMyProducts((prev) => [...prev, product]);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search & Add Products</h1>
      <ProductSearch onSelect={handleAdd} />

      <hr className="my-6" />

      <h2 className="text-xl font-semibold mb-2">My List</h2>
      <ul className="list-disc pl-4">
        {myProducts.map((prod, i) => (
          <li key={i}>{prod.product_name || "Unnamed product"}</li>
        ))}
      </ul>
    </main>
  );
}
