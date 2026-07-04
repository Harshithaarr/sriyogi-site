# Registration form → Google Sheet (free, unlimited)

The Guru Purnima registration form saves every submission as a row in a Google
Sheet you own. This is free with no monthly submission cap — fine for 500+
registrations. Follow these one-time steps.

## 1. Create the Google Sheet
1. Go to <https://sheets.google.com> and create a **new blank spreadsheet**.
2. Name it e.g. **Guru Purnima Registrations**.
   (You don't need to add headers — the script adds them automatically.)

## 2. Add the script
1. In that sheet, click **Extensions → Apps Script**.
2. Delete any sample code, and paste in the whole script from
   [`google-apps-script/Code.gs`](google-apps-script/Code.gs) (in this project).
3. Click the **Save** (disk) icon.

## 3. Deploy it as a Web App
1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" → choose **Web app**.
3. Set:
   - **Description:** Guru Purnima form
   - **Execute as:** *Me*
   - **Who has access:** **Anyone**  ← important, so the website can post to it
4. Click **Deploy**. Approve the permissions prompt (it's your own script
   writing to your own sheet).
5. Copy the **Web app URL** it gives you (ends in `/exec`).

## 4. Paste the URL into the site
Open [`src/data/site.js`](src/data/site.js) and replace the placeholder:

```js
forms: {
  guruPurnima: 'https://script.google.com/macros/s/XXXXXXXX/exec',  // ← your URL
},
```

Then rebuild:

```
node node_modules/astro/astro.js build
```

## 5. Test
Open the live `/guru-purnima/` page, submit a test registration, and confirm a
new row appears in your sheet. 🎉

---

### Notes
- **Where the data lives:** all submissions are rows in your sheet — sort,
  filter, count guests/accommodation, or download as CSV/Excel anytime.
- **If you change the script later**, you must **Deploy → Manage deployments →
  edit → New version** for changes to take effect (or the URL stays on the old
  code).
- **Spam:** the form has a hidden honeypot field; the script silently ignores
  submissions that fill it.
