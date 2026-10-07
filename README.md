# qorpe.com

The Qorpe company site: one page, static, served as Cloudflare Worker assets like the other
`*.qorpe.com` sites.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → ./out
npm run lint
```

Deploy: Cloudflare → Workers & Pages → import this repository. Build command `npm run build`,
deploy command `npx wrangler deploy` (reads `wrangler.jsonc`, serves `./out`). Then add
`qorpe.com` as a custom domain on the Worker.

Brand assets live in `public/brand/`; the header and footer recolor the mark through a CSS mask,
so one SVG serves both themes.
