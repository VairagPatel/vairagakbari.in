# Vairag Akbari — Portfolio & Publishing System

[![Deploy Status](https://api.netlify.com/api/v1/badges/your-site-id/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A **production-ready static HTML publishing system** for portfolio articles, work examples, and professional insights. Features website-first publishing with platform-specific distribution workflows.

**Live Site:** [https://vairagakbari.in](https://vairagakbari.in)  
**System:** Static HTML generator with comprehensive SEO, metadata management, and multi-platform distribution support

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- Git
- Text editor (VS Code recommended)

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/VairagPatel/vairagakbari.in.git
cd vairagakbari.in

# Install dependencies (if needed)
npm install

# Build the site
npm run build

# Preview locally
npm run preview
# Visit http://localhost:8000
```

### Deployment

This site is automatically deployed via Netlify when changes are pushed to the `main` branch.

**Manual Deployment:**
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Netlify will automatically build and deploy within 1-2 minutes.

---

## 📁 Project Structure

```
config/                       # Site configuration (YOU EDIT)
  site.json                   # Identity, domain, social links, author
  navigation.json             # Navigation menu and footer links

content/                      # Source content (YOU EDIT)
  profile.json                # Homepage: intro, work, toolkit
  book.json                   # Book structure and chapter order
  articles/
    {slug}/
      meta.json               # Article metadata
      body.html               # Article HTML content
      images/                 # Article assets

scripts/                      # Build system
  build.js                    # Static site generator
  validate.js                 # Validation checks
  new-article.js              # Article creation tool
  preview.js                  # Local preview server

dist/                         # Generated output (DO NOT EDIT)
  index.html                  # Homepage
  article/                    # Article pages
    index.html                # Article archive
    {Slug}/index.html         # Individual articles
  book/index.html             # Book page
  assets/                     # Styles, images, PDFs
  sitemap.xml                 # SEO sitemap
  robots.txt                  # Crawler directives
  404.html                    # Error page

distribution/                 # Platform drafts (PRIVATE - never deployed)
  {slug}/
    source.json               # Revision tracking
    publishing-log.json       # Publication status per platform
    linkedin-post.md          # LinkedIn post draft
    linkedin-article.md       # LinkedIn article draft
    x-thread.md               # X/Twitter thread
    instagram-carousel.md     # Instagram carousel brief
    threads-posts.md          # Threads posts
    medium.md                 # Medium excerpt/import
    substack-digest.md        # Substack newsletter
    gfg-review.md             # GeeksforGeeks eligibility
    leetcode-review.md        # LeetCode review
    other-channels.md         # Pinterest, Reddit, etc.

docs/                         # Documentation
  EDITING-GUIDE.md            # What to change and how
  PUBLISHING-CHECKLIST.md     # Pre-publication workflow
  PLATFORM-GUIDE.md           # External publishing strategies
  SEO-GUIDE.md                # Search optimization
  IMPLEMENTATION-SUMMARY.md   # System overview
  DEPLOYMENT.md               # Deployment instructions
  ARTICLE-METADATA.example.json  # Metadata reference
```

---

## ✨ Key Features

### Core System
- **Static HTML Generation** - Separate pages from shared templates
- **Website-First Publishing** - Original content on vairagakbari.in first
- **Platform Distribution** - File-based workflow for LinkedIn, X, Instagram, Medium, Substack, and more
- **Publication Tracking** - Logs record where and when content is distributed
- **SEO Foundations** - Semantic HTML, unique metadata per page, sitemaps, canonicals
- **Validation & Preview** - Check for errors before deployment

### Technical
- **No Database** - File-based, version controlled
- **Fast Performance** - Minimal CSS, no JavaScript dependencies
- **Mobile Responsive** - Accessible design that works everywhere
- **HTTPS & CDN** - Automatic SSL and global edge delivery via Netlify
- **Security Headers** - XSS protection, clickjacking prevention
- **Deterministic Builds** - Same source always produces same output

---

## 📝 Content Management

### Create a New Article

```bash
npm run new-article
```

Answer the prompts:
- **Title**: Full article title
- **Slug**: URL-safe identifier (auto-suggested)
- **Description**: Short summary for meta tags
- **Topic**: Product, Growth, Analytics, etc.

This creates `content/articles/{slug}/` with:
- `meta.json` — Article metadata
- `body.html` — Article content (write here)
- `images/` — For diagrams and visuals

### Edit Article Content

**File:** `content/articles/{slug}/body.html`

Write using semantic HTML:

```html
<section id="introduction">
  <h2>Introduction</h2>
  <p>Your content here.</p>
</section>
```

**File:** `content/articles/{slug}/meta.json`

Update metadata (see `docs/ARTICLE-METADATA.example.json` for reference):

```json
{
  "id": "article-id",
  "title": "Article Title",
  "slug": "Article-Slug",
  "status": "published",
  "description": "Short summary",
  "canonical": "https://vairagakbari.in/article/Article-Slug/"
}
```

### Publish an Article

1. Set `"status": "published"` in `meta.json`
2. Set `datePublished` to current date (ISO 8601 format)
3. Build and validate:
   ```bash
   npm run build
   npm run validate
   ```
4. Preview locally: `npm run preview`
5. Deploy:
   ```bash
   git add .
   git commit -m "Publish article: Title"
   git push origin main
   ```

**Complete workflow:** See [`docs/PUBLISHING-CHECKLIST.md`](docs/PUBLISHING-CHECKLIST.md)

---

## 🌐 Deployment

### Production (Netlify)

**Automatic Deployment:**
- Push to `main` branch triggers automatic deployment
- Netlify builds and deploys within 1-2 minutes
- HTTPS and CDN automatically configured

**Manual Deployment via Netlify CLI:**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

**Configuration:**
- Deploy configuration: `netlify.toml`
- Build command: None (static site)
- Publish directory: `dist`

### Custom Domain

See [docs/BIGROCK-DNS-SETUP.md](docs/BIGROCK-DNS-SETUP.md) for complete instructions.

**Quick Setup:**
1. Add domain in Netlify: `vairagakbari.in`
2. Configure BigRock DNS with Netlify nameservers
3. Wait for DNS propagation (1-4 hours)
4. Enable HTTPS and Force HTTPS

---

## 📚 Distribution Workflow

### Website-First Publishing

1. **Write & publish on vairagakbari.in** (your canonical source)
2. **Verify article is live** and accessible
3. **Generate platform-specific drafts** (automatic templates provided)
4. **Review and approve** each platform's content
5. **Post manually** to external platforms
6. **Log publications** in `publishing-log.json`

### Platform Adaptation

The system generates distribution drafts for each article in `distribution/{slug}/`:

**Primary Channels:**
- LinkedIn post (concise insight + link)
- LinkedIn article (adapted professional piece)
- X/Twitter thread (numbered tweets)
- Instagram carousel (slide-by-slide outline)

**Secondary Channels:**
- Threads (conversational posts)
- Medium (excerpt or import)
- Substack (chapter digest)
- Pinterest, Reddit, Quora (optional)

**Platform Reviews:**
- GeeksforGeeks eligibility check (usually skip for non-technical)
- LeetCode review (only for coding/SQL content)

Each draft includes:
- Platform-specific format and tone
- Publishing instructions
- Link with UTM tracking parameters
- Status tracking
- Platform policy notes

**Complete guide:** [`docs/PLATFORM-GUIDE.md`](docs/PLATFORM-GUIDE.md)

---

## 🔍 SEO & Technical

### Built-in SEO Foundations

✅ **Metadata Management**
- Unique title and description per page
- Canonical URLs (no fragments, absolute HTTPS)
- Open Graph tags (LinkedIn, Facebook previews)
- Twitter Card tags
- JSON-LD structured data (Person, Article schemas)

✅ **Technical Foundations**
- Semantic HTML with proper heading hierarchy
- Clean URLs (`/article/Slug/` not `?id=123`)
- Mobile responsive and accessible
- Fast static HTML (no database queries)
- Sitemap.xml with all published articles
- Robots.txt configured
- HTTPS enforced

✅ **Content Structure**
- Internal links between related articles
- Fragment identifiers for subsections
- Breadcrumb navigation
- Reading time calculated

**Complete guide:** [`docs/SEO-GUIDE.md`](docs/SEO-GUIDE.md)

### Important SEO Notes

**Publishing First:**
- Publish on your website before syndicating
- Your site is the canonical source
- Cross-domain canonicals are signals, not guarantees

**Syndication Strategy:**
- LinkedIn: Use posts with links (no duplication)
- Medium: Prefer excerpts over full republication
- Always link back to your original

**Honest Expectations:**
- No "wait 24 hours" indexing guarantee
- Duplicate content might split ranking signals
- Focus on useful content for target audience (recruiters, founders)

---

## 🛠️ Development Commands

```bash
# Create new article (interactive)
npm run new-article

# Build site (regenerates dist/)
npm run build

# Validate for errors
npm run validate

# Preview locally
npm run preview
# Visit http://localhost:8000
```

### Build Process

The build script (`scripts/build.js`):
1. Reads configuration and content
2. Finds published articles (status !== "draft")
3. Generates homepage with featured articles
4. Creates article index and individual article pages
5. Builds book page linking to articles
6. Renders unique metadata for each page
7. Generates sitemap.xml and robots.txt
8. Copies static assets

**Output:** Complete static site in `dist/` ready to deploy

### Validation

The validate script (`scripts/validate.js`) checks:
- Configuration files exist and parse
- Required metadata present
- No duplicate IDs, slugs, or canonicals
- Published articles have content
- Section IDs match table of contents
- Date formats valid (ISO 8601)
- Book references valid article IDs
- distribution/ folder not in dist/
- HTML output has required elements

Run before every deployment!

---

## 📚 Complete Documentation

| Guide | Purpose |
|-------|---------|
| [EDITING-GUIDE.md](docs/EDITING-GUIDE.md) | What to change and how (profile, articles, metadata) |
| [PUBLISHING-CHECKLIST.md](docs/PUBLISHING-CHECKLIST.md) | Step-by-step pre-publication workflow |
| [PLATFORM-GUIDE.md](docs/PLATFORM-GUIDE.md) | External publishing strategies (LinkedIn, X, Medium, etc.) |
| [SEO-GUIDE.md](docs/SEO-GUIDE.md) | Search optimization and honest expectations |
| [IMPLEMENTATION-SUMMARY.md](docs/IMPLEMENTATION-SUMMARY.md) | Complete system overview |
| [DEPLOYMENT.md](docs/DEPLOYMENT.md) | Deployment instructions (Netlify, DNS) |
| [ARTICLE-METADATA.example.json](docs/ARTICLE-METADATA.example.json) | Article metadata reference |

**Start here:** [EDITING-GUIDE.md](docs/EDITING-GUIDE.md) — Learn what to edit and how

---

## 🎯 Common Tasks

### Update Profile or Work Examples

**File:** `content/profile.json`

Edit introduction, work examples, toolkit:
```bash
# Edit the file
vim content/profile.json  # or use your editor

# Rebuild
npm run build
```

### Add Social Links

**File:** `config/site.json`

Update the `social` section:
```json
{
  "social": {
    "linkedin": "https://www.linkedin.com/in/vairag-akbari",
    "twitter": "https://x.com/vairaglife",
    "instagram": "https://instagram.com/growthwithvairag"
  }
}
```

### Update Résumé

Replace the file:
```bash
# Copy your new PDF
cp /path/to/new-resume.pdf dist/assets/vairag-akbari-resume.pdf

# Commit and deploy
git add dist/assets/vairag-akbari-resume.pdf
git commit -m "Update résumé"
git push
```

### Add Article to Book

**File:** `content/book.json`

Reference by article ID:
```json
{
  "chapters": [
    {
      "articleId": "job-to-be-done",
      "status": "published"
    }
  ]
}
```

Build automatically links to the article page.

---

## 🚀 Deployment

### Netlify (Automatic)

**Trigger:** Push to `main` branch

**Process:**
1. Netlify detects push
2. Runs build (publishes `dist/`)
3. Deploys to https://vairagakbari.in
4. HTTPS and CDN automatic

**Configuration:** `netlify.toml`

### Manual Verification

After deployment:
1. Visit article URL
2. Check meta tags (view source)
3. Test section anchors
4. Verify mobile layout
5. Check navigation and links

**Full checklist:** [PUBLISHING-CHECKLIST.md](docs/PUBLISHING-CHECKLIST.md)

---

## 📊 What Makes This System Production-Ready

### ✅ Reliability
- **Deterministic builds**: Same source = same output
- **Validation checks**: Catches errors before deployment
- **Version control**: Git tracks every change
- **Rollback capability**: Revert commits if needed

### ✅ Security
- **No credentials in code**: All secrets external
- **distribution/ never deployed**: Private drafts stay private
- **Security headers**: XSS, clickjacking protection (via netlify.toml)
- **HTTPS enforced**: All traffic secure

### ✅ Performance
- **Static HTML**: No database queries
- **Minimal dependencies**: Fast load times
- **CDN delivery**: Netlify edge network
- **Optimized assets**: Compressed images, minimal CSS

### ✅ Maintainability
- **Clear file structure**: Easy to find and edit
- **Comprehensive documentation**: Step-by-step guides
- **Separation of concerns**: Content separate from templates
- **Automated builds**: Generate output from source

### ✅ Scalability
- **Add articles without editing 10 files**: Build handles navigation, listings
- **Platform-agnostic content**: Write once, adapt for many channels
- **Future-proof**: Portable HTML works anywhere

---

## 🤝 Workflow Philosophy

### Website-First
Your portfolio at vairagakbari.in is the source of truth. External platforms are distribution channels, not replacements.

### Manual Quality Control
Distribution drafts are generated for review. You approve and post manually, ensuring quality and platform fit.

### Honest Attribution
All external posts link back to your original article. Clear source credit, not deceptive syndication.

### SEO Realism
Proper metadata and structure help discoverability. No tricks or guarantees—just useful content for your target audience.

---

## 🎯 Success Criteria

You can consider the system working when:

- [x] New articles created with `npm run new-article`
- [x] Build generates independent HTML pages
- [x] Each page has unique, proper metadata
- [x] Validation catches common errors
- [x] Preview shows expected output
- [x] Drafts excluded from production
- [x] Distribution templates ready for all major platforms
- [x] Publishing log tracks external posts
- [x] Documentation complete and accurate
- [x] Deploy without breaking existing URLs

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | Check console error, verify JSON syntax in config/content files |
| Article not appearing | Ensure `"status": "published"` in meta.json, rebuild |
| URL broken (404) | Verify slug matches folder name, check canonical URL, rebuild |
| Metadata incorrect | Edit meta.json, rebuild; don't edit dist/ directly |
| Section anchor not working | Check section `id` matches `tableOfContents` entry |
| Validation errors | Read error message, fix source file, rebuild |

**Need more help?** See troubleshooting section in [`EDITING-GUIDE.md`](docs/EDITING-GUIDE.md)

---

## 📋 Pre-Deployment Checklist

Before deploying:

```bash
# 1. Build
npm run build

# 2. Validate
npm run validate

# 3. Preview (optional)
npm run preview
# Check http://localhost:8000

# 4. Commit and push
git add .
git commit -m "Your message"
git push origin main
```

**Complete checklist:** [`PUBLISHING-CHECKLIST.md`](docs/PUBLISHING-CHECKLIST.md)

---

## 🔗 Project Status

- ✅ **System:** Production-ready static publishing system
- ✅ **Website:** Live at https://vairagakbari.in
- ✅ **Deployment:** Netlify automatic deployment configured
- ✅ **HTTPS:** Enabled with automatic SSL
- ✅ **SEO:** Metadata, sitemap, robots.txt configured
- ✅ **Distribution:** Platform templates created
- ✅ **Documentation:** Comprehensive guides complete

**Next steps:**
1. Write your next article
2. Follow the publishing checklist
3. Build distribution drafts
4. Post to chosen platforms
5. Track and learn what works

---

## 🤝 Contributing

This is a personal portfolio system. If you spot issues or have suggestions:

1. Open an issue on GitHub
2. Describe the problem or suggestion
3. Include relevant files or errors

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👤 Author

**Vairag Akbari**  
Strategy, growth & product operator

- Website: [vairagakbari.in](https://vairagakbari.in)
- Email: vairag.techwork@gmail.com
- LinkedIn: [linkedin.com/in/vairag-akbari](https://www.linkedin.com/in/vairag-akbari)
- X: [@vairaglife](https://x.com/vairaglife)
- Instagram: [@growthwithvairag](https://instagram.com/growthwithvairag)

---

## 🔧 Technical Details

**Built with:**
- Node.js static site generator
- Semantic HTML5
- Modern CSS
- Zero JavaScript dependencies for core functionality
- Netlify for hosting and CDN

**System designed:** October 2026  
**Implementation:** Master Prompt specification  
**Purpose:** Professional portfolio with comprehensive publishing workflow

---

**Start building:** [EDITING-GUIDE.md](docs/EDITING-GUIDE.md) →
