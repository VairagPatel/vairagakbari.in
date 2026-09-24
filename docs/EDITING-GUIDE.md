# Editing Guide

This guide explains how to edit content on your portfolio website. All content lives in plain JSON and HTML files that you can edit with any text editor.

---

## Quick Reference

| Task | Files to Edit |
|------|---------------|
| Update your intro or work experience | `content/profile.json` |
| Add a new article | Run `npm run new-article`, then edit the generated files |
| Edit an existing article | Edit `content/articles/[slug]/body.html` and `meta.json` |
| Change site name or domain | `config/site.json` |
| Add/remove navigation links | `config/navigation.json` |
| Reorganize the book | `content/book.json` |
| Update résumé or portrait | Replace files in `dist/assets/` |

After any edits: run `npm run build` to regenerate the site.

---

## 1. Update Your Profile

**File:** `content/profile.json`

### Change your headline or intro
```json
{
  "eyebrow": "Bengaluru, India · Open to opportunities",
  "headline": "Your headline here",
  "lead": "Your intro paragraph",
  ...
}
```

### Add or edit work experience
```json
{
  "work": [
    {
      "meta": "COMPANY · DATES",
      "title": "What you did",
      "description": "Details about the work",
      "tags": ["Tag 1", "Tag 2"]
    }
  ]
}
```

- Keep work items in reverse chronological order (newest first)
- Tags should be 1-3 words each
- Be specific about what you built/owned/achieved

### Update toolkit
```json
{
  "toolkit": {
    "inPractice": "Tools and skills you use regularly",
    "learning": "What you're actively learning",
    "interest": "Your interest area"
  }
}
```

---

## 2. Create a New Article

### Using the command
```cmd
npm run new-article
```

This will:
1. Ask for article title, slug, description, and topic
2. Create `content/articles/[slug]/` folder
3. Generate `meta.json` and `body.html` templates
4. Create an `images/` folder for article assets

### Article slug rules
- Lowercase letters, numbers, and hyphens only
- No spaces or special characters
- Example: `revenue-tree` not `Revenue Tree!`
- Slug becomes part of URL: `/article/revenue-tree/`

---

## 3. Write Article Content

### Edit the article body

**File:** `content/articles/[slug]/body.html`

Write semantic HTML with sections:

```html
<section id="introduction">
  <h2>Introduction</h2>
  <p>Your opening paragraph.</p>
</section>

<section id="key-concept">
  <h2>A Key Concept</h2>
  <p>Explanation here.</p>
  
  <div class="callout">
    <strong>Important note</strong>
    <p>Highlighted information</p>
  </div>
</section>
```

**Available styles:**
- `<div class="callout">` — Highlighted box with blue border
- `<div class="flow">` — Vertical stack of boxes (for processes/flows)
- `<em class="accent">` — Blue accent text
- `<ul>` and `<ol>` — Bulleted and numbered lists

### Update article metadata

**File:** `content/articles/[slug]/meta.json`

```json
{
  "id": "your-article-id",
  "title": "Full Article Title",
  "shortTitle": "Shorter version for links",
  "slug": "url-slug",
  "topic": "Product",
  "description": "One-line summary (for meta description)",
  "lead": "Opening statement shown below title",
  "status": "draft",
  "tableOfContents": [
    { "id": "introduction", "title": "Introduction" },
    { "id": "key-concept", "title": "A Key Concept" }
  ],
  "sources": [
    { 
      "text": "Source name",
      "url": "https://example.com"
    }
  ]
}
```

**Important fields:**
- `id` — Stable identifier, use lowercase-with-hyphens
- `slug` — URL path component (should match folder name)
- `status` — `"draft"` (excluded from site) or `"published"` (included)
- `canonical` — Must match your domain + slug pattern
- `tableOfContents` — Each `id` must match a section `id=` in body.html

### Add section anchors

Every major section needs an `id` attribute:

```html
<section id="my-section-name">
  <h2>Section Title</h2>
  ...
</section>
```

Then reference it in `meta.json`:
```json
{
  "tableOfContents": [
    { "id": "my-section-name", "title": "Section Title" }
  ]
}
```

Links like `/article/slug/#my-section-name` will jump to that section.

---

## 4. Publish an Article

1. **Write and review** your content in `body.html`
2. **Update metadata** in `meta.json`
3. **Change status** to `"published"`:
   ```json
   {
     "status": "published"
   }
   ```
4. **Set publication date** (optional but recommended):
   ```json
   {
     "datePublished": "2026-09-24"
   }
   ```
5. **Build the site**: `npm run build`
6. **Validate**: `npm run validate`
7. **Preview locally**: `npm run preview`
8. **Deploy**: `git add . && git commit -m "Add article: Title" && git push`

---

## 5. Edit an Existing Article

### Minor updates (typos, clarifications)
1. Edit `content/articles/[slug]/body.html`
2. Run `npm run build`
3. Deploy

Do **not** change `datePublished` for minor fixes.

### Substantial changes
1. Edit `body.html` and/or `meta.json`
2. Update `dateModified` in meta.json:
   ```json
   {
     "dateModified": "2026-10-15"
   }
   ```
3. Run `npm run build`
4. Deploy

### Change article URL (slug)
**Be very careful** — this breaks existing links unless you add a redirect.

1. Rename the article folder: `content/articles/new-slug/`
2. Update `slug` and `canonical` in `meta.json`
3. Add a redirect in `dist/_redirects`:
   ```
   /article/old-slug/  /article/new-slug/  301
   ```
4. Update any internal links referencing the old slug
5. Build and deploy

---

## 6. Add Article to the Book

**File:** `content/book.json`

Find the appropriate part and chapter list:

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
        },
        {
          "articleId": "your-new-article-id",
          "status": "published"
        }
      ]
    }
  ]
}
```

- Use the article's `id` field (not slug)
- Order determines display order
- Status should match article meta.json

### Planned chapters (not yet written)

```json
{
  "title": "Revenue tree analysis",
  "status": "planned"
}
```

These appear as plain text, not links.

---

## 7. Update Résumé or Portrait

### Update résumé PDF
1. Replace `dist/assets/vairag-akbari-resume.pdf` with your new PDF
2. Keep the same filename, or update `profile.json`:
   ```json
   {
     "resumePdf": "/assets/your-resume.pdf"
   }
   ```
3. Deploy

### Update portrait image
1. Replace `dist/assets/vairag-akbari.webp`
2. Keep aspect ratio approximately 4:5 (portrait orientation)
3. Optimize the image (WebP format recommended)
4. Update `profile.json` if you change the filename or alt text

---

## 8. Change Site Settings

### Domain or site name

**File:** `config/site.json`

```json
{
  "name": "Your Name",
  "domain": "https://yoursite.com",
  "contact": {
    "email": "you@example.com"
  }
}
```

After changing domain, update all canonical URLs in article meta.json files.

### Social profiles

**File:** `config/site.json`

```json
{
  "social": {
    "linkedin": "https://www.linkedin.com/in/your-profile",
    "twitter": "https://twitter.com/yourhandle",
    "github": null
  }
}
```

- Use full HTTPS URLs
- Set to `null` to hide a profile (it won't appear on site)
- Only add profiles you actually control

### Navigation

**File:** `config/navigation.json`

```json
{
  "main": [
    { "label": "Work", "href": "/#work" },
    { "label": "Articles", "href": "/article/" }
  ],
  "footer": [
    { "label": "LinkedIn", "href": "https://..." }
  ]
}
```

---

## 9. Workflow Summary

### Every time you edit content

```cmd
npm run build
npm run validate
npm run preview
```

- **Build** regenerates HTML from your content
- **Validate** checks for errors (broken links, missing fields, etc.)
- **Preview** lets you test locally before deploying

### When ready to deploy

```cmd
git add .
git commit -m "Descriptive message"
git push origin main
```

Netlify automatically deploys changes pushed to the main branch.

---

## 10. Common Issues

### Article not appearing on site
- Check `status` is `"published"` in meta.json
- Run `npm run build` again
- Check `npm run validate` for errors

### Broken section links
- Ensure section `id="something"` matches tableOfContents entry
- IDs are case-sensitive
- Use lowercase-with-hyphens

### Build errors
- Check JSON syntax (use a JSON validator)
- Ensure all required fields are present in meta.json
- Run `npm run validate` to see specific errors

### Changes not showing after deploy
- Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
- Check Netlify deploy log
- Verify you pushed to the correct branch

---

## Need Help?

- Run `npm run validate` to check for errors
- Check [PUBLISHING-CHECKLIST.md](PUBLISHING-CHECKLIST.md) before deploying
- Review [docs/](.) for other guides
- Contact: vairag.techwork@gmail.com

---

**Remember:** Always build, validate, and preview before deploying!
