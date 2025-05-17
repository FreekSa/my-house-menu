"use client";

import { useState } from "react";

type Product = {
  id: string;
  product_name: string;
  image_url: string;
  brands: string;
  categories: string;
};

export default function ProductSearch({ onSelect }: { onSelect: (product: Product) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const searchProducts = async () => {
    setLoading(true);

    const url = `https://world.openfoodfacts.net/api/v2/search?fields=product_name,code,image_url,categories_tags,brands&categories_tags=${query}&page_size=100`;

    const res = await fetch(url);
    const data = await res.json();
    setResults(data.products);

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
        <button className="bg-blue-500 text-white px-3 py-1" onClick={searchProducts}>
          Search
        </button>
      </div>

      {loading && <p>Searching...</p>}

      <div className="grid gap-4">
        {results.slice(0, 10).map((product) => (
          <div
            key={product.id}
            className="border p-2 rounded cursor-pointer hover:bg-gray-100"
            onClick={() => onSelect(product)}
          >
            <h2 className="font-semibold">{product.product_name || "No name"}</h2>
            <p className="text-sm text-gray-500">{product.brands}</p>
            {product.image_url && (
              <img src={product.image_url} alt={product.product_name} className="h-20 object-contain mt-2" />
            )}
            <p className="text-sm mt-1">{product.categories}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
