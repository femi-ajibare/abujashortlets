# Abujashortlets

Verified shortlets in Abuja & Lagos. A static, single-file React + Vite site where every
booking path funnels to WhatsApp (`https://wa.link/hc0a3b`).

## Stack

- React 19 + TypeScript
- Vite 7 (with `vite-plugin-singlefile` → one self-contained `dist/index.html`)
- Tailwind CSS 4 (custom theme tokens in `src/index.css`)
- No backend. Bookings happen over WhatsApp.

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # -> dist/index.html
npm run preview    # serve the production build locally
```

## Deploy

The build output is a **single static file**, so any static host works.

### Netlify (recommended — simplest)

**Via drag & drop (no account needed to try):**
1. Run `npm run build`.
2. Go to https://app.netlify.com/drop
3. Drag the **`dist` folder** onto the page.
4. You get a live `https://<random>.netlify.app` URL immediately.

**Via Git (auto-deploy on every push):**
1. Push this repo to GitHub.
2. Go to https://app.netlify.com → **Add new site** → **Import an existing project**.
3. Pick the repo. Netlify reads `netlify.toml` automatically:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click **Deploy site**. Every `git push` now redeploys automatically.

**Via CLI:**
```bash
npm run deploy:netlify
```

### Vercel

1. Push to GitHub.
2. https://vercel.com/new → import the repo.
3. Framework preset: **Vite**. Build: `npm run build`. Output: `dist`.
4. Deploy. No `base` path needed (served at the domain root).

### Cloudflare Pages

1. Push to GitHub.
2. https://pages.cloudflare.com → **Create a project** → connect the repo.
3. Build command: `npm run build`. Output directory: `dist`.
4. Deploy.

### GitHub Pages

The workflow in `.github/workflows/deploy.yml` publishes to Pages automatically on every push
to `main`.

1. Push this repo to GitHub.
2. In the repo: **Settings → Pages → Source: GitHub Actions**.
3. If the repo is a *project* site (URL is `https://<user>.github.io/<repo>/`), add a
   repository variable:
   - **Settings → Secrets and variables → Actions → Variables → New variable**
   - Name: `BASE_PATH`, Value: `<repo-name>` (e.g. `abujashortlets`)
4. The first push publishes the site. URL: `https://<user>.github.io/<repo>/`

For a *user* site (`https://<user>.github.io/`), leave `BASE_PATH` unset.

## Updating listings

There is no global Edit Site or settings panel. Prices, copy and listing details are maintained
in `src/data.ts`:

| What | Where |
| --- | --- |
| WhatsApp number & booking link | `WHATSAPP_NUMBER`, `WA_BOOKING_LINK` |
| Phone, email, address, hours | `CONTACT` |
| Apartments (price, photos, amenities) | `apartments` |
| Neighbourhoods per city | `NEIGHBOURHOODS_BY_CITY` |
| Filter options (price bands, amenities) | `PRICE_RANGES`, `POPULAR_AMENITIES` |
| Nav links | `DEFAULT_NAV_LINKS` |

Each listing photo also has a **Change photo** control. Uploads are compressed and saved in the
current browser's local storage, so they are useful for local review but are not shared with other
visitors. For a permanent public photo, save the image in `public/images/` and update the listing's
`img` field in `src/data.ts`.

After any source edit:
```bash
npm run build
```
then redeploy (push to git, or re-run the Netlify CLI command).

## Notes

- Images are loaded from `images.pexels.com` and fonts from Google Fonts at runtime. To make
  the site fully self-hosted, replace those URLs with files in `public/` and reference them
  with `/assets/...`.
- Per-photo replacements are browser-local by design. Public listing content and images should
  be updated in source and redeployed.
