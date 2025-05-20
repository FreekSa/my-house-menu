import Image from "next/image";

type Product = {
  code: string;
  product_name: string;
  image_url?: string;
  brands?: string;
  categories_tags?: string[];
};

export default function ProductCard({
  product,
  onClick,
}: {
  product: Product;
  onClick?: () => void;
}) {
  return (
    <div
      className="border p-2 rounded cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      <h2 className="font-semibold">{product.product_name || "No name"}</h2>
      <p className="text-sm text-gray-500">{product.brands}</p>
      {product.image_url && (
        <Image
          src={product.image_url}
          alt={product.product_name}
          className="h-20 object-contain mt-2"
        />
      )}
      <p className="text-sm mt-1">
        {product.categories_tags?.join(", ") || "No categories"}
      </p>
    </div>
  );
}
