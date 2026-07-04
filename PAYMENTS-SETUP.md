# Offerings & Donations → Razorpay (no-code)

The **Offerings & Contributions** page (`/offerings/`) lets devotees contribute
towards Mantropadesham, Maha Shivaratri poojas, and general donations. Each
offering links to a **Razorpay Payment Page** you create — no server code, no
secret keys in the site. Follow these one-time steps.

> Event **registration stays free** — this is only for the paid offerings and
> donations.

## 0. Before you start — onboarding (this is the real lead time)
Razorpay needs KYC before you can accept live payments. Have ready:
- **Registered entity + PAN** for the Mahapeetham (trust/society/company)
- **Business bank account** for settlements
- **KYC documents** (registration proof, PAN, bank details, authorised signatory)
- **80G status**, if you want Razorpay to issue tax-deductible donation receipts

Approval typically takes a few days — start this first.

## 1. Create a Razorpay account
1. Sign up at <https://razorpay.com> and complete **KYC / activation**.
2. If donations are a focus, ask Razorpay about their **NGO / donations** setup.

## 2. Create one Payment Page per offering
In the Razorpay dashboard: **Payment Pages → Create Payment Page**. Make one for
each card on the site:

| Offering | Suggested amount type |
|---|---|
| **Mantropadesham** | Fixed amount (or a few tiers) |
| **Maha Shivaratri Poojas** | Tiered (Abhishekam / Archana / etc.) |
| **Donation** | "Let the customer decide" (open amount) |

On each page you can:
- Set the amount (fixed, tiered, or devotee-entered)
- Add **custom fields** (name, phone, gotra/nakshatra, sankalpa details)
- Enable **auto receipts** (and 80G receipts for donations)

Publish each page and copy its **URL** (looks like `https://rzp.io/l/xxxx` or a
`pages.razorpay.com/...` link).

## 3. Paste the URLs into the site
Open [`src/data/site.js`](src/data/site.js) and fill in the `payments` block:

```js
payments: {
  mantropadesham:   'https://rzp.io/l/xxxx',   // ← your Payment Page URL
  shivaratriPoojas: 'https://rzp.io/l/yyyy',
  donation:         'https://rzp.io/l/zzzz',
},
```

Any URL left as `''` shows that card as **"Coming soon"** (button disabled), so
the page is safe to publish before every page is ready.

Then rebuild:

```
npm run build
```

## 4. Adding more offerings later
1. Add a new card to the `offerings` list in
   [`src/pages/offerings.astro`](src/pages/offerings.astro) with a new `key`.
2. Add the same `key` to `payments` in [`src/data/site.js`](src/data/site.js).
3. Paste its Razorpay URL and rebuild.

---

### Notes
- **Where the money/records live:** every payment (with payer name, email, phone
  and your custom fields) appears in the **Razorpay dashboard**, exportable to
  Excel/CSV. Settlements go to your linked bank account.
- **No secrets in the repo:** Payment Pages are hosted by Razorpay, so the site
  only stores public page URLs — nothing sensitive.
- **If you later need payments tied to specific registrations** (auto-reconciled
  in a sheet), that's a larger build using Netlify Functions + Razorpay APIs +
  a webhook. Ask when you reach that point.
