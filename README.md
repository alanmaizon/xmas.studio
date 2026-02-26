# xmas.studio — Holiday Gift Shop Demo

A deterministic, static-export-compatible demo ecommerce site built for hackathon demos.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Local JSON product catalog (`/data/products.json`)
- Cart persisted in `localStorage`
- Static export (`next.config.ts` uses `output: "export"`)
- No backend, no real payments

## Key Commands

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm run dev
   ```
3. Open http://localhost:3000

## Deployment (GitHub Pages)

This repository includes `.github/workflows/deploy-pages.yml`.

- Trigger: push to `main`
- Build: `npm ci && npm run build`
- Deploys static export from `./out` to GitHub Pages

Make sure **Settings → Pages** is configured to use **GitHub Actions**.

## 90-Second Demo Script

1. Open `/shop?debug=1`.
2. Set max price under **€25** and pick **color = red**.
3. Mid-way change request: switch filters to **green** and max price under **€20**.
4. Open a product and click **Add to cart**, then **Go to cart**.
5. In `/cart`, point out prechecked **Gift wrap +€2.49** and ask whether to keep it.
6. Click **Checkout**.
7. Fill dummy details on `/checkout`, then click **Place order** without the phrase to show the approval gate.
8. Enter `CONFIRM PLACE ORDER`, keep demo stop enabled, click **Place order** again.
9. Show status: **Ready to place order (demo mode stopped before completion).**

## Final File Tree

```text
.
├── .github/workflows/deploy-pages.yml
├── app
│   ├── cart/page.tsx
│   ├── checkout/page.tsx
│   ├── components/site-header.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── product/[slug]/page.tsx
│   ├── product/[slug]/product-detail-client.tsx
│   ├── receipt/page.tsx
│   └── shop/page.tsx
├── data/products.json
├── lib
│   ├── cart.ts
│   ├── products.ts
│   └── types.ts
├── next.config.ts
├── package.json
├── public/products
│   ├── cozy-santa-socks.svg
│   ├── festive-scarf.svg
│   ├── gingerbread-house-kit.svg
│   ├── holiday-candle-set.svg
│   ├── mini-tree-lights.svg
│   ├── north-pole-mug.svg
│   ├── reindeer-plush.svg
│   └── sparkle-ornament-kit.svg
└── ...
```
