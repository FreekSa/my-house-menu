type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-sm text-gray-500">{product.category}</p>
      <p>{product.description}</p>
    </div>
  );
}
