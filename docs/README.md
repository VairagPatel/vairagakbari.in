# Documentation

Complete documentation for the Vairag Akbari Portfolio Website.

---

## 📚 Table of Contents

### Getting Started
- [Main README](../README.md) - Project overview and quick start

### Deployment & Hosting
- [DEPLOYMENT.md](DEPLOYMENT.md) - Complete deployment guide for all hosting options
- [BIGROCK-DNS-SETUP.md](BIGROCK-DNS-SETUP.md) - Step-by-step BigRock DNS configuration

### Content & Distribution
- [DISTRIBUTION.md](DISTRIBUTION.md) - Content publishing and distribution strategy
- [Content Guidelines](../templates/article.html) - Article template and structure

### Development
- [verify-github.md](verify-github.md) - GitHub repository verification and troubleshooting

---

## 🚀 Quick Links

### For Deployment
1. **First Time Setup**: Start with [DEPLOYMENT.md](DEPLOYMENT.md)
2. **Domain Configuration**: Follow [BIGROCK-DNS-SETUP.md](BIGROCK-DNS-SETUP.md)
3. **Content Publishing**: Read [DISTRIBUTION.md](DISTRIBUTION.md)

### For Development
1. **Local Development**: See [Main README](../README.md#-quick-start)
2. **Add New Article**: Follow [Main README](../README.md#-content-management)
3. **Git Workflow**: Check [Main README](../README.md#git-workflow)

---

## 📖 Document Summaries

### DEPLOYMENT.md
Complete guide covering:
- Netlify deployment (3 methods)
- GitHub Pages setup
- Vercel deployment
- Custom domain configuration
- HTTPS setup
- Google Search Console submission

**When to read:** Setting up hosting for the first time or switching hosts.

---

### BIGROCK-DNS-SETUP.md
Step-by-step DNS configuration for BigRock domain registrar:
- Add domain in Netlify
- Configure BigRock nameservers
- Manual DNS record setup
- DNS propagation verification
- HTTPS certificate setup
- Troubleshooting common issues

**When to read:** Connecting vairagakbari.in custom domain to Netlify.

---

### DISTRIBUTION.md
Content marketing and distribution strategy:
- Multi-platform publishing plan
- SEO best practices
- Content workflow (one article → one week distribution)
- Platform-specific guidelines
- Editorial sequence proposals

**When to read:** Planning content publishing and promotion strategy.

---

### verify-github.md
GitHub repository verification:
- Commit attribution verification
- Email configuration
- Contributor troubleshooting
- Repository status checks

**When to read:** Ensuring commits are properly attributed to VairagPatel.

---

## 🛠️ Common Tasks

### Deploy Changes
```bash
git add .
git commit -m "Your changes"
git push origin main
```
Netlify auto-deploys within 1-2 minutes.

### Add New Article
1. Copy `templates/article.html` to `dist/article/your-topic/index.html`
2. Update all `ALL_CAPS` placeholders
3. Link from article index and home page
4. Add to sitemap.xml
5. Commit and push

### Check Deployment Status
- Netlify Dashboard: https://app.netlify.com
- GitHub Actions: https://github.com/VairagPatel/vairagakbari.in/actions
- Live Site: https://vairagakbari.in

### Verify DNS
```bash
nslookup vairagakbari.in
```
Or use: https://dnschecker.org

---

## 🆘 Troubleshooting

### Site Not Deploying
1. Check Netlify build logs
2. Verify `dist` folder exists
3. Check `netlify.toml` configuration

### Domain Not Working
1. Verify DNS records in BigRock
2. Check propagation: https://dnschecker.org
3. Wait 1-48 hours for DNS propagation
4. See [BIGROCK-DNS-SETUP.md](BIGROCK-DNS-SETUP.md#-troubleshooting)

### HTTPS Not Enabled
1. Ensure DNS is fully propagated
2. In Netlify: Domain management → HTTPS
3. Click "Renew certificate" if needed
4. Wait 5-60 minutes after DNS setup

### Wrong GitHub Author
See [verify-github.md](verify-github.md) for complete verification steps.

---

## 📞 Support Resources

- **Netlify Docs**: https://docs.netlify.com
- **BigRock Support**: https://www.bigrock.in/support
- **GitHub Docs**: https://docs.github.com
- **Google Search Console**: https://search.google.com/search-console

---

## 🔄 Document Updates

This documentation is version controlled with the project. To suggest improvements:

1. Edit the relevant markdown file
2. Commit your changes
3. Submit a pull request

---

**Last Updated:** September 24, 2026  
**Project:** vairagakbari.in  
**Author:** Vairag Akbari  
**Email:** vairag.techwork@gmail.com
