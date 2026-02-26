"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/app/components/site-header";
import { cartSubtotal, readCart, writeCart } from "@/lib/cart";
import type { CartItem } from "@/lib/types";

const GIFT_WRAP_PRICE = 2.49;

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(() => readCart());
  const [giftWrap, setGiftWrap] = useState(true);

  const subtotal = useMemo(() => cartSubtotal(items), [items]);
  const giftWrapTotal = giftWrap && items.length > 0 ? GIFT_WRAP_PRICE : 0;
  const total = subtotal + giftWrapTotal;

  const updateItems = (nextItems: CartItem[]) => {
    setItems(nextItems);
    writeCart(nextItems);
  };

  const setQuantity = (index: number, quantity: number) => {
    const nextItems = items
      .map((item, itemIndex) =>
        itemIndex === index ? { ...item, quantity: Math.max(0, quantity) } : item,
      )
      .filter((item) => item.quantity > 0);
    updateItems(nextItems);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("xmas-studio-gift-wrap", giftWrap ? "1" : "0");
    }
  }, [giftWrap]);

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[1fr_320px]">
        <section className="space-y-4">
          <h1 className="text-2xl font-semibold">Cart</h1>
          {items.length === 0 ? (
            <div className="rounded-xl border border-red-100 bg-white p-6">
              Your cart is empty. <Link href="/shop" className="underline">Visit shop</Link>.
            </div>
          ) : (
            items.map((item, index) => (
              <article
                key={`${item.slug}-${item.color}-${item.size}`}
                className="grid gap-3 rounded-xl border border-red-100 bg-white p-3 sm:grid-cols-[120px_1fr]"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={240}
                  height={140}
                  className="h-24 w-full rounded-md border border-red-50 object-cover"
                />
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-zinc-600">
                    {item.color} / {item.size} / €{item.price.toFixed(2)}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuantity(index, item.quantity - 1)}
                      className="rounded border px-2 py-1"
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(index, item.quantity + 1)}
                      className="rounded border px-2 py-1"
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </section>

        <aside className="h-fit rounded-xl border border-red-100 bg-white p-4">
          <label className="flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm">
            <input
              type="checkbox"
              checked={giftWrap}
              onChange={(event) => setGiftWrap(event.target.checked)}
              className="mt-1"
            />
            <span>
              <strong>Gift wrap +€2.49</strong> (preselected for the demo dark-pattern defense
              moment).
            </span>
          </label>

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <dt>Items subtotal</dt>
              <dd>€{subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt>Gift wrap impact</dt>
              <dd>{giftWrapTotal > 0 ? `+€${giftWrapTotal.toFixed(2)}` : "€0.00"}</dd>
            </div>
            <div className="flex items-center justify-between border-t pt-2 text-base font-semibold">
              <dt>Total</dt>
              <dd>€{total.toFixed(2)}</dd>
            </div>
          </dl>

          <Link
            href="/checkout"
            className="mt-4 block rounded-md bg-green-700 px-4 py-2 text-center font-semibold text-white"
          >
            Checkout
          </Link>
        </aside>
      </main>
    </div>
  );
}
