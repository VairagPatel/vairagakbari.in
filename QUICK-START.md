# Quick Start Guide

Welcome to your portfolio publishing system! This guide gets you up and running in 10 minutes.

---

## ⚡ 1-Minute Overview

You have a **complete publishing system** that:
1. Generates your portfolio website (vairagakbari.in)
2. Creates platform-specific drafts for LinkedIn, X, Instagram, Medium, etc.
3. Tracks where you've published
4. Validates everything before deployment

**Your job:** Write content, follow the checklist, post manually.  
**System's job:** Generate HTML, metadata, distribution drafts, validate.

---

## 🚀 First Steps (5 minutes)

### 1. Test the System

```bash
# Build the site
npm run build

# Validate (should show ✅ All checks passed)
npm run validate

# Preview locally
npm run preview
# Visit http://localhost:8000
```

**What to check:**
- Homepage loads
- Article loads: http://localhost:8000/article/Job-To-Be-Done/
- Navigation works
- No console errors

Press Ctrl+C to stop the preview server.

### 2. Explore the Files

Open these in your editor:

**Your profile:**
- `content/profile.json` — Update intro, work examples, toolkit

**Site config:**
- `config/site.json` — Verify domain, social links, contact email

**Existing article:**
- `content/articles/job-to-be-done/meta.json` — See metadata structure
- `content/articles/job-to-be-done/body.html` — See content format

**Distribution example:**
- `distribution/job-to-be-done/linkedin-post.md` — Platform draft example

### 3. Update Your Info

Edit `content/profile.json`:

```json
{
  "work": [
    {
      "meta": "YOUR COMPANY · DATES",
      "title": "What you're doing",
      "description": "Details...",
      "tags": ["Skill 1", "Skill 2"]
    }
  ],
  "toolkit": {
    "inPractice": "Tools you use today",
    "learning": "What you're learning next"
  }
}
```

Rebuild:
```bash
npm run build
npm run preview
# Check http://localhost:8000
```

---

## 📝 Write Your Next Article (15 minutes)

### Create Article

```bash
npm run new-article
```

Answer prompts:
- Title: "Revenue Tree: Breaking Down Growth"
- Slug: (auto-suggested: revenue-tree)
- Description: "Learn how to decompose revenue..."
- Topic: Growth

### Write Content

**File:** `content/articles/revenue-tree/body.html`

```html
<section id="introduction">
  <h2>Introduction</h2>
  <p>Your content here.</p>
</section>

<section id="framework">
  <h2>The Framework</h2>
  <p>More content...</p>
</section>
```

### Update Metadata

**File:** `content/articles/revenue-tree/meta.json`

Update these fields:
- `tableOfContents`: Match section IDs
- `sources`: Add references
- `relatedArticles`: Reference other article IDs

### Publish

```json
{
  "status": "published",
  "datePublished": "2026-10-15T10:00:00.000Z"
}
```

Build and validate:
```bash
npm run build
npm run validate
npm run preview
```

Check http://localhost:8000/article/revenue-tree/

---

## 🌐 Deploy to Production (2 minutes)

```bash
git add .
git commit -m "Publish article: Revenue Tree"
git push origin main
```

Netlify deploys automatically (1-2 minutes).

**Verify:**
1. Visit https://vairagakbari.in/article/revenue-tree/
2. Check meta tags (view source)
3. Test on mobile

---

## 📱 Distribute to Platforms (30 minutes)

### 1. Verify Website Live

Check that https://vairagakbari.in/article/revenue-tree/ returns 200 and displays correctly.

### 2. Review Distribution Drafts

The system created drafts in `distribution/revenue-tree/`:

- `linkedin-post.md` — Concise insight + link
- `x-thread.md` — Numbered tweet thread
- `instagram-carousel.md` — Slide outline
- And more...

### 3. Choose Platforms

**Recommended start:**
- LinkedIn post (primary)
- X thread (secondary)
- Instagram (if you have visuals)

**Skip:**
- GFG, LeetCode (not applicable for business content)
- Platforms you don't actively use

### 4. Post Manually

**LinkedIn:**
1. Open `distribution/revenue-tree/linkedin-post.md`
2. Review and edit if needed
3. Copy draft
4. Post on LinkedIn
5. Save actual post URL

**Update log:**
`distribution/revenue-tree/publishing-log.json`

```json
{
  "platform": "linkedin",
  "status": "published",
  "publishedAt": "2026-10-15T11:00:00.000Z",
  "url": "https://www.linkedin.com/posts/actual-url",
  "notes": "Good engagement, 50+ likes"
}
```

Repeat for other chosen platforms.

---

## 📚 Full Workflow

```
1. Write article
   ↓
2. npm run build
   ↓
3. npm run validate
   ↓
4. npm run preview (test locally)
   ↓
5. git commit + push
   ↓
6. Netlify deploys
   ↓
7. Verify live URL
   ↓
8. Review distribution drafts
   ↓
9. Post to chosen platforms
   ↓
10. Update publishing log
```

---

## 🆘 Common Issues

### Build Fails

**Check:**
- JSON syntax errors in `meta.json` or config files
- Missing required fields (id, title, slug, status)
- Invalid characters in slug

**Fix:** Read error message, correct the file, rebuild.

### Article Not Showing

**Check:**
- Is `status` set to `"published"` in meta.json?
- Did you rebuild after changing status?

**Fix:**
```bash
# Edit meta.json, change status to "published"
npm run build
```

### Validation Errors

**Read the error message carefully.** It tells you:
- Which file has the problem
- What field is wrong
- What the issue is

Fix the source file, then rebuild.

### Preview Not Working

**Check:**
- Is port 8000 already in use?
- Did build complete successfully?

**Fix:**
```bash
# Stop other servers on port 8000
# Or use different port:
# Edit scripts/preview.js, change PORT

npm run build
npm run preview
```

---

## 📖 Next Steps

### Learn the System (30 minutes)

Read these in order:

1. **[EDITING-GUIDE.md](docs/EDITING-GUIDE.md)**  
   What to change and how

2. **[PUBLISHING-CHECKLIST.md](docs/PUBLISHING-CHECKLIST.md)**  
   Complete pre-publication workflow

3. **[PLATFORM-GUIDE.md](docs/PLATFORM-GUIDE.md)**  
   External publishing strategies

4. **[SEO-GUIDE.md](docs/SEO-GUIDE.md)**  
   Search optimization guidance

### Build Your Portfolio

**Month 1:**
- Write 2-3 core articles
- Post to website + LinkedIn
- Learn the workflow

**Month 2:**
- Add 2-3 more articles
- Experiment with X threads
- Try Instagram if you have visuals

**Month 3:**
- Complete one book part (3-4 chapters)
- Consider Medium excerpts
- Start Substack if you have audience

**Focus:** Useful content for your target audience (recruiters, founders, operators) > reaching every platform.

---

## ✅ System Health Check

Run this monthly:

```bash
# Validate everything
npm run validate

# Check for broken links
# (Manual check or add link checker later)

# Review published articles
# - Are examples still accurate?
- Are external links still working?
- Do dates need updating?
```

---

## 🎯 Success Metrics

**Don't obsess over:**
- Total page views
- Social media likes
- Follower counts

**Focus on:**
- Qualified profile visits (recruiters, founders)
- Thoughtful comments or questions
- Interview requests from readers
- Conversations started (DMs, emails)
- Résumé downloads from relevant people

---

## 🔗 Quick Reference

**Commands:**
```bash
npm run new-article    # Create article
npm run build          # Generate site
npm run validate       # Check for errors
npm run preview        # Test locally
git push origin main   # Deploy
```

**Files you edit:**
- `config/site.json` — Identity, social links
- `config/navigation.json` — Menu
- `content/profile.json` — Intro, work, toolkit
- `content/book.json` — Book structure
- `content/articles/{slug}/meta.json` — Article metadata
- `content/articles/{slug}/body.html` — Article content
- `distribution/{slug}/*.md` — Platform drafts

**Files you don't edit:**
- `dist/*` — Generated output (overwritten on build)

**Documentation:**
- [EDITING-GUIDE.md](docs/EDITING-GUIDE.md)
- [PUBLISHING-CHECKLIST.md](docs/PUBLISHING-CHECKLIST.md)
- [PLATFORM-GUIDE.md](docs/PLATFORM-GUIDE.md)
- [SEO-GUIDE.md](docs/SEO-GUIDE.md)
- [IMPLEMENTATION-SUMMARY.md](docs/IMPLEMENTATION-SUMMARY.md)

---

**You're ready! Start with one article, follow the checklist, and build from there.**

**Questions?** Check [EDITING-GUIDE.md](docs/EDITING-GUIDE.md) or [IMPLEMENTATION-SUMMARY.md](docs/IMPLEMENTATION-SUMMARY.md).
