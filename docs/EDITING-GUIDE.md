# Editing Guide

This guide explains what you need to change and how to do it. Most updates involve editing JSON files or HTML fragments—no need to touch generated output.

---

## What Updates Automatically

When you run `npm run build`, these are generated for you:

- ✅ Homepage article list
- ✅ Article archive page
- ✅ Book chapter links
- ✅ Navigation from `config/navigation.json`
- ✅ Social links from `config/site.json`
- ✅ Metadata rendering (title, description, Open Graph, JSON-LD)
- ✅ Reading time calculation (if not manually set)
- ✅ Sitemap and robots.txt
- ✅ Related article links (from article IDs)

You should NOT manually edit files in `dist/`. Edit source files, then build.

---

## Quick Reference

| What You Want to Change | File to Edit |
|-------------------------|-------------|
| Your name, role, location | `config/site.json` |
| Social profile links | `config/site.json` |
| Contact email | `config/site.json` |
| Domain or canonical URL base | `config/site.json` |
| Navigation menu | `config/navigation.json` |
| Intro and work examples | `content/profile.json` |
| Toolkit (in practice / learning) | `content/profile.json` |
| Book structure and chapter order | `content/book.json` |
| Create a new article | Run `npm run new-article` |
| Edit article content | `content/articles/{slug}/body.html` |
| Edit article metadata | `content/articles/{slug}/meta.json` |
| Publish a draft article | Change `"status": "draft"` to `"status": "published"` in `meta.json` |
| Add a chapter to the book | Add entry to `content/book.json` |
| Change publication date | Update `datePublished` or `dateModified` in `meta.json` |
| Update résumé | Replace `dist/assets/vairag-akbari-resume.pdf` |
| Change portrait image | Replace `dist/assets/vairag-akbari.webp` |

---

## 1. Update Profile and Role

**File**: `config/site.json`

Change your name, role, description, or location:

```json
{
  "name": "Vairag Akbari",
  "domain": "https://vairagakbari.in",
  "description": "Founder's office, strategy, growth & product operator",
  "author": {
    "name": "Vairag Akbari",
    "url": "https://vairagakbari.in/",
    "role": "Strategy, growth & product operator",
    "location": "Bengaluru, India"
  }
}
```

**File**: `content/profile.json`

Update introduction, work examples, and toolkit:

```json
{
  "eyebrow": "Bengaluru, India · Open to opportunities",
  "headline": "Hi, I'm Vairag.<br>I connect <em class=\"accent\">customer needs</em><br>to business decisions.",
  "lead": "I work on growth and operations at Jumbo Homes...",
  "work": [
    {
      "meta": "JUMBO HOMES · JUNE 2026–PRESENT",
      "title": "Owning a property sales pipeline",
      "description": "Supply onboarding, buyer qualification...",
      "tags": ["Pipeline management", "Customer discovery"]
    }
  ],
  "toolkit": {
    "inPractice": "Google Sheets, Excel, Twenty CRM...",
    "learning": "SQL, Mixpanel, product analytics..."
  }
}
```

After editing, run:
```bash
npm run build
```

---

## 2. Add or Update Social Links

**File**: `config/site.json`

Edit the `social` section. Only include links you've verified. Set to `null` if you don't have that profile:

```json
{
  "social": {
    "linkedin": "https://www.linkedin.com/in/vairag-akbari",
    "github": null,
    "twitter": "https://x.com/vairaglife",
    "instagram": "https://instagram.com/growthwithvairag",
    "substack": null,
    "medium": null,
    "geeksforgeeks": null,
    "leetcode": null,
    "threads": null,
    "top-mate": null
  }
}
```

The build automatically shows only verified links and hides null entries.

---

## 3. Update Navigation Menu

**File**: `config/navigation.json`

```json
{
  "main": [
    { "label": "Work", "href": "/#work" },
    { "label": "Articles", "href": "/article/" },
    { "label": "The book", "href": "/book/" },
    { "label": "Contact", "href": "/#contact" }
  ],
  "footer": [
    { "label": "LinkedIn", "href": "https://www.linkedin.com/in/vairag-akbari" }
  ],
  "copyright": "© 2026 Vairag Akbari"
}
```

Update labels, hrefs, and copyright as needed.

---

## 4. Create a New Article

Run the article creation script:

```bash
npm run new-article
```

Answer the prompts:
- **Title**: Full article title
- **Slug**: URL-safe identifier (lowercase-with-hyphens)
- **Description**: Short summary for meta tags and listings
- **Topic**: Product, Growth, Analytics, etc.

This creates:
```
content/articles/{slug}/
├── meta.json       # Metadata
├── body.html       # Content
└── images/         # For article images
```

The article starts as `"status": "draft"` and won't appear publicly until you change it to `"published"`.

---

## 5. Edit Article Content

**File**: `content/articles/{slug}/body.html`

Write your article using semantic HTML:

```html
<section id="introduction">
  <h2>Introduction</h2>
  <p>Write your content here.</p>
  
  <div class="callout">
    <strong>Key Takeaway</strong>
    <p>Use callout boxes for important notes.</p>
  </div>
</section>

<section id="next-topic">
  <h2>Your Next Section</h2>
  <p>Continue here.</p>
</section>

<section id="sources">
  <h2>Sources</h2>
  <p>List references here.</p>
</section>
```

**Important**: Each section needs an `id` that matches an entry in `tableOfContents` in `meta.json`.

---

## 6. Edit Article Metadata

**File**: `content/articles/{slug}/meta.json`

Example:

```json
{
  "id": "job-to-be-done",
  "title": "Jobs to Be Done: A Practical Framework with a Real-Estate Example",
  "shortTitle": "Jobs to Be Done: start with the progress",
  "slug": "Job-To-Be-Done",
  "topic": "Product",
  "eyebrow": "Product · Chapter 01",
  "description": "Learn Jobs to Be Done through a property-search example...",
  "lead": "A useful way to move from \"Who is our customer?\" to \"What are they trying to change?\"",
  "readingTime": 5,
  "status": "published",
  "datePublished": "2026-10-01T10:00:00.000Z",
  "dateModified": "2026-10-08T14:30:00.000Z",
  "chapterNumber": 1,
  "partNumber": 1,
  "canonical": "https://vairagakbari.in/article/Job-To-Be-Done/",
  "image": null,
  "imageAlt": null,
  "sources": [
    {
      "text": "Christensen Institute's Jobs to Be Done theory",
      "url": "https://www.christenseninstitute.org/theory/jobs-to-be-done/"
    }
  ],
  "relatedArticles": [],
  "tableOfContents": [
    { "id": "what-is-jtbd", "title": "What is JTBD?" },
    { "id": "sub-topic", "title": "The three dimensions" }
  ]
}
```

### Key Fields:

- **id**: Stable identifier (never change once published)
- **title**: Full title
- **shortTitle**: Shorter version for listings (optional)
- **slug**: URL segment (preserve if already published)
- **status**: `"draft"`, `"review"`, or `"published"`
- **datePublished**: Set when first published. Do NOT change on edits.
- **dateModified**: Update when you make meaningful changes.
- **canonical**: Must match `{domain}/article/{slug}/`
- **tableOfContents**: Must match section IDs in `body.html`
- **relatedArticles**: Array of article **IDs** (not slugs)

**Reading time**: Leave as `null` to calculate automatically, or set manually.

---

## 7. Publish a Draft Article

1. Open `content/articles/{slug}/meta.json`
2. Change `"status": "draft"` to `"status": "published"`
3. Set `datePublished` to current date in ISO 8601 format:
   ```json
   "datePublished": "2026-10-15T10:00:00.000Z"
   ```
4. Run `npm run build`
5. Verify in `dist/article/{slug}/index.html`
6. Deploy

---

## 8. Edit an Existing Article

1. Make changes to `content/articles/{slug}/body.html` or `meta.json`
2. Update `dateModified` to current date (only for meaningful editorial changes)
3. Keep `datePublished` unchanged
4. Keep `slug` unchanged (or set up redirect if you must change it)
5. Run `npm run build`

---

## 9. Add or Move a Book Chapter

**File**: `content/book.json`

To add a published article to the book, reference it by **article ID**:

```json
{
  "parts": [
    {
      "number": 1,
      "title": "Customer Understanding",
      "chapters": [
        {
          "articleId": "job-to-be-done",
          "status": "published"
        }
      ]
    }
  ]
}
```

To show a planned chapter (not yet written):

```json
{
  "title": "Revenue tree: users × frequency × value",
  "status": "planned"
}
```

The build will:
- Link published chapters to their article pages
- Show planned chapters as plain text with status

**Do not duplicate article text into the book.** The book links to article pages.

---

## 10. Change URLs or Slugs (Advanced)

⚠️ **Avoid changing slugs for published articles.** Old links will break.

If you must change a slug:

1. Update `slug` in `meta.json`
2. Update `canonical` to match new slug
3. Update any `relatedArticles` references in other articles
4. Set up a permanent redirect from old URL to new URL (Netlify handles this via `_redirects`)
5. Add redirect rule:
   ```
   /article/old-slug/  /article/new-slug/  301
   ```
6. Update internal links across the site
7. Run `npm run build`

---

## 11. Update Résumé or Portrait

**Résumé**: Replace `dist/assets/vairag-akbari-resume.pdf` with your updated PDF.

**Portrait**: Replace `dist/assets/vairag-akbari.webp` with your new image. Keep filename or update `profile.json`:

```json
{
  "portraitImage": "/assets/vairag-akbari.webp",
  "portraitAlt": "Portrait of Vairag Akbari in a black suit"
}
```

Use WebP format for best performance. Recommended size: 928×1152 or similar high-quality portrait crop.

---

## 12. Add Article Images

Place images in `content/articles/{slug}/images/` and reference them in `body.html`:

```html
<img src="/assets/articles/{slug}/my-diagram.png" 
     alt="Revenue tree diagram showing decomposition" 
     width="800" 
     height="600">
```

Or set a featured image in `meta.json`:

```json
{
  "image": "/assets/articles/revenue-tree/revenue-tree-diagram.png",
  "imageAlt": "Revenue tree diagram showing users multiplied by frequency multiplied by value"
}
```

Copy images to `dist/assets/articles/{slug}/` during build or manually.

---

## 13. Workflow Summary

### For a New Article:

1. `npm run new-article`
2. Edit `content/articles/{slug}/body.html`
3. Edit `content/articles/{slug}/meta.json` (add tableOfContents, sources)
4. Change status to `"published"` when ready
5. Add to `content/book.json` if part of book
6. `npm run build`
7. `npm run validate`
8. `npm run preview` to check locally
9. Deploy

### For Editing Existing Content:

1. Edit source file (profile.json, meta.json, body.html, etc.)
2. Update `dateModified` if editing article
3. `npm run build`
4. `npm run validate`
5. Deploy

---

## 14. Common Mistakes to Avoid

❌ **Don't edit files in `dist/` directly** — they'll be overwritten on next build

❌ **Don't change `datePublished`** on edits — only `dateModified`

❌ **Don't change `id` or `slug`** after publishing — breaks links

❌ **Don't add fragments to canonical URLs** — `canonical` should not have `#section`

❌ **Don't forget to update `tableOfContents`** when adding sections

❌ **Don't reference missing article IDs** in `relatedArticles` or book chapters

❌ **Don't commit sensitive files** — no credentials, API keys, or private notes in `dist/`

✅ **Do run `npm run validate`** before deploying

✅ **Do test locally** with `npm run preview`

✅ **Do keep `distribution/` folder private** — never copy to `dist/`

---

## 15. File Locations Quick Map

```
config/
  site.json          → Site identity, domain, social, author
  navigation.json    → Navigation menu and footer

content/
  profile.json       → Homepage intro, work, toolkit
  book.json          → Book structure and chapter order
  articles/{slug}/
    meta.json        → Article metadata
    body.html        → Article content
    images/          → Article images

dist/
  [generated]        → Do not edit directly

distribution/
  [private]          → Platform drafts, never deployed
```

---

## Need Help?

- Run `npm run validate` to check for common issues
- Check `docs/PUBLISHING-CHECKLIST.md` for pre-deployment steps
- See `docs/PLATFORM-GUIDE.md` for external publishing
- See `docs/SEO-GUIDE.md` for search optimization
- See `docs/DEPLOYMENT.md` for deployment instructions

---

**Next**: [Publishing Checklist](PUBLISHING-CHECKLIST.md)
