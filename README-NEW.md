# Vairag Akbari — Portfolio & Publishing System

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A maintainable static HTML publishing system for showcasing work, articles, and professional insights. Write once in structured content files, build to production-ready HTML, distribute across platforms.

**Live Site:** [https://vairagakbari.in](https://vairagakbari.in)  
**Version:** 2.0.0

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ ([download](https://nodejs.org))
- Git
- Text editor

### Essential Commands

```cmd
npm run build        # Generate the static site
npm run validate     # Check for errors before deploying
npm run preview      # Test locally at http://localhost:8000
npm run new-article  # Create a new article
```

### Deploy

```cmd
git add .
git commit -m "Your change description"
git push origin main
```

Netlify automatically deploys in 1-2 minutes.

---

## ✨ What's New in 2.0

**Build System**
- Static site generator (no dependencies)
- Single source of truth (content → HTML)
- Automatic validation before deploy
- Fast builds (<1 second)

**Content Management**
- Structured JSON + HTML content
- Draft/published status control
- Automatic reading time calculation
- New article creation tool

**Distribution Workflow**
- Platform-specific draft creation
- Publication tracking
- Source revision management
- Complete publishing guides

**Documentation**
- Step-by-step editing guide
- Publishing checklist
- Platform distribution strategies
- SEO best practices

→ **[See full implementation details](IMPLEMENTATION-SUMMARY.md)**

---

## 📁 Project Structure

```
vairagakbari.in/
├── config/
│   ├── site.json              # Domain, contact, social
│   └── navigation.json        # Navigation links
│
├── content/
│   ├── profile.json           # Homepage content
│   ├── book.json              # Book structure
│   └── articles/
│       └── [slug]/
│           ├── meta.json      # Article metadata
│           ├── body.html      # Article content
│           └── images/        # Article images
│
├── scripts/
│   ├── build.js               # Site generator
│   ├── validate.js            # Validation
│   ├── preview.js             # Local server
│   └── new-article.js         # Article creator
│
├── distribution/              # Private drafts (not deployed)
│   └── [slug]/
│       ├── linkedin-post.md
│       ├── medium.md
│       └── publishing-log.json
│
├── dist/                      # Generated output (deployed)
│   ├── index.html
│   ├── article/
│   ├── book/
│   ├── assets/
│   ├── sitemap.xml
│   └── robots.txt
│
└── docs/                      # Complete documentation
    ├── EDITING-GUIDE.md
    ├── PUBLISHING-CHECKLIST.md
    ├── PLATFORM-GUIDE.md
    └── SEO-GUIDE.md
```

---

## 📝 Content Workflows

### Create a New Article

```cmd
npm run new-article
```

Answer the prompts, then:
1. Edit `content/articles/[slug]/body.html`
2. Update `content/articles/[slug]/meta.json`
3. Change status to `"published"`
4. Build, validate, preview, deploy

→ **[See complete guide](docs/EDITING-GUIDE.md)**

### Update Your Profile

Edit `content/profile.json`, then:
```cmd
npm run build
npm run validate
npm run preview
git add . && git commit -m "Update profile" && git push
```

### Publish to Other Platforms

After website article is live:
1. Create `distribution/[slug]/` folder
2. Write platform-specific drafts
3. Review and approve
4. Post manually
5. Log publication URLs

→ **[See platform guide](docs/PLATFORM-GUIDE.md)**

---

## 🔍 How It Works

### 1. You Edit Content Files

**Profile:** `content/profile.json`  
**Articles:** `content/articles/[slug]/meta.json` + `body.html`  
**Book:** `content/book.json`

### 2. Build Generates HTML

`npm run build` reads content and generates:
- Homepage with work experience
- Article pages with metadata
- Article index and book pages
- Sitemap and robots.txt

### 3. Validation Checks Quality

`npm run validate` verifies:
- Required fields present
- No duplicates
- URLs correct
- Sections match table of contents
- No private content in public build

### 4. Preview Before Deploy

`npm run preview` serves the site locally so you can test:
- Mobile layout
- Links and anchors
- Reading flow
- Metadata

### 5. Deploy Automatically

Push to GitHub → Netlify deploys `dist/` folder.

---

## 📚 Documentation

**Start here:**
- **[Editing Guide](docs/EDITING-GUIDE.md)** — How to edit content
- **[Publishing Checklist](docs/PUBLISHING-CHECKLIST.md)** — How to publish articles

**Distribution:**
- **[Platform Guide](docs/PLATFORM-GUIDE.md)** — LinkedIn, Medium, X, etc.
- **[SEO Guide](docs/SEO-GUIDE.md)** — SEO foundations and expectations

**Reference:**
- **[Implementation Summary](IMPLEMENTATION-SUMMARY.md)** — Complete technical spec
- **[Deployment Guide](docs/DEPLOYMENT.md)** — Hosting setup
- **[DNS Setup](docs/BIGROCK-DNS-SETUP.md)** — Domain configuration

---

## ✅ Features

**Content**
- Structured content management
- Draft/published status
- Article metadata and SEO
- Automatic reading time
- Table of contents generation

**Build**
- Static HTML generation
- No external dependencies
- Fast builds (<1 second)
- Deterministic output
- Comprehensive validation

**SEO**
- Unique meta tags per page
- Canonical URLs
- Open Graph + Twitter Cards
- JSON-LD structured data
- Sitemap generation

**Distribution**
- Platform-specific drafts
- Publication tracking
- Source revision management
- Complete publishing guides

**Development**
- Local preview server
- Validation before deploy
- Article creation tool
- Git-based workflow

---

## 🛠️ Common Tasks

### Create Article
```cmd
npm run new-article
# Edit content/articles/[slug]/body.html and meta.json
# Set status to "published"
npm run build && npm run validate
git add . && git commit -m "Add article: Title" && git push
```

### Update Profile
```cmd
# Edit content/profile.json
npm run build && npm run validate
git add . && git commit -m "Update profile" && git push
```

### Add Article to Book
```cmd
# Edit content/book.json, add article ID to appropriate chapter
npm run build
git add . && git commit -m "Add article to book" && git push
```

### Validate Before Deploy
```cmd
npm run build
npm run validate
npm run preview
# Test in browser at http://localhost:8000
```

---

## 🔒 Security & Safety

**Input Validation**
- HTML escaping for all metadata
- JSON-LD script tag protection
- Slug format validation
- Path traversal prevention

**Content Protection**
- Draft articles excluded from build
- Distribution folder never deployed
- Validation enforces privacy
- No credentials in repo

**Backup & Recovery**
- Full Git history
- Easy rollback
- Reproducible builds
- No external data dependencies

---

## 📦 What's Automatic

The build system automatically:
- ✅ Generates all pages from content
- ✅ Applies consistent metadata
- ✅ Calculates reading times
- ✅ Renders navigation
- ✅ Creates sitemap
- ✅ Excludes drafts
- ✅ Escapes HTML
- ✅ Validates output

---

## ✏️ What You Control

You manually:
- Write article content
- Set publication status
- Update profile and config
- Create distribution drafts
- Approve platform posts
- Log publication URLs

---

## 🎯 Design Principles

**Static First**
- No client-side JavaScript required
- Fast page loads
- Works offline
- Easy hosting

**Build Time Generation**
- Templates resolved at build
- No runtime overhead
- Consistent output
- Easy validation

**Single Source of Truth**
- Content files are authoritative
- Build generates dist/
- Never edit both
- Repeatable builds

**Manual Publishing**
- No automatic cross-posting
- Human review required
- Platform-specific adaptation
- Prevents accidents

---

## 🚀 Tech Stack

**Content:** JSON + HTML  
**Build:** Node.js (vanilla, no deps)  
**Output:** Static HTML + CSS  
**Hosting:** Netlify  
**Version Control:** Git + GitHub

---

## 📈 Success Measures

Focus on qualified visitors, not vanity metrics:
- Profile visits from recruiters, founders, operators
- Résumé views from relevant people
- Meaningful conversations started
- Interview requests
- Evidence your thinking resonated

Don't optimize only for:
- Impressions or page views alone
- Social media vanity metrics
- SEO rankings without context

---

## 🆘 Troubleshooting

### Build fails
- Check JSON syntax (use a validator)
- Ensure Node.js 18+ installed: `node --version`
- Review error message from build script

### Validation fails
- Read error messages carefully
- Check required fields in meta.json
- Verify no duplicate IDs or slugs
- Run `npm run validate` for details

### Changes not showing
- Clear browser cache (Ctrl+Shift+R)
- Check Netlify deploy log
- Verify you pushed to main branch

### Need help?
- Run `npm run validate` for errors
- Check relevant guide in `docs/`
- Review IMPLEMENTATION-SUMMARY.md
- Email: vairag.techwork@gmail.com

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

---

## 👤 Author

**Vairag Akbari**  
Email: vairag.techwork@gmail.com  
Website: [vairagakbari.in](https://vairagakbari.in)  
LinkedIn: [vairag-akbari](https://www.linkedin.com/in/vairag-akbari)

---

## 📝 Version History

- **2.0.0** (2026-09-24) — Complete publishing system with build tools, validation, and distribution workflow
- **1.0.0** (2026-09-24) — Initial portfolio website

See [CHANGELOG.md](CHANGELOG.md) for detailed changes.

---

**Built with structure, validated with care, published with intent.**
