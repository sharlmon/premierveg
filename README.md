# Premier Veg

Redesign of premierveg.com (WordPress) as a Nuxt 3 static site, deployed to GitHub Pages.

## Run
```
npm install
npm run dev        # local dev
npm run generate   # static build -> .output/public
```

## Settings (GitHub repo: Settings > Secrets and variables > Actions > Variables)
| Variable | What it does |
|---|---|
| `WEB3FORMS_KEY` | Access key from web3forms.com (free; created with the email that should receive enquiries). Empty = form falls back to opening the visitor's email app. |
| `WHATSAPP_NUMBER` | WhatsApp number, digits only with country code (default `393512151931`, confirmed by the project owner). |
| `SITE_URL` | Public site URL used for canonical links, sitemap and social images. Change when the custom domain goes live. |

## Content to fill in later
`app/data.ts` > each product's `specs: { sizes, season, shelfLife }` is empty on purpose. Anything empty shows as "On request" in the product popup and the PDF spec sheet.
