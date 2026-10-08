# Portfolio Improvements — Implementation Guide

**Status:** Ready to implement  
**Est. Time:** 30-45 minutes  
**Impact:** High - Makes recruiter value clear immediately

---

## What Was Changed

### ✅ Already Applied (No Action Needed)

1. **content/profile.json** — Updated with:
   - New headline focusing on revenue and operations
   - Added `value` property for clear value proposition
   - New `capabilities` array (5 problem/approach/evidence sets)
   - Improved work descriptions with clearer outcomes
   - Better project categorization (role vs. independent vs. design)

### 📝 Needs Implementation (Your Actions)

1. **scripts/build.js** — Add capabilities rendering
2. **dist/assets/style.css** — Add capability section CSS
3. **Rebuild site** — Generate new HTML
4. **Test & deploy** — Verify and push live

---

## Step-by-Step Implementation

### Step 1: Update Build Script (10 minutes)

**File:** `scripts/build.js`

**Action:** Replace the `buildHomepage` function (starts around line 210)

**How:**
1. Open `scripts/build.js` in your editor
2. Find the line: `const buildHomepage = (articles) => {`
3. Replace the ENTIRE function (down to the closing `};`) with the code from `BUILD-UPDATES.js`

**What this does:**
- Renders the new `capabilities` section from profile.json
- Shows value proposition under headline
- Changes primary CTA to "Download résumé"
- Updates section numbering (01-06 instead of 01-05)
- Improves meta description for homepage

**Verify:** Search for `profile.capabilities` in the new code—should appear 5 times.

---

### Step 2: Add CSS Styles (5 minutes)

**File:** `dist/assets/style.css`

**Action:** Add the styles from `CSS-ADDITIONS.css` to the end of the file

**How:**
1. Open `dist/assets/style.css`
2. Scroll to the bottom (after the `@media print` section)
3. Copy all content from `CSS-ADDITIONS.css`
4. Paste at the end of style.css

**What this does:**
- Styles the `.capability` cards
- Adds `.value-prop` styling
- Mobile responsive adjustments

**Verify:** Search for `.capability` in style.css—should find it.

---

### Step 3: Rebuild Site (2 minutes)

```bash
npm run build
```

**Expected output:**
```
Loading configuration...
Starting build...

Found 1 published article(s)

Building homepage...
Building article index...
Building book page...
Building article: Job-To-Be-Done...
Generating sitemap...
Generating robots.txt...
Generating 404 page...
Copying static assets...

✅ Build complete!
📁 Output: C:\Users\vaira\OneDrive\Desktop\VairagAkbari\dist
```

**If errors:** Check JSON syntax in profile.json, verify capabilities array structure.

---

### Step 4: Validate (2 minutes)

```bash
npm run validate
```

**Expected output:**
```
✅ All checks passed!
```

**If warnings/errors:** Read the message, fix the issue, rebuild.

---

### Step 5: Preview Locally (5-10 minutes)

```bash
npm run preview
```

Visit: http://localhost:8000

**Check these things:**

**Homepage (above fold):**
- [ ] New headline appears: "I help early-stage companies turn customer insights into revenue..."
- [ ] Value proposition shows (blue text below lead)
- [ ] Primary button is "Download résumé"
- [ ] Secondary button is "See what I can do"

**Capabilities section (scroll down once):**
- [ ] Section title: "What I can help you solve"
- [ ] 5 capability cards appear
- [ ] Each has problem → approach → evidence
- [ ] Evidence text is italicized and muted color

**Work section:**
- [ ] Now labeled "02 / Work in practice"
- [ ] 4 work cards show updated descriptions

**Overall:**
- [ ] All sections numbered correctly (01-06)
- [ ] Contact section says "Looking for someone to own growth end-to-end?"
- [ ] Resume link downloads correctly
- [ ] Mobile layout works (test by resizing browser)

**If something looks wrong:** Check browser console for errors, verify CSS was added.

Press Ctrl+C to stop preview server.

---

### Step 6: Deploy (5 minutes)

```bash
git add .
git commit -m "Improve portfolio for recruiter clarity - add capabilities section, update messaging"
git push origin main
```

**Netlify will automatically:**
1. Detect the push
2. Build the site
3. Deploy to https://vairagakbari.in
4. Complete in 1-2 minutes

**Monitor deployment:**
- Check Netlify dashboard: https://app.netlify.com
- Or watch for email confirmation

---

### Step 7: Verify Live Site (3 minutes)

Visit: https://vairagakbari.in

**Final checks:**
- [ ] New headline and value prop appear
- [ ] Capabilities section renders correctly
- [ ] All 5 capability cards present
- [ ] Resume downloads (click the primary button)
- [ ] Contact links work (email, LinkedIn)
- [ ] Mobile layout looks good (test on phone or DevTools)
- [ ] No broken images or 404s

**View source** (Right-click → View Page Source):
- [ ] Meta description mentions "Growth operator targeting founder's office"
- [ ] Page title is "Growth Operator — Founder's Office & Strategy Roles"

---

## Common Issues & Fixes

### Issue: Build fails with "profile.capabilities is not iterable"

**Cause:** profile.json syntax error or capabilities not an array

**Fix:**
1. Open `content/profile.json`
2. Check that `"capabilities": [` exists
3. Verify all 5 capability objects have commas between them
4. Ensure closing `]` after last capability
5. Run `npm run build` again

---

### Issue: Capabilities section doesn't appear

**Cause:** Build script not updated correctly

**Fix:**
1. Search `scripts/build.js` for `profile.capabilities`
2. Should appear 5 times
3. If not found, re-apply changes from BUILD-UPDATES.js
4. Rebuild

---

### Issue: Styling looks broken

**Cause:** CSS not added or cached

**Fix:**
1. Verify `.capability` exists in `dist/assets/style.css`
2. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
3. Check browser console for CSS errors
4. Clear browser cache

---

### Issue: "Download résumé" button doesn't work

**Cause:** Resume PDF missing or incorrect path

**Fix:**
1. Check `dist/assets/vairag-akbari-resume.pdf` exists
2. If missing, copy your resume there
3. Ensure filename matches exactly (including .pdf)
4. Rebuild and test

---

## Rollback Plan

If something goes wrong:

```bash
# Revert to previous version
git revert HEAD
git push origin main

# Netlify will redeploy previous working version
```

---

## What Recruiters Will See (Before vs. After)

### BEFORE (Current State)

**First impression:**
- Generic headline: "I connect customer needs to business decisions"
- Unclear what roles you want
- No immediate value statement
- Resume link secondary
- Have to scroll to see work

**To understand your value:**
- Read through 4 work cards
- Infer capabilities from examples
- Guess at what problems you solve

**Time to decide if relevant:** 2-3 minutes

---

### AFTER (With Changes)

**First impression:**
- Specific: "Turn customer insights into revenue and operations"
- Clear target: "Founder's office and growth roles"
- Value visible: "Diagnose funnels → talk to customers → fix workflows"
- Resume primary CTA
- Capabilities one scroll down

**To understand your value:**
- Read 5 capability cards (problem → approach → evidence)
- See evidence links to actual work
- Understand business problems you tackle

**Time to decide if relevant:** 30-60 seconds

---

## Success Metrics (Track After 2 Weeks)

### Portfolio Metrics:
- Resume downloads (vs. before)
- Time on site (should be shorter—clearer value)
- Capabilities section views
- Contact clicks

### Job Search Metrics:
- Application response rate (target: 15-20%)
- Quality of inbound interest
- Interview requests
- Recruiter feedback

**How to measure:**
- Set up Google Analytics or similar (optional)
- Track applications in JOB-SEARCH-KIT tracker
- Note any recruiter feedback about portfolio

---

## Next Improvements (After This Is Live)

### Short-term (Next 1-2 weeks):

1. **Update LinkedIn** using JOB-SEARCH-KIT.md templates
2. **Write case study** for Jumbo Homes pipeline work
3. **Apply to 20-30 roles** using job search kit

### Medium-term (Next month):

4. **Create work detail pages** (`/work/jumbo-pipeline/`, etc.)
5. **Write next article** (Revenue Tree or Funnel Analysis)
6. **Set up analytics** tracking

### Ongoing:

7. **Track what works** (which roles respond, what messaging resonates)
8. **Iterate portfolio** based on recruiter feedback
9. **Publish consistently** (1 article every 2-3 weeks)

---

## Checklist: Before Considering This Complete

- [ ] Build script updated with capabilities rendering
- [ ] CSS added for capability section
- [ ] Site rebuilt successfully
- [ ] Validation passes
- [ ] Preview looks correct locally
- [ ] Deployed to production
- [ ] Live site verified
- [ ] Resume downloads correctly
- [ ] Contact links work
- [ ] Mobile layout tested
- [ ] LinkedIn profile updated (from JOB-SEARCH-KIT)
- [ ] Application tracker set up
- [ ] First 5 applications sent

---

## Support

**If you get stuck:**

1. Check the error message carefully
2. Review the "Common Issues" section above
3. Try the rollback plan if needed
4. Rebuild from scratch if necessary

**Validation commands:**
```bash
# Check if site builds
npm run build

# Check for errors
npm run validate

# Test locally
npm run preview
```

---

## Estimated Timeline

| Task | Time | Status |
|------|------|--------|
| Read this guide | 10 min | - |
| Update build.js | 10 min | - |
| Add CSS | 5 min | - |
| Rebuild & validate | 2 min | - |
| Preview & test | 10 min | - |
| Deploy | 5 min | - |
| Verify live | 3 min | - |
| **Total** | **45 min** | - |

---

**Ready? Start with Step 1 above. Good luck!**
