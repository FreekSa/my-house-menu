import { Database } from "@/utils/supabase/database-types";
import { Product } from "@/lib/supabase/types";
import { SupabaseClient } from "@supabase/supabase-js";

export async function addProducts(
  supabase: SupabaseClient<Database>,
  products: Product[]
) {
  const { error } = await supabase.from("Product").insert(products);
  if (error) {
    throw error;
  }
}
