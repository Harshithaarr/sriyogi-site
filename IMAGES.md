# How to add the photos

I can't save pasted images to disk — the files have to be copied into the
project. I've **pre-wired every image slot** to the filenames below. Just save
each photo with the **exact filename** into the folder shown, and it appears on
the site automatically. (Filenames are case-sensitive. JPG is fine.)

After dropping files, rebuild:
`zsh -f -c 'export PATH="/opt/homebrew/bin:$PATH"; cd ~/sriyogi-site; node node_modules/astro/astro.js build'`

---

## 1. Home + About — Sri Yogi portrait
The beautiful sepia/golden portrait of Sri Yogi (peacock background).

| Save as | Used on |
|---|---|
| `public/images/home/hero.jpg` | Home page hero background |
| `public/images/sri-yogi-portrait.jpg` | About page (large portrait near top) |

(`hero.jpg` and `sri-yogi-portrait.jpg` can be the same photo saved twice, or two
different portraits. The Team founder card uses `public/images/team/founder.jpg`.)

---

## 2. Team — one portrait per person
Save into `public/images/team/`. **Match each face to the right name** — I can't
tell who is who from the photos, so you place them:

| Save as | Person | Role |
|---|---|---|
| `founder.jpg` | Sri Sri Sri Yogishwara Swami | Founder & Peethadhishwar |
| `godha-shanmukha.jpg` | Smt. Godha Shanmukha | Manager |
| `mohan-dharwadker.jpg` | Sri Mohan Dharwadker | Head of Administration |
| `gayatri.jpg` | Smt. Dr. Gayatri Y S | Secretary |
| `vikas-hegde.jpg` | Sri Vikas Hegde | Treasurer |
| `manish-dharwadker.jpg` | Sri Manish Dharwadker | Head of IT |
| `soudhamini.jpg` | Kum. Soudhamini | Director of Communication |
| `sunku-narendranath.jpg` | Sri Sunku Narendranath | Personal Relationship Officer |

(Any person without a file just shows the ॐ placeholder — totally fine.)

---

## 3. News — event photos (optional, makes News richer)
Save into `public/images/news/`. These illustrate the book-launch / darshan stories:

| Save as | Good photo to use |
|---|---|
| `book-launch.jpg` | The Penguin book unveiling (panel holding the book) |
| `governor.jpg` | The Lok Bhavan / Governor meeting photo |
| `darshan.jpg` | A darshan / temple gathering photo |

(News works fine without these — they're a bonus.)

---

## 4. Branches — location photos (optional)
Save into `public/images/branches/` named after the location, e.g.
`bengaluru.jpg`, `hubballi.jpg`, `sirsi.jpg`, etc. Tell me which photo is which
location and I'll wire each into its card.

---

## 6. Guru Purnima — two lead photos
Save into `public/images/guru-purnima/`:

| Save as | Photo |
|---|---|
| `darshan-throne.jpg` | Sri Yogi garlanded on the carved throne |
| `procession.jpg` | The procession with parasol & drums |

These are the two cards at the top of the `/guru-purnima/` page.

---

## 5. Logo — header brand (REQUIRED for the logo to appear)
Save the gold "Sri Sahasrara Yogishwara Swami Mahapeetam — Since 596AD" logo as:

| Save as | Used on |
|---|---|
| `public/images/logo.png` | Header brand (every page) + social share image |

Tips:
- A **transparent PNG, cropped tight** around the artwork looks sharpest in the bar.
  The header cover-crops a square automatically, but a tight horizontal crop is best.
- The current light/white background blends fine on the cream header. Avoid placing
  the light-background version on the dark footer.

---

## Book cover — already done ✅
`public/images/book-the-wanderer.png` is in place (the Penguin cover).
