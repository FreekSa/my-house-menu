"use client";

import { useState } from "react";

import { searchProducts } from "@/lib/open-food-facts/products";
import { Product } from "@/lib/open-food-facts/types";

import ProductCard from "./product-card";

export default function ProductSearch({
  onSelect,
}: {
  onSelect: (product: Product) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          className="border px-2 py-1 w-full"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a product..."
        />
        <button
          className="bg-blue-500 text-white px-3 py-1"
          onClick={async () => {
            setLoading(true);
            const products = await searchProducts(query);
            setResults(products);
            setLoading(false);
          }}
        >
          Search
        </button>
      </div>

      {loading && <p>Searching...</p>}

      <div className="flex flex-wrap gap-4">
        {results.map((product) => (
          <div
            key={product.code}
            className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.5rem)] lg:w-[calc(25%-0.5rem)]"
          >
            <ProductCard product={product} onClick={() => onSelect(product)} />
          </div>
        ))}
      </div>
    </div>
  );
}
