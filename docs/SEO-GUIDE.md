# SEO Guide

This guide explains the SEO foundations built into your portfolio and what actually matters for getting found.

---

## What's Already Implemented

Your site includes these SEO foundations:

✅ **Semantic HTML**
- Proper heading hierarchy (h1, h2, h3)
- Meaningful section elements
- Descriptive link text
- Accessible navigation and landmarks

✅ **Meta Tags**
- Unique title for every page
- Unique description for every page
- Canonical URLs
- Open Graph tags (LinkedIn, Facebook previews)
- Twitter Card tags
- Language declaration

✅ **Structured Data (JSON-LD)**
- Person/ProfilePage for homepage
- Article schema for blog posts
- Accurate author information

✅ **Technical Foundations**
- Clean URLs (/article/slug/ not /page?id=123)
- HTTPS enabled
- Mobile responsive design
- Fast load times (static HTML, minimal CSS, no JavaScript required)
- Sitemap.xml generated
- Robots.txt configured
- Custom 404 page

✅ **Content Structure**
- Internal links between related articles
- Fragment identifiers for subsections (#topic)
- Reading time and clear navigation
- Accessible without JavaScript

---

## What Actually Matters

### 1. Useful, Original Content

**Most important factor:**
- Write for your target audience (recruiters, founders, operators)
- Answer real questions
- Provide concrete examples
- Show your thinking, not just facts from elsewhere

**Your advantage:**
- Real work experience (Jumbo Homes, event operations)
- Specific examples (property search workflow, listing image process)
- Practical application of frameworks (JTBD in real estate)

### 2. Clear Page Titles and Descriptions

Each page needs unique, descriptive metadata:

**Good title:**
- "Jobs to Be Done: A Practical Framework with a Real-Estate Example | Vairag Akbari"
- Describes content, includes author name
- Under 60 characters (full title visible in results)

**Bad title:**
- "Article | My Site"
- "Jobs to Be Done"
- "JTBD Framework Guide for Product Managers SEO Keywords"

**Good description:**
- "Learn Jobs to Be Done through a property-search example, a visual decision flow, customer interview questions, and practical measures."
- Accurately summarizes the page
- Natural language, not keyword stuffing
- ~150-160 characters (guideline, not strict rule)

**Bad description:**
- Same as another page
- Just repeating title
- "Learn JTBD framework product management jobs to be done customer discovery product market fit..."

### 3. Earned Links and References

**What helps:**
- Other people linking to your article because it's useful
- Citations in relevant discussions
- Shares that lead to engaged readers

**What doesn't help as much as you'd think:**
- Social media shares alone (not direct ranking signals)
- Posting links to your own content everywhere
- Reciprocal "link exchange" schemes

**How to earn links:**
- Write genuinely useful content
- Answer real questions on Reddit, Quora (see Platform Guide)
- Contribute to discussions where your article adds value
- Build relationships in product/growth communities

### 4. Relevant Internal Links

Link related articles together:

```html
<p>This builds on <a href="/article/revenue-tree/">revenue tree analysis</a>.</p>
```

Benefits:
- Helps visitors discover related content
- Shows topic relationships to search engines
- Improves navigation

**Your site does this automatically:**
- Homepage features recent articles
- Article index lists all articles
- Book page groups articles by theme

---

## Understanding Canonicals

### What Canonical Tags Do

A canonical tag tells search engines: "This is the preferred version of this content."

Your site sets canonical tags automatically:
```html
<link rel="canonical" href="https://vairagakbari.in/article/Job-To-Be-Done/">
```

**Important facts:**
- Canonicals are signals, not commands
- Google can choose to ignore them
- They're most reliable on your own domain
- Cross-domain canonicals (pointing to a different site) are weaker signals

### Your Canonical URLs

**Include:**
- Protocol: `https://`
- Domain: `vairagakbari.in`
- Path: `/article/job-to-be-done/`
- Trailing slash (be consistent)

**Do NOT include:**
- Query parameters: `?utm_source=linkedin`
- Fragments: `#sub-topic`
- www if your main domain doesn't use it

**Example:**
- ✅ Canonical: `https://vairagakbari.in/article/Job-To-Be-Done/`
- ✅ UTM link: `https://vairagakbari.in/article/Job-To-Be-Done/?utm_source=linkedin`
- ✅ Fragment link: `https://vairagakbari.in/article/Job-To-Be-Done/#example`

### Fragments vs. Separate Pages

**Use fragments (#sub-topic) for:**
- Sections within one article
- Table of contents navigation
- Sharing specific sections

**Create separate pages for:**
- Topics that deserve a full article
- Content with its own title and description
- When you want that topic independently indexed

**Your articles correctly use fragments:**
- `/article/Job-To-Be-Done/#example` jumps to a section
- The canonical is `/article/Job-To-Be-Done/` (no fragment)
- Only the main page is indexed, not each fragment separately

---

## Syndication and Duplicate Content

### The Problem

If you publish the same content on multiple sites, search engines might:
- Choose one version to show (might not be yours)
- Split ranking signals between versions
- Not index all versions

### Current Google Guidance (2026)

From Google's syndication troubleshooting guidance:

> "If you syndicate your content, where a partner site reproduces your content but can't exclude it from indexing, the best approach is to ensure the original on your own site is indexed first."

**This means:**
1. Publish on your website first
2. Verify it's indexed before syndicating
3. If partner can add canonical, that helps
4. If partner can noindex, that's better
5. You can't guarantee syndicated copies won't outrank you

### Strategies for Your Articles

#### LinkedIn Posts (Recommended)
- Write a distinct short post with insight
- Link to full article
- No duplication risk

#### LinkedIn Articles
- A LinkedIn article is NOT technically your canonical
- Link to your original clearly
- Use for different angle, not full republish
- Or skip — posts work well

#### Medium — Two Safe Options

**Option 1: Import with Canonical**
- Use Medium import tool
- Medium attempts to add canonical pointing to your site
- **Verify canonical appears in HTML after import**
- Still not guaranteed, but better than nothing

**Option 2: Adapted Excerpt (Safer)**
- Write 400-800 words adapting your article
- Different opening and structure
- Link prominently to full article
- No duplication issue

**Which to choose:**
- If the article is your portfolio centerpiece → Excerpt approach
- If you want maximum Medium reach → Import with canonical, verify it

#### Substack
- Use for chapter digests and excerpts
- Link to full articles
- Not full republication

#### Other Platforms
- Social posts with links: no duplication risk
- Guest posts on other blogs: negotiate canonical or write new angle
- PDF downloads: not indexed, no issue

---

## Indexing and Ranking

### Getting Indexed

**Your responsibilities:**
1. Publish content on https://vairagakbari.in
2. Include in sitemap.xml (build script does this)
3. Ensure page returns 200 (not 404 or 500)
4. Link from other pages on your site (done automatically)

**Google's responsibilities:**
- Crawl your site (you can't force when)
- Decide what to index (not everything is guaranteed)
- Choose what to rank and where

**You can help:**
- Submit sitemap in Google Search Console (if verified)
- Use inspection tool to request indexing (no guarantee)
- Wait — indexing can take days or weeks

**Don't expect:**
- Instant indexing after publication
- Guaranteed rankings
- Fixed timeline ("index in 24 hours")

### Search Console (Optional but Helpful)

If you verify ownership:
1. Go to https://search.google.com/search-console
2. Add property: vairagakbari.in
3. Verify via DNS or HTML file method
4. Submit sitemap: https://vairagakbari.in/sitemap.xml

**What you can see:**
- Which pages are indexed
- Search queries that showed your site
- Indexing issues or errors
- Mobile usability problems

**What you can do:**
- Request indexing (crawl, not guarantee)
- Check for technical issues
- See what content resonates

---

## Common SEO Myths

### ❌ "Wait 24/48/72 hours for indexing"
**Reality:** There's no fixed timeline. Could be days, weeks, or never. Google crawls and indexes on its own schedule.

### ❌ "Duplicate content is a penalty"
**Reality:** Duplicate content might mean one version doesn't rank, but it's not a manual penalty. The issue is splitting signals or wrong version ranking.

### ❌ "Keywords in URL boost rankings"
**Reality:** Descriptive URLs help users understand content, which is valuable. Keyword-stuffing URLs doesn't manipulate rankings.

### ❌ "Meta keywords tag affects rankings"
**Reality:** Google hasn't used meta keywords for ranking since 2009. Don't bother.

### ❌ "More pages = better rankings"
**Reality:** More thin, low-quality pages can hurt. Fewer useful pages beats many shallow ones.

### ❌ "Canonical guarantees source attribution"
**Reality:** Canonicals are signals. Google can ignore them. They work best on your own domain.

### ❌ "Social shares directly boost rankings"
**Reality:** Shares can bring visitors and potentially links, but shares themselves aren't direct ranking signals.

### ❌ "You need JavaScript-free site for SEO"
**Reality:** Google can crawl JavaScript (though it's more expensive). Your site works without JS for speed and accessibility, which helps users and search engines.

---

## What to Actually Measure

### Meaningful Metrics
- Qualified visitors (recruiters, founders, operators visiting your profile)
- Engaged visitors (reading multiple articles, viewing résumé)
- Relevant queries (your name, specific topics you wrote about)
- Conversations started (emails, LinkedIn messages from readers)

### Vanity Metrics (Don't Obsess Over)
- Total impressions (shows how much, not how relevant)
- Rankings for every keyword (obsessing over positions)
- Domain authority scores (made up by tool companies, not Google)
- Page views without context (bots? Bounces? Engaged readers?)

---

## Ongoing SEO Maintenance

### Monthly
- Check external links still work
- Review Search Console for issues (if verified)
- Update any outdated claims or examples
- Note which articles resonate with qualified visitors

### When Updating Content
- Minor fixes: just update and republish
- Substantial changes: update `dateModified` in meta.json
- If changing URL: add redirect, update internal links

### Don't Do
- Obsessively check rankings daily
- Rewrite good content just to "refresh" it
- Add SEO landing pages with no real value
- Keyword-stuff meta descriptions
- Create thin content for every possible query

---

## Red Flags to Avoid

**Don't publish:**
- Empty SEO landing pages for keywords
- Separate pages for every subheading (when fragments work fine)
- Distribution drafts (must stay private)
- Duplicate articles with slightly different titles
- Fake engagement signals (purchased likes, fake reviews)

**Don't obsess over:**
- Exact keyword density
- Character limits as strict rules (guidelines, not laws)
- Scores from SEO tools (directionally helpful, not absolute truth)
- Instant indexing or ranking

---

## Your Competitive Advantage

You're not competing with generic "product management tips" sites. You're establishing credibility for founder's office and strategy roles.

**Your SEO advantages:**
- Specific real-world examples (Jumbo Homes, property workflow)
- Named frameworks applied practically (JTBD in real estate)
- Clear author identity (not anonymous blog)
- Portfolio showing your thinking
- Concrete work examples

**Focus on:**
- Being findable by name
- Ranking for specific frameworks you explain well
- Earning references from relevant discussions
- Building a reputation in product/growth communities

---

## Quick Wins

1. **Ensure all articles have unique, descriptive titles and descriptions** (build script does this)
2. **Link related articles** (automatically done)
3. **Submit sitemap to Search Console** (if you verify)
4. **Fix broken links** (run validate script monthly)
5. **Write more useful content** (most important)

---

## When to Get Help

**Consider SEO help if:**
- Site isn't indexed after 4+ weeks (check for technical issues)
- Search Console shows errors you don't understand
- You want to track specific business goals

**Don't pay for:**
- Promises of #1 rankings
- Guarantees of instant indexing
- Bulk link building schemes
- Keyword research for every possible phrase

---

## Resources

- **Google Search Central:** https://developers.google.com/search
- **Canonicalization:** https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- **Syndication troubleshooting:** https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting
- **JavaScript SEO:** https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics

---

**Remember:** Useful content for your target audience matters more than SEO tricks. Write for humans, build in public, earn attention through value.
