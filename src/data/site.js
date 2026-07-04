// ─────────────────────────────────────────────────────────────────────────
//  SITE-WIDE SETTINGS — edit these and they update everywhere (header, footer)
// ─────────────────────────────────────────────────────────────────────────

export const site = {
  name: 'Sri Sahasrara Yogishwara Swami Mahapeetham',
  shortName: 'Sri Yogi',
  tagline: 'A living lineage of divine consciousness',

  // Brand logo shown in the header. Save the gold logo as the file below.
  logo: '/images/logo-trim.png',

  // Form endpoints.
  forms: {
    // (Legacy) Google Apps Script web-app URL — no longer used on the page.
    guruPurnima: 'https://script.google.com/macros/s/AKfycbxyi31CHy3HFactGGGzur5mMWiTTIBrltnZatuZ09Ga4sF6ABQqbsP_oyyYVrtqt2VD/exec',
    // Shareable Google Form link for Guru Purnima registration (opens in a new
    // tab). To change the form, paste the new form's share link (Send → 🔗).
    guruPurnimaFormLink: 'https://forms.gle/jgVLNd9wwSKVAVZy6',
  },

  // Featured event banner shown near the top of the home page.
  // Set show:false to hide it once the event is over.
  featuredEvent: {
    show: true,
    tag: 'Upcoming Event',
    title: 'Guru Purnima 2026',
    date: 'Wednesday, 29 July 2026',
    blurb: 'A sacred day of gratitude — darshan, discourse & the blessings of the Guru. Register to attend.',
    href: '/guru-purnima/',
    cta: 'View Details & Register',
  },

  // Razorpay Payment Page / Payment Button links, one per offering.
  // Paste each URL here after creating it in your Razorpay dashboard
  // (see PAYMENTS-SETUP.md). Leave '' and that offering shows as
  // "Coming soon" with its button disabled. Amounts (fixed / tiered /
  // devotee-entered) are configured on the Razorpay page itself, not here.
  payments: {
    mantropadesham: '',
    shivaratriPoojas: '',
    donation: '',
  },

  contact: {
    headOffice: 'Bengaluru, Karnataka, India',
    email: 'info.ysmutt@gmail.com',
    phone: '+91 886 117 2068',
    whatsapp: '+91 76762 37792',           // enquiries (WhatsApp)
  },

  // WhatsApp community group — "Join us on WhatsApp"
  whatsappCommunity: 'https://chat.whatsapp.com/GhDrzZO3xTXIXUDejD9rGp',

  // Set to your real profile URLs. Leave a value empty ('') to hide that icon.
  social: {
    instagram: 'https://www.instagram.com/sriyogi18',
    facebook: 'https://www.facebook.com/people/SriYogi/100021250591524/',
    twitter: 'https://x.com/Sriyogi5',
    youtube: 'https://www.youtube.com/c/sriyogi',
  },
};

// ── The book by Sri Yogi (published by Penguin). Edit details here.
export const book = {
  title: 'The Wanderer Who Owns the World',
  subtitle: 'Based on Ancient Indian Philosophy for Meaning and Truth — A Self-help Guide to Inner Freedom',
  author: 'Sri Yogi',
  publisher: 'India Penguin Ananda',
  published: 'April 2026',
  isbn: '9780143480525',
  pages: 344,
  cover: '/images/book-front.jpg',
  amazonUrl: 'https://www.amazon.in/Wanderer-Who-Owns-World-Philosophy/dp/0143480529',
  penguinUrl: 'https://www.penguin.co.in/book/the-wanderer-who-owns-the-world/',
};

// ── Book reviews & endorsements. Shared by Home (full) and Book (brief) pages.
export const bookRating = { stars: 5.0, count: 34 };
export const bookReviewsUrl = 'https://www.amazon.in/Wanderer-Who-Owns-World-Philosophy/product-reviews/0143480529';

// Featured endorsements — shown as large highlighted quotes above the grid.
export const bookEndorsements = [
  {
    quote: 'India has a rich tradition of making sense of the universe through an inward exploratory journey. Sri Yogishwara Swami has narrated the interaction of the universe with the human body — from birth to death — in a language and understanding replete with today’s science and technology terms. The book gives an amazing exposure to the seeker.',
    name: 'A. S. Kiran Kumar',
    source: 'Former Chairman, ISRO',
  },
  {
    quote: '“The Wanderer Who Owns the World” is in itself a wonder production of an exceptional and unique saga. This volume, couched with an awesome employment of language, is a blessed boon to those trapped in the meshes of Samsara — and to the seekers for whom Infinite Bliss is the ultimate goal.',
    name: 'Princess Aswathy Thirunal Gouri Lakshmi Bayi',
    source: 'Kaudiar Palace, Thiruvananthapuram',
  },
];

// Named reviewers (press, critics, book bloggers). `source` = their role.
// `name` may be empty for editorial reviews (figcaption is then hidden).
export const bookReviews = [
  {
    source: 'Editorial Review',
    title: 'A Rare Literary & Spiritual Achievement',
    quote: 'Not merely a book but a profound spiritual journey across 9 sections and 66 chapters. It does not merely inform the intellect; it inspires transformation — a companion for life’s journey, a mirror for self-reflection, and a timeless guide for spiritual awakening. “To own the world, carry nothing. To find yourself, seek sincerely.”',
    name: '',
  },
  {
    source: 'Literature Critic',
    title: 'A Profound, Enlightening Masterwork',
    quote: 'Philosophy, spirituality, awareness, karma, time, nature and human consciousness are expertly woven together. The writing is poetic, multifaceted and full of insights — a profound and enlightening masterwork for anyone who truly seeks it.',
    name: 'Sagar Naskar',
  },
  {
    source: 'Reviewer',
    title: 'For Readers Who Love to Think',
    quote: 'A collection of thoughts accumulated through many years of contemplation. The person who owns the world isn’t the one who has everything — but the one who has learned to live in a way that doesn’t possess them anymore.',
    name: 'Dr. Deotima S',
  },
  {
    source: 'Book Blogger',
    title: 'The Sacred and Scientific, Seamlessly Woven',
    quote: 'The writing blends the sacred and scientific into one seamless thread. Somewhere during the course of reading I felt peace permeating every pore of the body.',
    name: 'Aparna Prabhu',
  },
  {
    source: 'Book Blogger',
    title: 'Thoughtful, Grounding, Introspective',
    quote: 'The idea that we truly “own” the world only when we stop trying to possess it stayed with me long after I turned the last page. Thoughtful, grounding, and beautifully introspective.',
    name: 'Maahi Aggarwal',
  },
  {
    source: 'Book Blogger',
    title: 'Spiritually and Scientifically Enriching',
    quote: 'Such a spiritually and scientifically enriching read! The author takes us on a journey inward — from mind to soul to life — with both spiritual and scientific explanations.',
    name: 'Fiction and Me',
  },
  {
    source: 'Book Blogger',
    title: 'A Gentle Invitation to Look Inward',
    quote: 'A thoughtful and deeply reflective exploration of life, purpose, and inner freedom. It does not preach or impose answers; instead, it inspires contemplation and self-discovery.',
    name: 'Kinkita',
  },
];

// ── Top navigation. Order = display order. `href` must match a file in src/pages.
export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Guru Purnima', href: '/guru-purnima/' },
  { label: 'About Sri Yogi', href: '/about/' },
  { label: 'Book', href: '/book/' },
  { label: 'Branches', href: '/branches/' },
  { label: 'Courses', href: '/courses/' },
  { label: 'Offerings', href: '/offerings/' },
  { label: 'Our Team', href: '/team/' },
  { label: 'Objective', href: '/objective/' },
  { label: 'Testimonials', href: '/testimonials/' },
  { label: 'News', href: '/news/' },
];

// ── Footer-only links (legal pages)
export const legalNav = [
  { label: 'Privacy Policy', href: '/privacy/' },
  { label: 'Return & Refund', href: '/refund/' },
  { label: 'Terms of Service', href: '/terms/' },
];
