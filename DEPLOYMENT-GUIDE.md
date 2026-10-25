# Portfolio Deployment Guide

## Quick Deploy to Production

Your portfolio is ready for immediate deployment! Here's how:

### Method 1: Automatic Netlify Deployment (Recommended)

```bash
# 1. Commit all changes
git add .
git commit -m "Portfolio update: Add SnapCart, Rydex, Health Map flagship projects"

# 2. Push to main branch
git push origin main
```

**That's it!** Netlify will automatically:
- Detect the push
- Build the site (publishes `dist/` folder)
- Deploy to https://vairagakbari.in
- Enable HTTPS and CDN
- Complete in 1-2 minutes

### Method 2: Manual Netlify Deployment

```bash
# Install Netlify CLI (if not already installed)
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to production
netlify deploy --prod
```

---

## Pre-Deployment Verification

### Local Preview

```bash
# Start local preview server
npm run preview

# Visit in browser
# http://localhost:8000
```

### Check These Pages

- ✅ **Homepage** (`/`) — Projects, FDE section, experience
- ✅ **SnapCart** (`/projects/snapcart/`) — Full case study
- ✅ **Rydex** (`/projects/rydex/`) — Full case study  
- ✅ **Health Map** (`/projects/health-map/`) — Planning stage notice
- ✅ **Articles** (`/article/`) — Existing articles preserved
- ✅ **Book** (`/book/`) — Book structure intact

### Verify Content

**Search for "Jumbo" or "Tara":**
```bash
# Windows (PowerShell)
Select-String -Path dist\*.html -Pattern "Jumbo|Tara" -Recurse

# Should return: NO MATCHES
```

**Check Project Pages Load:**
- http://localhost:8000/projects/snapcart/
- http://localhost:8000/projects/rydex/
- http://localhost:8000/projects/health-map/

**Verify Mobile Responsive:**
- Open browser developer tools (F12)
- Toggle device toolbar
- Test on mobile widths (375px, 768px, 1024px)

---

## What Gets Deployed

### Generated Files (dist/)
```
dist/
├── index.html                          # Updated homepage
├── projects/
│   ├── snapcart/index.html            # SnapCart case study
│   ├── rydex/index.html               # Rydex case study
│   └── health-map/index.html          # Health Map case study
├── article/
│   ├── index.html                      # Article archive
│   └── Job-To-Be-Done/index.html      # Existing article
├── book/index.html                     # Book page
├── assets/
│   ├── style.css                       # Enhanced with project styles
│   ├── vairag-akbari-resume.pdf       # Resume
│   └── vairag-akbari.webp             # Portrait
├── sitemap.xml                         # Updated with projects
├── robots.txt                          # Search crawler directives
└── 404.html                            # Error page
```

### NOT Deployed
```
content/                 # Source content (stays in repo)
scripts/                 # Build scripts (stays in repo)
distribution/            # Private drafts (never deployed)
docs/                    # Documentation (never deployed)
node_modules/            # Dependencies (never deployed)
```

---

## Post-Deployment Verification

### 1. Check Live Site

Visit: **https://vairagakbari.in**

Verify:
- ✅ Homepage loads with new positioning
- ✅ Three project cards visible
- ✅ FDE section present
- ✅ Navigation updated (Projects, FDE, Experience, Writing, Contact)
- ✅ No Jumbo Homes references visible

### 2. Test Project Pages

- https://vairagakbari.in/projects/snapcart/
- https://vairagakbari.in/projects/rydex/
- https://vairagakbari.in/projects/health-map/

Verify:
- ✅ All three pages load
- ✅ Health Map shows "Planning Stage" notice
- ✅ Technical metrics display correctly
- ✅ Back buttons work

### 3. Check SEO

**Google Search Console:**
- Submit new sitemap: `https://vairagakbari.in/sitemap.xml`
- Request indexing for project pages

**LinkedIn Post Preview:**
- Use LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
- Test URL: `https://vairagakbari.in`
- Verify: Title, description, and image (if any) show correctly

**Twitter/X Card Validator:**
- Use Twitter Card Validator: https://cards-dev.twitter.com/validator
- Test URL: `https://vairagakbari.in`
- Verify: Card renders correctly

### 4. Mobile Testing

Test on actual devices or browser tools:
- **iPhone (375px)** — Check project cards stack vertically
- **iPad (768px)** — Check grid layouts
- **Desktop (1440px)** — Check full layout

### 5. Performance Check

Use Lighthouse (Chrome DevTools):
```
1. Open site in Chrome
2. F12 → Lighthouse tab
3. Generate report

Target scores:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+
```

---

## Rollback (If Needed)

If something goes wrong:

```bash
# View recent commits
git log --oneline -5

# Rollback to previous commit
git revert HEAD

# Or reset to specific commit
git reset --hard <commit-hash>

# Force push (use carefully!)
git push origin main --force
```

Netlify will automatically redeploy the previous version.

---

## Future Updates

### Adding GitHub Links

When repositories are public:

1. Update `content/profile.json`:
```json
{
  "projects": [
    {
      "id": "snapcart",
      "github": "https://github.com/yourname/snapcart",
      ...
    }
  ]
}
```

2. Rebuild and deploy:
```bash
npm run build
git add .
git commit -m "Add GitHub links to projects"
git push origin main
```

### Adding Live Demos

When demos are deployed:

1. Update `content/profile.json`:
```json
{
  "projects": [
    {
      "id": "snapcart",
      "demo": "https://snapcart-demo.vercel.app",
      ...
    }
  ]
}
```

2. Rebuild and deploy (same as above)

### Adding Project Screenshots

1. Add images to `dist/assets/projects/`:
```
dist/assets/projects/
├── snapcart-hero.webp
├── snapcart-dashboard.webp
├── rydex-map.webp
└── health-map-architecture.png
```

2. Update project JSON files with image paths
3. Update build script to include images in project pages
4. Rebuild and deploy

---

## Monitoring & Analytics

### Current Status

- ✅ Build system working
- ✅ All pages generating correctly
- ✅ SEO metadata complete
- ✅ Sitemap updated
- ✅ Mobile responsive
- ❌ No analytics installed yet (optional)

### Optional: Add Analytics

**Recommended: Plausible Analytics** (privacy-friendly)

1. Sign up at plausible.io
2. Add script to `src/templates/layout.html`:
```html
<script defer data-domain="vairagakbari.in" src="https://plausible.io/js/script.js"></script>
```

3. Rebuild and deploy

**Alternative: Google Analytics 4**

1. Create GA4 property
2. Add tracking code to layout template
3. Rebuild and deploy

---

## Troubleshooting

### Build Fails

**Error: "Cannot find module"**
```bash
# Reinstall dependencies
npm install
npm run build
```

**Error: "SyntaxError"**
- Check JSON files for syntax errors
- Use VSCode with JSON validation
- Run: `npm run validate` (if available)

### Pages Not Loading

**404 errors on project pages:**
- Check `dist/projects/` folder exists
- Verify index.html files generated
- Check Netlify redirects configuration

**Styling broken:**
- Verify `dist/assets/style.css` exists
- Check browser console for errors
- Clear browser cache (Ctrl+Shift+R)

### Content Issues

**Old content still showing:**
- Hard refresh browser (Ctrl+Shift+R)
- Check Netlify deployment completed
- Verify correct branch deployed

**Jumbo Homes references:**
- Rebuild from clean state
- Check `content/profile.json`
- Search entire codebase

---

## Support

**Questions or Issues:**
- Email: vairag.techwork@gmail.com
- LinkedIn: linkedin.com/in/vairag-akbari

**Documentation:**
- Implementation Summary: `PORTFOLIO-UPDATE-SUMMARY.md`
- Transformation Plan: `TRANSFORMATION-PLAN.md`
- Editing Guide: `docs/EDITING-GUIDE.md`

---

## Deployment Checklist

Before deploying to production:

- [ ] Build completes without errors
- [ ] All three project pages exist in `dist/projects/`
- [ ] Homepage shows correct positioning
- [ ] No Jumbo/Tara references anywhere
- [ ] Mobile responsive on key breakpoints
- [ ] Project URLs work in local preview
- [ ] Health Map clearly marked "Planning Stage"
- [ ] Resume PDF is up-to-date
- [ ] Social links verified and working
- [ ] Sitemap includes new project URLs

After deploying:

- [ ] Live site loads successfully
- [ ] All project pages accessible
- [ ] SEO meta tags visible (view source)
- [ ] LinkedIn preview looks good
- [ ] Mobile site works properly
- [ ] No console errors
- [ ] Analytics tracking (if installed)

---

**Ready to deploy?** Run the commands at the top of this guide! 🚀

Your portfolio transformation is complete and production-ready.
