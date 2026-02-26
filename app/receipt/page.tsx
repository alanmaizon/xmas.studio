"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { SiteHeader } from "@/app/components/site-header";

type OrderSummary = {
  name: string;
  email: string;
  address: string;
  shipping: string;
  total: number;
  deliveryDate: string;
};

export default function ReceiptPage() {
  const router = useRouter();

  const approved =
    typeof window !== "undefined" &&
    window.localStorage.getItem("xmas-studio-order-approved") === "1";

  const summary = useMemo(() => {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem("xmas-studio-order-summary");
    return raw ? (JSON.parse(raw) as OrderSummary) : null;
  }, []);

  useEffect(() => {
    if (!approved) {
      router.replace("/checkout");
    }
  }, [approved, router]);

  if (!approved || !summary) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <main className="mx-auto max-w-3xl px-4 py-8">Loading receipt…</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="relative overflow-hidden rounded-xl border border-red-100 bg-white p-6">
          <div className="pointer-events-none absolute inset-0 grid place-content-center text-6xl font-black text-red-100">
            DEMO ONLY
          </div>
          <h1 className="relative text-2xl font-semibold">Receipt</h1>
          <dl className="relative mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt>Name</dt>
              <dd>{summary.name}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Email</dt>
              <dd>{summary.email}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Address</dt>
              <dd>{summary.address}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt>Shipping</dt>
              <dd>{summary.shipping}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t pt-2 font-semibold">
              <dt>Total</dt>
              <dd>€{summary.total.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between gap-4 text-green-700">
              <dt>Delivery date</dt>
              <dd>{summary.deliveryDate}</dd>
            </div>
          </dl>
        </div>
      </main>
    </div>
  );
}
