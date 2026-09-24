# Connect vairagakbari.in to Netlify - BigRock DNS Setup

## 📋 Step-by-Step Guide

### Part 1: Add Domain in Netlify (Do This First)

1. **Login to Netlify**: https://app.netlify.com
2. Click on your deployed site
3. Go to **"Domain management"** (or "Site settings" → "Domain management")
4. Click **"Add a domain"** or **"Add custom domain"**
5. Enter: `vairagakbari.in`
6. Click **"Verify"** then **"Add domain"**
7. Netlify will show you the DNS configuration needed

**Note down your Netlify site name** (e.g., `amazing-site-123456.netlify.app`)

---

### Part 2: Configure DNS in BigRock

#### Option A: Use Netlify DNS (Recommended - Easier) ⭐

1. In Netlify **Domain management**, click **"Use Netlify DNS"**
2. Netlify will provide **4 nameservers** like:
   ```
   dns1.p08.nsone.net
   dns2.p08.nsone.net
   dns3.p08.nsone.net
   dns4.p08.nsone.net
   ```

3. **Login to BigRock**: https://myaccount.bigrock.in
4. Go to **"My Domains"**
5. Click on **vairagakbari.in**
6. Find **"Nameservers"** section
7. Click **"Change"** or **"Modify Nameservers"**
8. Select **"Use Custom Nameservers"**
9. Enter Netlify's 4 nameservers:
   - Nameserver 1: `dns1.p08.nsone.net`
   - Nameserver 2: `dns2.p08.nsone.net`
   - Nameserver 3: `dns3.p08.nsone.net`
   - Nameserver 4: `dns4.p08.nsone.net`
10. Click **"Save"** or **"Update"**

**Propagation time:** 1-48 hours (usually 1-4 hours)

---

#### Option B: Manual DNS Records (Alternative)

If you prefer to keep BigRock's nameservers:

1. **Login to BigRock**: https://myaccount.bigrock.in
2. Go to **"My Domains"**
3. Click on **vairagakbari.in**
4. Go to **"Manage DNS"** or **"DNS Management"**
5. Click **"Add Record"** or look for existing records

**Add/Modify these DNS records:**

##### For Main Domain (vairagakbari.in):
```
Type: A
Name: @ (or leave blank for root domain)
Value: 75.2.60.5
TTL: 3600
```

##### For WWW Subdomain:
```
Type: CNAME
Name: www
Value: [your-netlify-site-name].netlify.app
TTL: 3600
```
**Replace `[your-netlify-site-name]` with your actual Netlify site URL**

##### Optional - For Netlify Load Balancer:
You can also add these A records for redundancy:
```
Type: A
Name: @
Value: 99.83.190.102
TTL: 3600
```

6. **Delete any conflicting records**:
   - Remove old A records pointing to different IPs
   - Remove old CNAME for @ (root domain can't have CNAME)

7. Click **"Save Changes"**

**Propagation time:** 1-24 hours (usually 1-2 hours)

---

### Part 3: Configure Domain Settings in Netlify

1. Back in Netlify **Domain management**
2. Under **"Custom domains"**, you should see:
   - `vairagakbari.in`
   - `www.vairagakbari.in` (add this too if not present)

3. Click the **three dots (•••)** next to `vairagakbari.in`
4. Select **"Set as primary domain"**
   - This makes all traffic redirect to non-www version

5. Enable **"HTTPS"**:
   - Netlify will automatically provision SSL certificate
   - Once DNS propagates, SSL will be ready (5-60 minutes)

6. Enable **"Force HTTPS"** (after SSL is ready)
   - This redirects all HTTP traffic to HTTPS

---

### Part 4: Verify DNS Propagation

**Check if DNS is working:**

1. **Open Command Prompt** and run:
   ```cmd
   nslookup vairagakbari.in
   ```
   Should show: `75.2.60.5` or Netlify's IP

2. **Online DNS Checker**:
   - https://dnschecker.org
   - Enter: `vairagakbari.in`
   - Should show green checkmarks globally

3. **Wait for propagation**: 1-48 hours (usually 1-4 hours)

---

### Part 5: Test Your Live Site

Once DNS propagates, test these URLs:

✅ **http://vairagakbari.in** → Should redirect to https://vairagakbari.in
✅ **https://vairagakbari.in** → Should load your portfolio
✅ **http://www.vairagakbari.in** → Should redirect to https://vairagakbari.in
✅ **https://www.vairagakbari.in** → Should redirect to https://vairagakbari.in
✅ **https://vairagakbari.in/article/Job-To-Be-Done/** → Should load article
✅ **https://vairagakbari.in/non-existent-page** → Should show custom 404

---

## 🔒 Enable HTTPS (Automatic after DNS)

1. In Netlify **Domain management** → **HTTPS**
2. Netlify automatically provisions **Let's Encrypt SSL** certificate
3. Wait 5-60 minutes after DNS propagates
4. Once ready, enable **"Force HTTPS"**

---

## 🔍 Submit to Google Search Console

After your site is live with HTTPS:

1. Go to: https://search.google.com/search-console
2. Click **"Add property"**
3. Choose **"URL prefix"**
4. Enter: `https://vairagakbari.in`
5. Download the verification HTML file
6. Add it to your `dist` folder
7. Commit and push to GitHub (auto-deploys to Netlify)
8. Click **"Verify"**
9. Go to **"Sitemaps"** in left menu
10. Add sitemap: `https://vairagakbari.in/sitemap.xml`
11. Click **"Submit"**

---

## 📊 Deployment Checklist

- [ ] Added domain in Netlify
- [ ] Configured BigRock nameservers OR DNS records
- [ ] Set primary domain in Netlify
- [ ] Waited for DNS propagation (1-48 hours)
- [ ] HTTPS certificate provisioned
- [ ] Force HTTPS enabled
- [ ] Tested all URLs
- [ ] Added to Google Search Console
- [ ] Submitted sitemap

---

## ⚡ Quick Reference

**BigRock Login**: https://myaccount.bigrock.in
**Netlify Dashboard**: https://app.netlify.com
**DNS Checker**: https://dnschecker.org
**Google Search Console**: https://search.google.com/search-console

**Netlify DNS (Recommended):**
```
dns1.p08.nsone.net
dns2.p08.nsone.net
dns3.p08.nsone.net
dns4.p08.nsone.net
```

**Manual DNS Records:**
```
A Record:
  Name: @
  Value: 75.2.60.5

CNAME Record:
  Name: www
  Value: [your-site].netlify.app
```

---

## 🆘 Troubleshooting

**Issue**: Domain not resolving after 24 hours
- Check nameservers are correctly set in BigRock
- Verify no typos in DNS records
- Contact BigRock support

**Issue**: HTTPS not working
- Wait for DNS to fully propagate first
- In Netlify, try "Renew certificate"
- Check domain is verified in Netlify

**Issue**: Getting Netlify 404 (not your custom 404)
- Check `netlify.toml` is in root directory
- Verify `dist` folder has your files
- Check Netlify build logs

---

## 📞 Support Contacts

**BigRock Support**: https://www.bigrock.in/support
**Netlify Support**: https://answers.netlify.com

---

**Your domain**: vairagakbari.in
**Your GitHub**: https://github.com/VairagPatel/vairagakbari.in
**Email**: vairag.techwork@gmail.com
