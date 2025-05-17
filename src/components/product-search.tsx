"use client";

import { useState } from "react";
import ProductCard from "./product-card";

type Product = {
  code: string;
  product_name: string;
  image_url?: string;
  brands?: string;
  categories_tags?: string[];
};

export default function ProductSearch({
  onSelect,
}: {
  onSelect: (product: Product) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const searchProducts = async () => {
    setLoading(true);

    const url = `https://world.openfoodfacts.net/api/v2/search?fields=product_name,code,image_url,categories_tags,brands&categories_tags=${query}&page_size=100`;

    const res = await fetch(url);
    const data = await res.json();
    setResults(data.products || []);

    setLoading(false);
  };

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
          onClick={searchProducts}
        >
          Search
        </button>
      </div>

      {loading && <p>Searching...</p>}

      <div className="flex flex-wrap gap-4">
        {results.map((product) => (
            <div key={product.code} className="w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.5rem)] lg:w-[calc(25%-0.5rem)]">
            <ProductCard
                product={product}
                onClick={() => onSelect(product)}
            />
            </div>
        ))}
        </div>
    </div>
  );
}
