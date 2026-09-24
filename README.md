# Vairag Akbari — Portfolio Website

[![Deploy Status](https://api.netlify.com/api/v1/badges/your-site-id/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A production-ready static HTML portfolio website showcasing articles, work experience, and professional insights. Built with semantic HTML, modern CSS, and zero JavaScript dependencies.

**Live Site:** [https://vairagakbari.in](https://vairagakbari.in)  
**GitHub:** [VairagPatel/vairagakbari.in](https://github.com/VairagPatel/vairagakbari.in)

---

## 🚀 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/VairagPatel/vairagakbari.in.git
cd vairagakbari.in

# Start local server
python -m http.server 8000 --directory dist

# Open in browser
# http://localhost:8000
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
vairagakbari.in/
├── dist/                      # Production-ready static files
│   ├── index.html            # Home page
│   ├── 404.html              # Custom error page
│   ├── article/              # Article pages
│   │   ├── index.html       # Article listing
│   │   └── Job-To-Be-Done/  # Individual articles
│   ├── book/                 # Book chapters
│   ├── assets/               # Styles, images, PDFs
│   │   ├── style.css
│   │   ├── vairag-akbari.webp
│   │   └── vairag-akbari-resume.pdf
│   ├── robots.txt            # Search engine directives
│   ├── sitemap.xml           # SEO sitemap
│   └── _redirects            # Netlify redirect rules
├── docs/                      # Documentation
│   ├── DEPLOYMENT.md         # Deployment guide
│   ├── BIGROCK-DNS-SETUP.md  # Domain configuration
│   ├── DISTRIBUTION.md       # Content distribution strategy
│   └── verify-github.md      # GitHub verification
├── templates/                 # Page templates
│   └── article.html          # Article template
├── netlify.toml              # Netlify configuration
├── .gitignore                # Git ignore rules
├── me.png                    # Profile image
└── README.md                 # This file
```

---

## ✨ Features

- **Static HTML** - No build process, no framework dependencies
- **SEO Optimized** - Semantic HTML, meta tags, structured data, sitemap
- **Fast Performance** - Minimal CSS, no JavaScript, optimized assets
- **Responsive Design** - Mobile-first, accessible design
- **Custom 404 Page** - Branded error handling
- **HTTPS Enabled** - Automatic SSL via Netlify
- **CDN Distribution** - Global edge network delivery

---

## 📝 Content Management

### Add a New Article

1. **Copy template:**
   ```bash
   cp templates/article.html dist/article/your-topic/index.html
   ```

2. **Update content:**
   - Replace `ALL_CAPS` placeholders
   - Update page title, description, canonical URL
   - Add Open Graph and structured data
   - Write article content with semantic HTML

3. **Link the article:**
   - Add to `dist/article/index.html`
   - Link from home page `dist/index.html`
   - If part of book, link from `dist/book/index.html`

4. **Update sitemap:**
   - Add canonical URL to `dist/sitemap.xml`
   - Set accurate publication/modified dates

5. **Deploy:**
   ```bash
   git add .
   git commit -m "Add article: Your Topic"
   git push origin main
   ```

### Content Guidelines

- Use stable IDs for subsections: `/article/topic/#section-id`
- Fragments are in-page jumps, not separate pages
- Don't duplicate article content across pages
- Review JTBD article in your own voice before release
- Follow [docs/DISTRIBUTION.md](docs/DISTRIBUTION.md) for publishing strategy

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

## 🔍 SEO & Analytics

### Google Search Console

1. Verify ownership: https://search.google.com/search-console
2. Submit sitemap: `https://vairagakbari.in/sitemap.xml`
3. Monitor indexing and performance

### Canonicals

- Each page has a canonical URL
- No fragments in canonical tags
- Medium imports should point to original

### Current Status

- ✅ Semantic HTML structure
- ✅ Meta descriptions and Open Graph tags
- ✅ Structured data (JSON-LD)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Custom 404 page
- ❌ Analytics (not installed - add when ready)

---

## 🛠️ Development

### Requirements

- **Web Server** - Python, Node.js, or any static server
- **Git** - For version control
- **Text Editor** - VS Code, Sublime, etc.

### Local Development Server Options

**Python:**
```bash
python -m http.server 8000 --directory dist
```

**Node.js (with http-server):**
```bash
npx http-server dist -p 8000
```

**PHP:**
```bash
php -S localhost:8000 -t dist
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-article

# Make changes and commit
git add .
git commit -m "Add new article"

# Push to GitHub
git push origin feature/new-article

# Create pull request on GitHub
# After review, merge to main
```

---

## 📚 Documentation

- **[DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Complete deployment guide
- **[BIGROCK-DNS-SETUP.md](docs/BIGROCK-DNS-SETUP.md)** - Domain and DNS configuration
- **[DISTRIBUTION.md](docs/DISTRIBUTION.md)** - Content distribution strategy
- **[verify-github.md](docs/verify-github.md)** - GitHub repository verification

---

## 🔒 Security

- **HTTPS Enforced** - All traffic redirected to HTTPS
- **Security Headers** - Configured in `netlify.toml`
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - X-XSS-Protection: 1; mode=block
- **No Backend** - Static files only, no server vulnerabilities
- **CDN Protected** - Netlify edge network

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👤 Author

**Vairag Akbari**  
- Website: [vairagakbari.in](https://vairagakbari.in)
- Email: vairag.techwork@gmail.com
- GitHub: [@VairagPatel](https://github.com/VairagPatel)

---

## 🤝 Contributing

This is a personal portfolio website. However, if you spot issues or have suggestions:

1. Open an issue on GitHub
2. Fork the repository
3. Submit a pull request

---

## 📊 Project Status

- ✅ Initial setup complete
- ✅ Deployed on Netlify
- ✅ Custom domain configured
- ✅ HTTPS enabled
- ⏳ Google Search Console verification pending
- ⏳ Content review and refinement ongoing

---

## 🔗 Links

- **Live Site:** https://vairagakbari.in
- **GitHub Repository:** https://github.com/VairagPatel/vairagakbari.in
- **Netlify Dashboard:** https://app.netlify.com
- **Documentation:** [docs/](docs/)

---

**Built with ❤️ using HTML, CSS, and semantic markup.**
