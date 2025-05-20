"use client";

import { useState } from "react";

import { Product } from "@/lib/open-food-facts/types";

import ProductSearch from "@/components/product-search";

export default function AddProductPage() {
  const [myProducts, setMyProducts] = useState<Product[]>([]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search & Add Products</h1>
      <ProductSearch
        onSelect={(product) => {
          setMyProducts((prev) => [...prev, product]);
        }}
      />

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
