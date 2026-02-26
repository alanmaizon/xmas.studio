import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "xmas.studio Holiday Gift Shop",
  description: "Demo-safe holiday gift shop for hackathon demos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-red-50 text-zinc-900 antialiased">{children}</body>
    </html>
  );
}
