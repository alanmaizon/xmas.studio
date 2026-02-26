import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-red-100 bg-white/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-lg font-bold text-red-700">
          xmas.studio
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-zinc-700">
          <Link href="/shop">Shop</Link>
          <Link href="/cart">Go to cart</Link>
          <Link href="/checkout">Checkout</Link>
        </nav>
      </div>
    </header>
  );
}
