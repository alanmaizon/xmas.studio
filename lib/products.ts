import products from "@/data/products.json";
import type { Product } from "@/lib/types";

export const allProducts = products as Product[];

export const getProductBySlug = (slug: string) =>
  allProducts.find((product) => product.slug === slug);
