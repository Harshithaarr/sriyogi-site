# Seva confirmation list → live from your sheets (free, private)

The **/guru-purnima/seva-confirmation/** page shows every devotee who registered
for a seva, with a search box so each devotee can confirm the seva(s) they
opted for. It reads your three seva response sheets **live** — when a new
registration lands in a sheet, it appears on the page (within ~30 seconds).

Your sheets stay **private**. A small read-only Google Apps Script (running as
you) reads them and publishes only the **name + seva** — never phone, email or
address. Follow these one-time steps.

## 1. Open the Apps Script editor
1. Open any **one** of your three seva response spreadsheets in Google Sheets.
2. Click **Extensions → Apps Script**.
3. Delete any sample code, and paste in the whole script from
   [`google-apps-script/SevaConfirmations.gs`](google-apps-script/SevaConfirmations.gs).
4. Click the **Save** (disk) icon.

> The script already contains the three spreadsheet IDs, so it doesn't matter
> which of them you paste it into — it opens all three by ID.

## 2. Deploy it as a Web App
1. Click **Deploy → New deployment**.
2. Click the gear next to "Select type" → choose **Web app**.
3. Set:
   - **Description:** Seva confirmations
   - **Execute as:** *Me*
   - **Who has access:** **Anyone**  ← so the website can read it
4. Click **Deploy**. Approve the permissions prompt — it needs permission to
   read your spreadsheets (it's your own script reading your own sheets).
5. Copy the **Web app URL** it gives you (ends in `/exec`).

## 3. Check the columns were detected correctly
Open your `/exec` URL in a browser with `?debug=1` on the end, e.g.

```
https://script.google.com/macros/s/XXXX/exec?debug=1
```

For each sheet you'll see the `label` (the seva name), the detected `nameCols`,
and `sevaHeader`. Confirm the label and name look right. If a name column was
mis-detected, fill in the `OVERRIDES` block near the top of the script
(instructions are in the comments), **Save**, then **Deploy → Manage
deployments → edit → New version**.

## 4. Paste the URL into the site
Open [`src/data/site.js`](src/data/site.js) and set:

```js
forms: {
  ...
  sevaConfirmations: 'https://script.google.com/macros/s/XXXX/exec',  // ← your /exec URL
},
```

Then rebuild:

```
node node_modules/astro/astro.js build
```

## 5. Test
Open the live `/guru-purnima/seva-confirmation/` page. The full list should
appear; type a name into the search box and only that devotee's sevas show. Add
a test row to one of the sheets and refresh after ~30s — it should appear. 🎉

---

### Notes
- **Privacy:** the script only ever returns `name` + `seva`. Contact details in
  your sheets are never sent to the browser.
- **Live within ~30s:** responses are cached for 30 seconds to keep the page
  fast. To force a fresh read while testing, append `?nocache=1` to the URL.
- **If you change the script later**, you must **Deploy → Manage deployments →
  edit → New version** for changes to take effect.
- **Adding/removing a seva:** edit the `SHEETS` array at the top of the script
  (add the new spreadsheet's id + gid), Save, and redeploy a new version.
