import { notFound } from "next/navigation";
import { SiteHeader } from "@/app/components/site-header";
import { allProducts, getProductBySlug } from "@/lib/products";
import { ProductDetailClient } from "./product-detail-client";

export function generateStaticParams() {
  return allProducts.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <ProductDetailClient product={product} />
    </div>
  );
}
