"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/app/components/site-header";
import { cartSubtotal, readCart } from "@/lib/cart";

const SHIPPING_OPTIONS = {
  standard: { label: "Standard", price: 0, days: 5 },
  express: { label: "Express", price: 4.99, days: 2 },
} as const;

const GIFT_WRAP_PRICE = 2.49;

export default function CheckoutPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [shipping, setShipping] = useState<keyof typeof SHIPPING_OPTIONS>("standard");
  const [phrase, setPhrase] = useState("");
  const [demoStop, setDemoStop] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  const totals = useMemo(() => {
    const items = readCart();
    const subtotal = cartSubtotal(items);
    const giftWrap =
      typeof window !== "undefined" && window.localStorage.getItem("xmas-studio-gift-wrap") !== "0"
        ? GIFT_WRAP_PRICE
        : 0;
    const shippingCost = SHIPPING_OPTIONS[shipping].price;
    return {
      subtotal,
      giftWrap,
      shippingCost,
      total: subtotal + giftWrap + shippingCost,
      itemCount: items.length,
    };
  }, [shipping]);

  const deliveryDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + SHIPPING_OPTIONS[shipping].days);
    return date.toLocaleDateString();
  }, [shipping]);

  const canPlace =
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    address.trim().length > 0 &&
    phrase === "CONFIRM PLACE ORDER";

  const onPlaceOrder = () => {
    if (!canPlace) {
      setStatusMessage('Type "CONFIRM PLACE ORDER" and complete the form to continue.');
      return;
    }

    window.localStorage.setItem("xmas-studio-order-approved", "1");
    window.localStorage.setItem(
      "xmas-studio-order-summary",
      JSON.stringify({
        name,
        email,
        address,
        shipping: SHIPPING_OPTIONS[shipping].label,
        total: totals.total,
        deliveryDate,
      }),
    );

    if (demoStop) {
      setStatusMessage("Ready to place order (demo mode stopped before completion).");
      return;
    }

    router.push("/receipt");
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[1fr_320px]">
        <section className="space-y-4 rounded-xl border border-red-100 bg-white p-6">
          <h1 className="text-2xl font-semibold">Checkout</h1>

          <div className="grid gap-3">
            <label className="text-sm font-medium">
              Name
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-1 w-full rounded border border-zinc-300 px-2 py-2"
              />
            </label>
            <label className="text-sm font-medium">
              Email
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 w-full rounded border border-zinc-300 px-2 py-2"
              />
            </label>
            <label className="text-sm font-medium">
              Address
              <textarea
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                className="mt-1 w-full rounded border border-zinc-300 px-2 py-2"
              />
            </label>
          </div>

          <fieldset>
            <legend className="text-sm font-medium">Shipping options</legend>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {(Object.keys(SHIPPING_OPTIONS) as Array<keyof typeof SHIPPING_OPTIONS>).map((key) => (
                <label key={key} className="flex cursor-pointer items-center gap-2 rounded border p-3">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shipping === key}
                    onChange={() => setShipping(key)}
                  />
                  <span>
                    {SHIPPING_OPTIONS[key].label}
                    {SHIPPING_OPTIONS[key].price > 0
                      ? ` (+€${SHIPPING_OPTIONS[key].price.toFixed(2)})`
                      : " (free)"}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block text-sm font-medium">
            Confirmation phrase (approval gate)
            <input
              value={phrase}
              onChange={(event) => setPhrase(event.target.value)}
              placeholder="CONFIRM PLACE ORDER"
              className="mt-1 w-full rounded border border-zinc-300 px-2 py-2"
            />
          </label>

          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <input type="checkbox" checked={demoStop} onChange={(event) => setDemoStop(event.target.checked)} />
            Demo mode stop before completion (show &quot;Ready to place order&quot;)
          </label>

          <button
            type="button"
            onClick={onPlaceOrder}
            className="rounded-md bg-green-700 px-4 py-2 font-semibold text-white"
          >
            Place order
          </button>
          {statusMessage ? <p className="text-sm text-zinc-700">{statusMessage}</p> : null}
        </section>

        <aside className="h-fit rounded-xl border border-red-100 bg-white p-4 text-sm">
          <h2 className="font-semibold">Summary</h2>
          <p className="mt-1 text-zinc-600">{totals.itemCount} line item(s)</p>
          <dl className="mt-3 space-y-2">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>€{totals.subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Gift wrap</dt>
              <dd>€{totals.giftWrap.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd>€{totals.shippingCost.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between border-t pt-2 text-base font-semibold">
              <dt>Total</dt>
              <dd>€{totals.total.toFixed(2)}</dd>
            </div>
          </dl>
          <p className="mt-3 rounded bg-green-50 p-2 text-green-800">
            Estimated delivery date: {deliveryDate}
          </p>
        </aside>
      </main>
    </div>
  );
}
