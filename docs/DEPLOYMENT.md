# Deploy vairagakbari.in to Netlify

## Quick Deploy (3 Options)

### Option 1: Netlify Drop (Easiest - 2 minutes) ⭐ RECOMMENDED

1. **Go to**: https://app.netlify.com/drop
2. **Drag and drop** your `dist` folder into the browser
3. Wait for upload to complete
4. Click **"Domain settings"**
5. Click **"Add custom domain"**
6. Enter: `vairagakbari.in`
7. Follow the DNS configuration instructions below

---

### Option 2: Connect GitHub Repository (Best for Updates)

1. **First, push your code to GitHub**:
   - You'll need to authenticate as VairagPatel
   - Create a Personal Access Token: https://github.com/settings/tokens
   - Run: `git push -u origin main`

2. **Sign up/Login to Netlify**: https://app.netlify.com
3. Click **"Add new site"** → **"Import an existing project"**
4. Choose **GitHub**
5. Authorize Netlify
6. Select repository: **vairagakbari.in**
7. Configure build settings:
   - Build command: (leave empty)
   - Publish directory: `dist`
8. Click **"Deploy site"**
9. Once deployed, add custom domain (see below)

---

### Option 3: Netlify CLI (For Developers)

1. **Install Netlify CLI**:
   ```cmd
   npm install -g netlify-cli
   ```

2. **Login**:
   ```cmd
   netlify login
   ```

3. **Deploy**:
   ```cmd
   netlify deploy --prod
   ```
   - When asked, set publish directory: `dist`

4. **Add custom domain** (see below)

---

## Configure Custom Domain: vairagakbari.in

### After deployment on Netlify:

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter: `vairagakbari.in`
4. Netlify will show you DNS records to configure

### Configure DNS with your domain registrar:

Add these DNS records where you bought vairagakbari.in:

**For APEX domain (vairagakbari.in):**
```
Type: A
Name: @
Value: 75.2.60.5
```

**For www subdomain (optional):**
```
Type: CNAME
Name: www
Value: [your-site-name].netlify.app
```

### Alternative DNS Setup (Recommended):

Use Netlify DNS for easier management:
1. In Netlify, go to **Domain management**
2. Click **"Use Netlify DNS"**
3. Netlify will provide nameservers
4. Update nameservers at your domain registrar to:
   - `dns1.p08.nsone.net`
   - `dns2.p08.nsone.net`
   - `dns3.p08.nsone.net`
   - `dns4.p08.nsone.net`

---

## Enable HTTPS

Netlify automatically provisions SSL certificate once DNS is configured (takes 5-60 minutes).

**Check SSL status**: Site settings → Domain management → HTTPS

---

## Set Up Google Search Console

Once your site is live:

1. Go to: https://search.google.com/search-console
2. Add property: `https://vairagakbari.in`
3. Verify ownership (use HTML file method)
4. Submit sitemap: `https://vairagakbari.in/sitemap.xml`

---

## Current Status

✅ Netlify configuration created (`netlify.toml`)
✅ 404 page configured
✅ Security headers configured
✅ Asset caching configured
⏳ Need to push to GitHub OR use Netlify Drop
⏳ Configure custom domain
⏳ Set up HTTPS
⏳ Submit to Google Search Console

---

## Quick Command Reference

**If using GitHub + Netlify:**
```cmd
# Push to GitHub (after setting up authentication)
git push -u origin main

# Then deploy via Netlify web UI
```

**If using Netlify CLI:**
```cmd
netlify login
netlify deploy --prod
```

**If using Netlify Drop:**
Just drag `dist` folder to https://app.netlify.com/drop

---

## Need Help?

- Netlify Documentation: https://docs.netlify.com
- DNS Configuration: https://docs.netlify.com/domains-https/custom-domains/
- Contact: vairag.techwork@gmail.com
