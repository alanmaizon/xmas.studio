import Link from "next/link";
import { SiteHeader } from "@/app/components/site-header";

const categories = ["Apparel", "Home", "Toys", "Decor", "Crafts", "Food"];

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12">
        <section className="rounded-2xl bg-gradient-to-r from-red-700 to-green-700 p-8 text-white shadow-lg">
          <p className="text-sm uppercase tracking-wide">Holiday Demo Store</p>
          <h1 className="mt-2 text-4xl font-bold">Welcome to xmas.studio gift shop</h1>
          <p className="mt-3 max-w-2xl text-red-50">
            A deterministic, demo-safe ecommerce flow with local data and no real
            payment processing.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              href="/shop"
              className="rounded-full bg-white px-5 py-2 font-semibold text-red-700"
            >
              Start shopping
            </Link>
            <Link href="/cart" className="rounded-full border border-white px-5 py-2">
              Go to cart
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">Browse categories</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/shop?category=${encodeURIComponent(category)}`}
                className="rounded-xl border border-red-100 bg-white p-4 shadow-sm transition hover:shadow"
              >
                <p className="font-medium">{category}</p>
                <p className="text-sm text-zinc-600">See gifts in {category.toLowerCase()}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
