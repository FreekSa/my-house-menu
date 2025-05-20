import * as v from "valibot";

export const Product = v.looseObject({
  product_name: v.string(),
  code: v.string(),
  image_url: v.pipe(v.string(), v.url()),
  categories_tags: v.array(v.string()),
  brands: v.string(),
});

export type Product = v.InferOutput<typeof Product>;
