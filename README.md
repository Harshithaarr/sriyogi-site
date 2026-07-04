# Sri Yogi — sriyogi.site

A fast, free-to-host devotional website for **Sri Sahasrara Yogishwara Swami
Mahapeetham**, rebuilt off Wix using [Astro](https://astro.build) (a static-site
generator). Pages are plain HTML/CSS at runtime — no Wix, no monthly platform
fee, no vendor lock-in. You own all the files.

---

## ⚠️ Important: Node setup on this machine

Your shell has a broken `nvm` shim that makes `node` / `npm` recurse infinitely
(`maximum nested function level reached`). Until that's fixed, **run every
command in a clean shell** that skips your startup files, like this:

```bash
zsh -f -c 'export PATH="/opt/homebrew/bin:$PATH"; cd ~/sriyogi-site; node node_modules/astro/astro.js dev'
```

`zsh -f` = "don't load my ~/.zshrc". Homebrew's Node (v24) lives at
`/opt/homebrew/bin`. (Fixing the nvm shim in your `~/.zshrc` later would let you
just type `npm run dev` normally — happy to help with that separately.)

---

## Run it locally

```bash
# from ~/sriyogi-site, in a clean shell as above:
node node_modules/astro/astro.js dev      # live preview at http://localhost:4321
node node_modules/astro/astro.js build    # produces the deployable site in dist/
node node_modules/astro/astro.js preview  # preview the built dist/ locally
```

Once the nvm shim is fixed these become `npm run dev` / `npm run build` / `npm run preview`.

---

## How to edit content

Everything is plain text. No database, no admin login.

| What you want to change | File to edit |
|---|---|
| Site name, tagline, **contact email/phone**, social links, **nav menu** | `src/data/site.js` |
| Home page | `src/pages/index.astro` |
| Biography / lineage story | `src/pages/about.astro` |
| Branch locations & addresses | `src/pages/branches.astro` (edit the `branches` list at the top) |
| Courses | `src/pages/courses.astro` |
| Team members | `src/pages/team.astro` |
| Objective / mission | `src/pages/objective.astro` |
| Testimonials | `src/pages/testimonials.astro` |
| News & events | `src/pages/news.astro` |
| Privacy / Refund / Terms | `src/pages/privacy.astro`, `refund.astro`, `terms.astro` |
| Colors & fonts (whole-site theme) | `src/styles/global.css` (the `:root` variables at the top) |

Blocks marked `EDIT ME` are placeholders — I couldn't pull every Wix subpage
automatically (Wix loads them with JavaScript), so paste your real text from the
current site into those. The Home and About pages already have your real content.

### Adding images
Drop image files into the `public/` folder (e.g. `public/images/swami.jpg`) and
reference them as `/images/swami.jpg` in any page.

---

## Deploying (and keeping the sriyogi.site domain)

The build output is the `dist/` folder — a pile of static files any host can
serve. **None of this uses your work/office accounts.** Pick one host with a
free **personal** account:

### Option A — Netlify (easiest, drag-and-drop)
1. Run `... astro.js build` to generate `dist/`.
2. Go to <https://app.netlify.com/drop> and **drag the `dist/` folder** onto the page.
3. It's live instantly on a temporary `*.netlify.app` URL.
4. Add your domain: **Site settings → Domain management → Add `sriyogi.site`**,
   then follow their DNS instructions (see "Pointing the domain" below).

### Option B — Cloudflare Pages (best if your DNS is already at Cloudflare)
1. Sign up at <https://dash.cloudflare.com> (personal email).
2. Install the CLI and deploy the built folder:
   ```bash
   npm install -g wrangler        # one time
   wrangler pages deploy dist --project-name sriyogi
   ```
   (or use the dashboard's "Upload assets" option — no CLI needed)
3. Add `sriyogi.site` as a custom domain in the Pages project settings.

### Option C — Vercel
Sign up at <https://vercel.com> with a personal account, `vercel` CLI or
drag-drop the project, add the domain in project settings.

---

## Pointing the domain (sriyogi.site) to the new site

Right now `sriyogi.site` points at Wix. To move it:

1. **Find where your domain is registered / its DNS is managed.** It's either:
   - **At Wix** (if you bought the domain through Wix), or
   - **At a registrar** (GoDaddy, Namecheap, Google Domains, etc.) with DNS
     either there or at Cloudflare.
2. **In that DNS dashboard**, change the records the new host tells you to set —
   typically either:
   - an `A` record for `@` → the host's IP, **plus** a `CNAME` for `www`, or
   - a single `CNAME` (the host will give you exact values).
3. **Wait for propagation** (minutes to a few hours).
4. Enable HTTPS — all three hosts issue a free SSL certificate automatically once
   the domain resolves.

> Keep the Wix site live until the new one is confirmed working on the domain, then
> cancel Wix. **Don't let the domain registration lapse** — if Wix is also your
> registrar, you may want to transfer the domain out to a standalone registrar
> first so cancelling Wix doesn't take the domain with it.

I can walk you through the exact DNS steps once you tell me where the domain is
currently managed.

---

## Project structure

```
sriyogi-site/
├── public/              # static assets served as-is (favicon, images)
│   └── favicon.svg
├── src/
│   ├── components/      # Header, Footer, PageHeader (shared building blocks)
│   ├── data/site.js     # ← site-wide settings: nav, contact, socials
│   ├── layouts/         # BaseLayout.astro (the page shell)
│   ├── pages/           # one file = one page/URL
│   └── styles/global.css
├── astro.config.mjs
└── package.json
```
