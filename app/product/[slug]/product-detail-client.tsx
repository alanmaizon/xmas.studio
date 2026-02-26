"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { addToCart } from "@/lib/cart";
import type { Product } from "@/lib/types";

export function ProductDetailClient({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState(product.sizes[0]);
  const [showCompare, setShowCompare] = useState(false);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="grid gap-6 rounded-xl border border-red-100 bg-white p-6 md:grid-cols-2">
        <Image
          src={product.image}
          alt={product.name}
          width={900}
          height={540}
          className="h-72 w-full rounded-lg border border-red-50 object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="mt-2 text-lg text-red-700">€{product.price.toFixed(2)}</p>
          <p className="mt-1 text-sm text-zinc-600">Rating {product.rating.toFixed(1)} / 5</p>

          <div className="mt-4">
            <label className="text-sm font-medium">Color</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((entry) => (
                <button
                  type="button"
                  key={entry}
                  onClick={() => setColor(entry)}
                  className={`rounded-full border px-3 py-1 text-sm ${
                    color === entry ? "border-red-700 bg-red-700 text-white" : "border-zinc-300"
                  }`}
                >
                  {entry}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium" htmlFor="size">
              Size
            </label>
            <select
              id="size"
              value={size}
              onChange={(event) => setSize(event.target.value)}
              className="mt-1 w-full rounded-md border border-zinc-300 px-2 py-2"
            >
              {product.sizes.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-5 flex gap-2">
            <button
              type="button"
              onClick={() =>
                addToCart({
                  slug: product.slug,
                  name: product.name,
                  image: product.image,
                  color,
                  size,
                  quantity: 1,
                  price: product.price,
                })
              }
              className="rounded-md bg-red-700 px-4 py-2 font-semibold text-white"
            >
              Add to cart
            </button>
            <Link href="/cart" className="rounded-md border border-zinc-300 px-4 py-2 font-medium">
              Go to cart
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setShowCompare((value) => !value)}
            className="mt-4 text-sm font-medium text-zinc-600 underline"
          >
            Compare
          </button>

          {showCompare ? (
            <div className="mt-2 rounded-lg bg-zinc-50 p-3 text-sm text-zinc-700">
              Compare panel: {product.name} vs average holiday gifts in {product.category}
              .
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
