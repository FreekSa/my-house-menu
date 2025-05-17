import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: products } = await supabase.from("Product").select("*");
  console.log("products:", products);

  return (
    <div>
      <ul>
        {products?.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
      <button onClick={() => AddProduct(supabase)}>Add</button>
    </div>
  );
  async function AddProduct(supabase: any) {
    const { data, error } = await supabase
      .from("Product")
      .insert([{ name: "Coca Cola" }]);
  
    if (error) {
      console.error("Error inserting product:", error);
    } else {
      console.log("Inserted product:", data);
    }
    return;
  }
}

