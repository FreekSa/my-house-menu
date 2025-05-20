import { createClient } from "@/utils/supabase/server";

export default async function Page() {
  const supabase = await createClient();

  const { data: products } = await supabase.from("Product").select("*");
  console.log("products:", products);

  return (
    <div>
      <ul>
        {products?.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
      <button
        onClick={() => {
          //addProducts(supabase, [{ name: "Coca-Cola" }]);
          return;
        }}
      >
        Add
      </button>
    </div>
  );
}
