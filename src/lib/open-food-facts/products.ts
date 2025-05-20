import * as v from "valibot";
import { Product } from "./types";

const openFoodFactsBaseUrl = "https://world.openfoodfacts.net/api/v2";

export async function searchProducts(query: string): Promise<Product[]> {
  const params = new URLSearchParams({
    fields: (
      [
        "product_name",
        "code",
        "image_url",
        "categories_tags",
        "brands",
      ] satisfies (keyof typeof Product.entries)[]
    ).join(","),
    categories_tags: query,
    page_size: (100).toString(),
  });
  const searchUrl = new URL(`/search?${params}`, openFoodFactsBaseUrl);

  const response = await fetch(searchUrl);
  const result = v.parse(SearchProductResponse, await response.json());

  return result.products;
}

const SearchProductResponse = v.object({
  count: v.pipe(v.number(), v.integer()),
  page: v.pipe(v.number(), v.integer()),
  page_count: v.pipe(v.number(), v.integer()),
  page_size: v.pipe(v.number(), v.integer()),
  products: v.array(Product),
  skip: v.pipe(v.number(), v.integer()),
});
