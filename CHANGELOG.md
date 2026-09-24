# Changelog

All notable changes to the Vairag Akbari Portfolio Website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2026-09-24

### Added - Complete Publishing System Implementation

**Build System**
- Static site generator using vanilla Node.js (no external dependencies)
- `npm run build` — generates complete site from content JSON + HTML
- `npm run validate` — comprehensive error checking and validation
- `npm run preview` — local development server
- `npm run new-article` — guided article creation with templates
- Automatic reading time calculation
- Sitemap and robots.txt generation
- 404 page generation

**Content Structure**
- Structured content management in `config/` and `content/` folders
- `config/site.json` — domain, contact, verified social profiles
- `config/navigation.json` — header and footer links
- `content/profile.json` — homepage intro, work experience, toolkit
- `content/book.json` — book structure and chapter organization
- `content/articles/[slug]/meta.json` — per-article metadata
- `content/articles/[slug]/body.html` — article content (semantic HTML)
- Draft/published status control

**Distribution System**
- Private `distribution/` folder for platform-specific drafts
- Platform templates (LinkedIn, Medium, X, Instagram, etc.)
- Publication tracking with `publishing-log.json`
- Source revision management
- Validation ensures distribution never deployed publicly

**Documentation** (2,500+ lines)
- `docs/EDITING-GUIDE.md` — Complete content editing workflows
- `docs/PUBLISHING-CHECKLIST.md` — Publication process and verification
- `docs/PLATFORM-GUIDE.md` — Platform-by-platform distribution strategies
- `docs/SEO-GUIDE.md` — SEO foundations, canonicals, realistic expectations
- `docs/README.md` — Documentation index and quick reference
- `IMPLEMENTATION-SUMMARY.md` — Complete technical specification

**Validation & Safety**
- Duplicate ID, slug, and canonical detection
- Required field validation
- Slug format checking (lowercase, hyphens, no path traversal)
- Section ID vs table of contents verification
- HTML structure validation
- Distribution folder protection
- Credential file detection

**SEO & Metadata**
- Page-specific meta tags (title, description)
- Canonical URLs (without fragments)
- Open Graph tags
- Twitter Card metadata
- JSON-LD structured data (ProfilePage, Article)
- Proper HTML escaping and sanitization
- Sitemap.xml with all published pages

### Changed

**Architecture**
- Migrated from manual HTML editing to build-time generation
- Single source of truth (content files → generated HTML)
- Separation of content (JSON/HTML) from presentation (templates)
- Build-time template resolution (not runtime)

**Workflow**
- Articles now created with `npm run new-article` command
- Content edited in structured JSON + semantic HTML
- Build/validate/preview before deploy
- Draft status controls public visibility

### Preserved

**Design & Content**
- All existing CSS (`dist/assets/style.css`) unchanged
- Typography, colors, layout maintained
- Homepage structure and copy preserved
- Jobs-To-Be-Done article migrated to new system
- Work experience and toolkit content
- `/article/Job-To-Be-Done/` URL preserved exactly
- Section anchors (`#sub-topic`) work identically
- Résumé and portrait assets

**Deployment**
- Netlify hosting configuration maintained
- Domain setup (vairagakbari.in) unchanged
- Security headers preserved
- CDN and caching rules intact
- Automatic deployment on push to main

### Technical Details

**Dependencies:** None (Node.js built-ins only)  
**Node Version Required:** 18+  
**Build Time:** <1 second  
**Code Added:**
- build.js: 550 lines
- validate.js: 290 lines  
- new-article.js: 150 lines
- preview.js: 80 lines
- Documentation: 2,500+ lines

### Migration Notes

**Existing Content Migration:**
- Jobs-To-Be-Done article converted to new structure
- Content extracted to `content/articles/job-to-be-done/`
- Metadata formalized in meta.json
- Body content in semantic HTML
- All URLs and anchors preserved

**Backward Compatibility:**
- All existing URLs work identically
- Section anchors preserved
- External links to your site unaffected
- Same deployment workflow (git push)

### Removed

- Manual HTML editing requirement (now generated)
- Template copying workflow (now automated)
- Inconsistent metadata across pages (now templated)

---

## [1.0.0] - 2026-09-24

### Added
- Initial production release
- Complete portfolio website with articles and work experience
- Jobs-To-Be-Done article as first content piece
- Semantic HTML structure with SEO optimization
- Responsive CSS design (mobile-first)
- Custom 404 error page
- Sitemap.xml for search engines
- Robots.txt for crawler directives
- Open Graph meta tags for social sharing
- Structured data (JSON-LD) for rich search results
- Netlify deployment configuration
- Security headers (X-Frame-Options, CSP, etc.)
- Asset caching strategy
- Comprehensive documentation in `/docs` folder
- BigRock DNS setup guide
- Content distribution strategy guide
- MIT License
- Professional README with badges and structure
- GitHub repository with clean commit history

### Infrastructure
- Deployed on Netlify with automatic CI/CD
- Custom domain: vairagakbari.in
- HTTPS enabled with automatic SSL certificate
- CDN distribution via Netlify edge network
- BigRock domain registrar integration

### Documentation
- Main README.md with quick start guide
- docs/DEPLOYMENT.md - Complete deployment guide
- docs/BIGROCK-DNS-SETUP.md - DNS configuration
- docs/DISTRIBUTION.md - Content publishing strategy
- docs/verify-github.md - Repository verification
- docs/README.md - Documentation index
- CHANGELOG.md - Version history (this file)
- LICENSE - MIT License

### Repository
- Clean Git history with proper attribution
- Production-level .gitignore
- Organized project structure
- Template system for new articles

---

## [Unreleased]

### Planned
- Google Search Console verification
- Additional articles and content
- Analytics integration (when ready)
- Newsletter subscription (optional)
- Contact form (if needed)

---

## Version History

- **2.0.0** (2026-09-24) - Complete publishing system with build tools, validation, distribution workflow, and comprehensive documentation
- **1.0.0** (2026-09-24) - Initial production release

---

**Maintained by:** Vairag Akbari (vairag.techwork@gmail.com)  
**Repository:** https://github.com/VairagPatel/vairagakbari.in
