"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/app/components/site-header";
import { addToCart, cartSubtotal, readCart } from "@/lib/cart";
import { allProducts } from "@/lib/products";

type SortValue = "price-asc" | "price-desc" | "rating";

const categories = Array.from(new Set(allProducts.map((product) => product.category)));
const colors = Array.from(new Set(allProducts.flatMap((product) => product.colors)));

const getInitialParam = (key: string) => {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(key);
};

export default function ShopPage() {
  const [maxPrice, setMaxPrice] = useState(30);
  const [color, setColor] = useState(() => getInitialParam("color") ?? "all");
  const [category, setCategory] = useState(() => getInitialParam("category") ?? "all");
  const [giftFor, setGiftFor] = useState(() => getInitialParam("giftFor") ?? "all");
  const [deliveryBy, setDeliveryBy] = useState(() => getInitialParam("deliveryBy") ?? "all");
  const [sortBy, setSortBy] = useState<SortValue>("price-asc");
  const [debug] = useState(() => getInitialParam("debug") === "1");

  const filtered = useMemo(() => {
    const sorted = allProducts
      .filter((product) => product.price <= maxPrice)
      .filter((product) => color === "all" || product.colors.includes(color))
      .filter((product) => category === "all" || product.category === category)
      .filter((product) => giftFor === "all" || product.giftFor.includes(giftFor))
      .filter(
        (product) =>
          deliveryBy === "all" || product.deliveryDays <= Number.parseInt(deliveryBy, 10),
      )
      .sort((a, b) => {
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        return a.price - b.price;
      });

    return sorted;
  }, [maxPrice, color, category, giftFor, deliveryBy, sortBy]);

  const debugCartTotal = useMemo(() => cartSubtotal(readCart()), []);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-4 rounded-xl border border-red-100 bg-white p-4">
          <h1 className="text-xl font-semibold">Shop</h1>

          <div>
            <label className="text-sm font-medium">Max price: €{maxPrice.toFixed(2)}</label>
            <input
              type="range"
              min={5}
              max={30}
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              className="mt-2 w-full"
            />
          </div>

          <FilterSelect label="Color" value={color} onChange={setColor} options={colors} />
          <FilterSelect
            label="Category"
            value={category}
            onChange={setCategory}
            options={categories}
          />
          <FilterSelect
            label="Gift for"
            value={giftFor}
            onChange={setGiftFor}
            options={["kids", "partner", "parents"]}
          />
          <FilterSelect
            label="Delivery-by badge"
            value={deliveryBy}
            onChange={setDeliveryBy}
            options={["2", "3", "5"]}
            labels={{ "2": "2-day", "3": "3-day", "5": "5-day" }}
          />

          <div>
            <label className="text-sm font-medium" htmlFor="sortBy">
              Sort
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortValue)}
              className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-2"
            >
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </aside>

        <section>
          <div className="mb-3 text-sm text-zinc-600">{filtered.length} products</div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <article key={product.slug} className="rounded-xl border border-red-100 bg-white p-3">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={360}
                  className="h-44 w-full rounded-lg border border-red-50 object-cover"
                />
                <h2 className="mt-3 font-semibold">{product.name}</h2>
                <p className="text-sm text-zinc-600">€{product.price.toFixed(2)}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  {product.badges.map((badge) => (
                    <span key={badge} className="rounded-full bg-red-100 px-2 py-1 text-red-800">
                      {badge}
                    </span>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/product/${product.slug}`}
                    className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium"
                  >
                    View
                  </Link>
                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        slug: product.slug,
                        name: product.name,
                        image: product.image,
                        color: product.colors[0],
                        size: product.sizes[0],
                        quantity: 1,
                        price: product.price,
                      })
                    }
                    className="rounded-md bg-red-700 px-3 py-2 text-sm font-semibold text-white"
                  >
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      {debug ? (
        <div className="fixed right-3 bottom-3 rounded-md border border-zinc-300 bg-white/95 px-3 py-2 text-xs shadow">
          <div>Debug cart total: €{debugCartTotal.toFixed(2)}</div>
          <div>
            Filters: max €{maxPrice} / {color} / {category} / {giftFor} / by {deliveryBy}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  labels,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  labels?: Record<string, string>;
}) {
  return (
    <div>
      <label className="text-sm font-medium" htmlFor={label}>
        {label}
      </label>
      <select
        id={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-2"
      >
        <option value="all">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {labels?.[option] ?? option}
          </option>
        ))}
      </select>
    </div>
  );
}
