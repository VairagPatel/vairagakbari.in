# Publishing Checklist

Use this checklist every time you publish or update an article.

---

## Pre-Publication (On Your Website)

### Content Review
- [ ] Article has a clear question, model, example, and takeaway
- [ ] All claims are accurate and verifiable
- [ ] Sources are cited with proper links
- [ ] Examples are illustrative (marked if not real customer interviews)
- [ ] No invented statistics, fake testimonials, or unverified credentials
- [ ] Tone is natural and concrete, not inflated

### Technical Checks
- [ ] `status: "published"` in meta.json
- [ ] All required fields complete in meta.json (title, description, canonical, etc.)
- [ ] Section IDs in body.html match tableOfContents in meta.json
- [ ] All internal links work
- [ ] All external links tested
- [ ] Images have proper alt text
- [ ] `datePublished` set (YYYY-MM-DD format)
- [ ] Canonical URL is correct and matches slug

### Build & Validate
- [ ] Run `npm run build` — no errors
- [ ] Run `npm run validate` — passes or only acceptable warnings
- [ ] Run `npm run preview` — article displays correctly
- [ ] Test on mobile width (resize browser or use dev tools)
- [ ] Test keyboard navigation (Tab through links, Enter to activate)
- [ ] Test with JavaScript disabled (content still readable)
- [ ] All section anchor links work (#sub-topic jumps to correct place)

---

## Deployment

- [ ] `git add .`
- [ ] `git commit -m "Add article: [Title]"` or `"Update article: [Title]"`
- [ ] `git push origin main`
- [ ] Wait for Netlify deploy (check deploy log if needed)

---

## Post-Deploy Verification

- [ ] Visit the live article URL
- [ ] Page loads correctly (no 404, no broken styles)
- [ ] Title and description are correct in browser tab
- [ ] Canonical meta tag points to this URL
- [ ] Open Graph tags present (check with View Source)
- [ ] All section anchors work on live site
- [ ] Mobile layout works (test on actual phone if possible)
- [ ] Sitemap includes the new article: `https://vairagakbari.in/sitemap.xml`
- [ ] Article appears in article index: `/article/`
- [ ] If part of book, appears in book page: `/book/`

---

## Distribution Preparation

Only proceed after website article is verified live.

### Create Distribution Folder
```cmd
mkdir distribution\[article-slug]
```

### Generate Platform Drafts

#### LinkedIn Post
- [ ] Create `distribution/[slug]/linkedin-post.md`
- [ ] Write concise insight (3-5 short paragraphs)
- [ ] Outline carousel concept (5-7 slides)
- [ ] Include link to canonical article
- [ ] Status: draft

#### LinkedIn Article (optional)
- [ ] Create `distribution/[slug]/linkedin-article.md`
- [ ] Write distinct professional angle
- [ ] Credit source with link
- [ ] Status: draft

#### Medium (optional)
- [ ] Create `distribution/[slug]/medium.md`
- [ ] Choose: full republish with canonical OR adapted excerpt
- [ ] If republishing, check Medium import tool first
- [ ] Status: draft

#### Other Platforms
- [ ] X/Twitter thread: `x-thread.md`
- [ ] Instagram carousel: `instagram-carousel.md`
- [ ] Substack digest: `substack-digest.md`
- [ ] Mark "skip" if platform doesn't fit the article

### Source Tracking
- [ ] Create `distribution/[slug]/source.json`:
  ```json
  {
    "articleId": "article-id",
    "revision": 1,
    "canonical": "https://vairagakbari.in/article/slug/",
    "lastGenerated": "2026-09-24",
    "websiteVerified": true
  }
  ```

---

## Platform Publishing

Do NOT proceed until:
1. Article is verified live on your website
2. Platform drafts are reviewed
3. You have decided which platforms to use

### LinkedIn
- [ ] Create carousel/document in design tool
- [ ] Export images with proper dimensions
- [ ] Write image alt text
- [ ] Review post text for clarity and tone
- [ ] Add UTM parameters to link if tracking: `?utm_source=linkedin&utm_medium=social&utm_campaign=article-slug`
- [ ] Post to LinkedIn
- [ ] Save actual published URL
- [ ] Log in `distribution/[slug]/publishing-log.json`

### Medium (if used)
- [ ] Use Medium import tool if republishing full article
- [ ] Set canonical to your original article
- [ ] Verify canonical appears in HTML after import
- [ ] OR publish adapted excerpt with clear source link
- [ ] Log publication URL and date

### Other Platforms
- [ ] Follow platform-specific guidelines
- [ ] Check community rules before posting
- [ ] Disclose affiliation where required
- [ ] Log all publication URLs

---

## Post-Publication

### Immediate (First 48 Hours)
- [ ] Monitor comments and respond thoughtfully
- [ ] Note objections or questions for future article improvements
- [ ] Check for technical issues reported by readers

### First Week
- [ ] Review engagement patterns (which platform drove readers?)
- [ ] Note any misunderstandings to clarify in article
- [ ] Update article if meaningful errors found

### Monthly Review
- [ ] Check article in Google Search Console (if verified)
- [ ] Review which articles readers actually read
- [ ] Check for broken links (internal and external)
- [ ] Identify which topics resonate for future articles

---

## For Article Updates

### Minor Fixes (Typos, Small Clarifications)
- [ ] Edit source files
- [ ] Build and deploy
- [ ] Do NOT change `datePublished`
- [ ] Do NOT need to re-announce

### Substantial Changes
- [ ] Edit source files
- [ ] Update `dateModified` in meta.json
- [ ] Build, validate, deploy
- [ ] Verify live
- [ ] Optional: note the update in distribution channels
- [ ] Update platform drafts to "needs-update" status
- [ ] Review if platform posts need correction

---

## Red Flags — Do Not Publish If:

- [ ] Article contains invented statistics or unverified claims
- [ ] Example is presented as real customer research but is hypothetical
- [ ] Claims software/framework proficiency you don't have
- [ ] Links to non-existent or unverified social profiles
- [ ] Canonical URL is incorrect or includes #fragment
- [ ] Duplicate article ID or slug exists
- [ ] `npm run validate` shows critical errors
- [ ] Article not visible on local preview
- [ ] Distribution folder will be in dist/ (must be excluded)

---

## Safe Rollback

If something goes wrong after deploy:

```cmd
git log --oneline
git revert [commit-hash]
git push origin main
```

Or restore previous version:
```cmd
git reset --hard [previous-commit-hash]
git push --force origin main
```

**Warning:** Force push overwrites history. Only use if absolutely necessary and recent.

---

## Monthly Maintenance Checklist

- [ ] Check all external links still work
- [ ] Review Google Search Console for issues (if verified)
- [ ] Update any outdated claims or statistics
- [ ] Review and respond to any late comments
- [ ] Check site loads correctly on current browsers
- [ ] Verify SSL certificate is active (auto-renewed by Netlify)

---

## Success Measures

Track what actually matters:

- Qualified profile visits (from recruiters, founders, operators)
- Résumé downloads or views
- Meaningful conversations started
- Interview requests
- Evidence your thinking resonated

Do NOT optimize only for:
- Impressions or page views alone
- Social media vanity metrics
- SEO rankings without qualified visitors

---

**Remember**: Publish on your website first. Distribution is secondary. Your portfolio is the source of truth.
