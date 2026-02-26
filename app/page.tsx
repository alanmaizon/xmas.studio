import Link from "next/link";
import { SiteHeader } from "@/app/components/site-header";

const BACKGROUND_POSTER_URL =
  "https://images.unsplash.com/photo-1510279931157-553518c9429c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3";
const BACKGROUND_VIDEO_URL =
  "https://cdn.pixabay.com/video/2023/12/09/192649-892970391_large.mp4";
const SUPPORT_PAYMENT_URL =
  process.env.NEXT_PUBLIC_SUPPORT_PAYMENT_URL ??
  "https://buy.stripe.com/9B6dR3e7X25G5YJ8174wM00";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        poster={BACKGROUND_POSTER_URL}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={BACKGROUND_VIDEO_URL} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 min-h-screen">
        <SiteHeader />
        <main className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 text-center">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-6xl font-black tracking-tighter text-white md:text-8xl">
              XMAS STUDIO
            </h1>
            <p className="max-w-2xl text-base text-white/90 md:text-lg">
              Welcome to our creative workshop. We bring the magic of Christmas to life
              through stunning carols and captivating stories.
            </p>
            <Link
              href={SUPPORT_PAYMENT_URL}
              className="rounded-lg bg-red-900 px-8 py-3 text-base font-bold text-white shadow-lg transition-colors hover:bg-red-800"
            >
              Support Our Creations
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
