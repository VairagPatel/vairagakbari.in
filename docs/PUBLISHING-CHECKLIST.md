# Publishing Checklist

Use this checklist before publishing a new article or major update.

---

## Pre-Publication Checklist

### 1. Content Review

- [ ] Article title is accurate and descriptive
- [ ] Description summarizes the article clearly (< 160 characters ideal)
- [ ] Lead paragraph hooks the reader
- [ ] Sections have clear headings
- [ ] Section IDs match `tableOfContents` in `meta.json`
- [ ] Sources are cited with text and URL
- [ ] Related articles (if any) reference correct article IDs
- [ ] No placeholder text ("TODO", "FIXME", "DRAFT")
- [ ] Diagrams/images have descriptive alt text
- [ ] Facts and statistics are accurate
- [ ] Reading tone matches site style (direct, factual, helpful)

### 2. Metadata Check

- [ ] `id` is unique and stable
- [ ] `slug` is URL-safe (lowercase, hyphens, no spaces)
- [ ] `status` is set to `"published"`
- [ ] `datePublished` is set (ISO 8601 format)
- [ ] `canonical` matches expected URL pattern
- [ ] `canonical` has no fragment (#)
- [ ] `topic` is accurate
- [ ] `chapterNumber` and `partNumber` match book structure (if applicable)
- [ ] `relatedArticles` reference existing article IDs
- [ ] `tableOfContents` entries match section IDs in body.html

### 3. Build and Validate

```bash
npm run build
```

- [ ] Build completed without errors
- [ ] No missing files or broken references

```bash
npm run validate
```

- [ ] Validation passed with no errors
- [ ] Warnings reviewed and addressed (or documented as acceptable)

### 4. Local Preview

```bash
npm run preview
```

- [ ] Homepage displays correctly
- [ ] Article appears in article index
- [ ] Article page loads correctly
- [ ] All section anchors work (`/article/{slug}/#section-id`)
- [ ] Images load correctly
- [ ] Internal links work
- [ ] Résumé link works
- [ ] Contact links work
- [ ] Navigation works
- [ ] Footer displays correctly
- [ ] Mobile layout is readable (test in browser DevTools)
- [ ] No console errors in browser

### 5. SEO and Metadata

Check generated HTML in `dist/article/{slug}/index.html`:

- [ ] `<title>` is unique and descriptive
- [ ] `<meta name="description">` is present and useful
- [ ] `<link rel="canonical">` points to correct URL
- [ ] Open Graph tags present: `og:title`, `og:description`, `og:url`, `og:type`
- [ ] Twitter card tags present
- [ ] JSON-LD structured data is valid (check syntax)
- [ ] No duplicate title tags
- [ ] No duplicate meta descriptions
- [ ] `datePublished` and `dateModified` in JSON-LD (if set)

### 6. Sitemap and Robots

- [ ] Article URL is in `dist/sitemap.xml`
- [ ] `robots.txt` allows crawling
- [ ] No distribution folder references in `dist/`

### 7. Book Integration (if applicable)

- [ ] Article added to `content/book.json` with correct article ID
- [ ] Book page (`/book/`) displays article link correctly
- [ ] Chapter number displayed correctly

---

## Publication Steps

### 8. Deploy to Production

Follow your deployment method (Netlify, manual FTP, etc.):

```bash
git add .
git commit -m "Publish article: {title}"
git push origin main
```

- [ ] Deployment triggered
- [ ] Deployment completed successfully
- [ ] No build errors in deployment log

### 9. Verify Live Site

Visit `https://vairagakbari.in/article/{slug}/` and check:

- [ ] Article loads (200 response, not 404)
- [ ] All sections and anchors work
- [ ] Images load
- [ ] Internal links work
- [ ] Meta tags correct (view source)
- [ ] Mobile rendering correct
- [ ] No broken links

Visit homepage:

- [ ] New article appears in featured/recent articles
- [ ] Article count updated

Visit `/article/`:

- [ ] New article in article index

Visit `/book/` (if applicable):

- [ ] Chapter link appears and works

Check sitemap:

- [ ] Visit `https://vairagakbari.in/sitemap.xml`
- [ ] New article URL present

### 10. Test External Links

- [ ] Share URL on LinkedIn (check preview card)
- [ ] Share URL on X/Twitter (check preview card)
- [ ] Open Graph image displays correctly (if set)
- [ ] Share on WhatsApp (check preview) — optional

---

## Post-Publication: Distribution

### 11. Prepare Distribution Drafts

Only AFTER the article is live on your website:

1. Create distribution folder:
   ```
   distribution/{article-slug}/
   ```

2. Update or create these files:
   - [ ] `source.json` (article ID, canonical URL, date generated)
   - [ ] `publishing-log.json` (mark website as published)
   - [ ] `linkedin-post.md`
   - [ ] `linkedin-article.md`
   - [ ] `x-thread.md`
   - [ ] `instagram-carousel.md`
   - [ ] `threads-posts.md`
   - [ ] `medium.md`
   - [ ] `substack-digest.md`
   - [ ] `gfg-review.md` (mark skip if not suitable)
   - [ ] `leetcode-review.md` (mark skip if not suitable)
   - [ ] `other-channels.md`

3. Review each draft:
   - [ ] Derived from published website article
   - [ ] Contains clear link to canonical source
   - [ ] Provides standalone value
   - [ ] Platform-appropriate format and tone
   - [ ] UTM parameters correct

### 12. Approve and Publish External Channels

For each platform you choose to use:

**LinkedIn Post**:
- [ ] Draft reviewed and approved
- [ ] Visual created (if using carousel)
- [ ] Posted on LinkedIn
- [ ] URL added to `publishing-log.json`
- [ ] Status updated to "published"

**X Thread**:
- [ ] Draft reviewed and approved
- [ ] Thread posted
- [ ] First tweet URL added to `publishing-log.json`
- [ ] Status updated to "published"

**Instagram**:
- [ ] Carousel designed and exported
- [ ] Caption approved
- [ ] Posted on Instagram
- [ ] Status updated to "published"

**Medium** (if using):
- [ ] Option selected (excerpt vs full import)
- [ ] Draft approved
- [ ] Posted on Medium
- [ ] URL added to `publishing-log.json`
- [ ] Status updated to "published"

Repeat for other platforms as needed.

### 13. Update Publishing Log

After each external publication, update `distribution/{slug}/publishing-log.json`:

```json
{
  "platform": "linkedin",
  "status": "published",
  "sourceRevision": "initial",
  "approvedAt": "2026-10-15T09:00:00.000Z",
  "publishedAt": "2026-10-15T10:30:00.000Z",
  "url": "https://www.linkedin.com/posts/actual-post-url",
  "utmUrl": "https://vairagakbari.in/article/Job-To-Be-Done/?utm_source=linkedin&utm_medium=social&utm_campaign=job-to-be-done",
  "notes": "Posted as text + link. Good engagement."
}
```

---

## Monitoring and Updates

### 14. Track Performance (Optional)

If you have analytics:

- [ ] Article page views tracked
- [ ] Traffic sources identified
- [ ] Bounce rate acceptable
- [ ] Time on page reasonable
- [ ] External shares tracked

### 15. Google Search Console (if configured)

- [ ] Submit URL for indexing (optional, crawlers will find it)
- [ ] Check indexing status after a few days
- [ ] Review search appearance
- [ ] Check for crawl errors

### 16. Update Article if Needed

If you need to make changes:

- [ ] Edit source files (body.html, meta.json)
- [ ] Update `dateModified` in meta.json
- [ ] Keep `datePublished` unchanged
- [ ] Rebuild and validate
- [ ] Redeploy
- [ ] Mark external distribution drafts as "needs-update" if substantial changes

---

## Rollback Plan

If something goes wrong:

### Quick Fixes
- [ ] Fix typo/error in source file
- [ ] Rebuild
- [ ] Redeploy

### Unpublish Article
- [ ] Change `status` to `"draft"` in meta.json
- [ ] Rebuild (article disappears from listings)
- [ ] Redeploy
- [ ] Article page still exists at URL (returns 404 after deploy)

### Revert Deployment
- [ ] Use Git to revert: `git revert HEAD`
- [ ] Push revert: `git push origin main`
- [ ] Netlify redeploys previous version

---

## Checklist for Updates

If updating an existing published article:

- [ ] Content changes reviewed
- [ ] `dateModified` updated in meta.json
- [ ] `datePublished` unchanged
- [ ] Slug unchanged (or redirect set up)
- [ ] Rebuilt and validated
- [ ] Redeployed
- [ ] Live site checked
- [ ] External drafts marked "needs-update" if necessary

---

## Quick Command Reference

```bash
# Create new article
npm run new-article

# Build site
npm run build

# Validate
npm run validate

# Preview locally
npm run preview

# Deploy (if using Git)
git add .
git commit -m "Publish article: {title}"
git push origin main
```

---

## Notes

- **Website first**: Always publish on your website before external channels
- **Verify live**: Check the live URL before sharing externally
- **Source of truth**: Your website is the canonical source
- **Distribution is manual**: Review and approve each platform draft before posting
- **Logs are local**: Keep publishing logs updated for your records

---

**Related Guides**:
- [Editing Guide](EDITING-GUIDE.md) — How to change content
- [Platform Guide](PLATFORM-GUIDE.md) — External publishing strategies
- [SEO Guide](SEO-GUIDE.md) — Search optimization
- [Deployment Guide](DEPLOYMENT.md) — Deployment instructions
