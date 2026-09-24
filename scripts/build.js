#!/usr/bin/env node
/**
 * Static site builder for vairagakbari.in
 * Generates HTML pages from content JSON and HTML fragments
 */

const fs = require('fs');
const path = require('path');

// Paths
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const CONFIG = path.join(ROOT, 'config');
const CONTENT = path.join(ROOT, 'content');
const ASSETS_SRC = path.join(ROOT, 'src', 'assets');
const ASSETS_DIST = path.join(DIST, 'assets');

// Utilities
const readJSON = (filepath) => JSON.parse(fs.readFileSync(filepath, 'utf8'));
const readFile = (filepath) => fs.readFileSync(filepath, 'utf8');
const ensureDir = (dir) => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); };
const writeFile = (filepath, content) => {
  ensureDir(path.dirname(filepath));
  fs.writeFileSync(filepath, content, 'utf8');
};

// HTML escaping
const escape = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// JSON-LD escaping
const escapeJsonLd = (obj) => {
  return JSON.stringify(obj).replace(/<\//g, '<\\/');
};

// Calculate reading time from HTML
const calculateReadingTime = (html) => {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};

// Load configurations
console.log('Loading configuration...');
const site = readJSON(path.join(CONFIG, 'site.json'));
const navigation = readJSON(path.join(CONFIG, 'navigation.json'));
const profile = readJSON(path.join(CONTENT, 'profile.json'));
const book = readJSON(path.join(CONTENT, 'book.json'));

// Get all published articles
const getPublishedArticles = () => {
  const articlesDir = path.join(CONTENT, 'articles');
  const articles = [];
  
  if (!fs.existsSync(articlesDir)) return articles;
  
  const articleDirs = fs.readdirSync(articlesDir, { withFileTypes: true })
    .filter(d => d.isDirectory());
  
  for (const dir of articleDirs) {
    const metaPath = path.join(articlesDir, dir.name, 'meta.json');
    if (fs.existsSync(metaPath)) {
      const meta = readJSON(metaPath);
      if (meta.status === 'published') {
        const bodyPath = path.join(articlesDir, dir.name, 'body.html');
        const body = fs.existsSync(bodyPath) ? readFile(bodyPath) : '';
        
        // Calculate reading time if not set
        if (!meta.readingTime && body) {
          meta.readingTime = calculateReadingTime(body);
        }
        
        articles.push({ ...meta, body });
      }
    }
  }
  
  return articles.sort((a, b) => (a.chapterNumber || 999) - (b.chapterNumber || 999));
};

// Generate common head metadata
const generateHead = (page) => {
  const { 
    title, 
    description, 
    canonical, 
    type = 'website',
    image = null,
    imageAlt = '',
    datePublished = null,
    dateModified = null
  } = page;
  
  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const ogTitle = title.replace(/<[^>]*>/g, '').trim();
  
  let jsonLd = null;
  
  if (type === 'website' || type === 'ProfilePage') {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "url": canonical,
      "mainEntity": {
        "@type": "Person",
        "name": site.author.name,
        "url": site.author.url,
        "sameAs": Object.values(site.social).filter(Boolean)
      }
    };
  } else if (type === 'article' || type === 'Article') {
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": ogTitle,
      "url": canonical,
      "description": description,
      "author": {
        "@type": "Person",
        "name": site.author.name,
        "url": site.author.url
      },
      "mainEntityOfPage": canonical
    };
    
    if (datePublished) jsonLd.datePublished = datePublished;
    if (dateModified) jsonLd.dateModified = dateModified;
    if (image) {
      jsonLd.image = `${site.domain}${image}`;
    }
  }
  
  const twitterCard = image ? 'summary_large_image' : 'summary';
  
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escape(fullTitle)}</title>
<meta name="description" content="${escape(description)}">
<link rel="canonical" href="${escape(canonical)}">
<meta property="og:type" content="${type === 'article' || type === 'Article' ? 'article' : 'website'}">
<meta property="og:title" content="${escape(ogTitle)}">
<meta property="og:description" content="${escape(description)}">
<meta property="og:url" content="${escape(canonical)}">
${image ? `<meta property="og:image" content="${escape(site.domain + image)}">
<meta property="og:image:alt" content="${escape(imageAlt)}">` : ''}
<meta name="twitter:card" content="${twitterCard}">
${image ? `<meta name="twitter:image" content="${escape(site.domain + image)}">
<meta name="twitter:image:alt" content="${escape(imageAlt)}">` : ''}
<meta name="theme-color" content="${escape(site.themeColor)}">
<link rel="icon" type="image/svg+xml" href="${site.favicon}">
<link rel="stylesheet" href="/assets/style.css">
${jsonLd ? `<script type="application/ld+json">${escapeJsonLd(jsonLd)}</script>` : ''}`;
};

// Generate header
const generateHeader = () => {
  const navItems = navigation.main.map(item => 
    `<a href="${escape(item.href)}">${escape(item.label)}</a>`
  ).join('');
  
  return `<header>
  <div class="wrap">
    <a class="brand" href="/">
      <span class="mark">va</span>${escape(site.name)}
    </a>
    <nav aria-label="Main navigation">
      ${navItems}
    </nav>
  </div>
</header>`;
};

// Generate footer
const generateFooter = () => {
  const footerLinks = navigation.footer.map(item =>
    `<a href="${escape(item.href)}">${escape(item.label)}</a>`
  ).join('');
  
  return `<footer class="wrap footer">
  <span>${escape(navigation.copyright)}</span>
  <span>${escape(site.author.role)} · ${escape(site.author.location)}</span>
  ${footerLinks}
</footer>`;
};

// Build homepage
const buildHomepage = (articles) => {
  console.log('Building homepage...');
  
  const workCards = profile.work.map(item => `
    <article class="card">
      <p class="meta">${item.meta}</p>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      ${item.tags.map(tag => `<span class="tag">${escape(tag)}</span>`).join('')}
    </article>
  `).join('');
  
  const featuredArticles = articles.slice(0, 3).map((article, idx) => `
    <a class="row" href="/article/${escape(article.slug)}/">
      <span class="num">${String(idx + 1).padStart(2, '0')}</span>
      <div>
        <h3>${article.shortTitle || article.title}</h3>
        <p>${escape(article.description)}</p>
      </div>
      <span class="meta">${escape(article.topic)} · ${article.readingTime} min ↗</span>
    </a>
  `).join('');
  
  const content = `
<section class="hero">
  <div>
    <p class="eyebrow">${profile.eyebrow}</p>
    <h1>${profile.headline}</h1>
    <p class="lead">${profile.lead}</p>
    <div class="actions">
      <a class="btn primary" href="#work">Explore my work</a>
      <a class="btn" href="${escape(profile.resumePdf)}">Read my résumé ↗</a>
    </div>
  </div>
  <figure>
    <img src="${escape(profile.portraitImage)}" alt="${escape(profile.portraitAlt)}" width="928" height="1152" fetchpriority="high">
    <figcaption class="caption">${profile.portraitCaption}</figcaption>
  </figure>
</section>

<section id="work">
  <div class="section-head">
    <div>
      <p class="eyebrow">01 / Work in practice</p>
      <h2>From conversations<br>to execution.</h2>
    </div>
    <p>My experience spans sales, cross-functional operations, outreach workflows, and leading teams on the ground.</p>
  </div>
  <div class="grid">
    ${workCards}
  </div>
</section>

<section>
  <div class="section-head">
    <div>
      <p class="eyebrow">02 / Learning in public</p>
      <h2>Frameworks, with<br>the thinking attached.</h2>
    </div>
    <p>I turn what I'm learning into articles, funnels, and flowcharts: the question, the model, and where it applies.</p>
  </div>
  ${featuredArticles}
  <div class="actions">
    <a href="/article/">Browse the notebook ↗</a>
  </div>
</section>

<section>
  <div class="book">
    <p class="eyebrow">${escape(book.eyebrow)}</p>
    <h2>${escape(book.title)}</h2>
    <p>${book.description}</p>
    <a class="btn" href="/book/">Open the book ↗</a>
  </div>
</section>

<section>
  <div class="section-head">
    <div>
      <p class="eyebrow">04 / My toolkit</p>
      <h2>Using today.<br>Learning next.</h2>
    </div>
    <div>
      <p><strong>In practice</strong><br>${profile.toolkit.inPractice}</p>
      <p><strong>Currently learning</strong><br>${profile.toolkit.learning}</p>
      <p class="caption">${profile.toolkit.interest}</p>
    </div>
  </div>
</section>

<section id="contact">
  <p class="eyebrow">05 / Let's talk</p>
  <h2>Have a business problem<br>I could help work through?</h2>
  <p class="lead">I'm actively applying for founder's office, strategy, growth, and product opportunities.</p>
  <div class="actions">
    <a class="btn primary" href="mailto:${escape(site.contact.email)}">Email me</a>
    ${site.social.linkedin ? `<a class="btn" href="${escape(site.social.linkedin)}">Connect on LinkedIn ↗</a>` : ''}
  </div>
</section>
`;
  
  const head = generateHead({
    title: `Founder's Office, Strategy, Growth & Product | ${site.name}`,
    description: site.description + ": growth and operations at Jumbo Homes, GTM workflows, product frameworks, and a CXO learning book.",
    canonical: site.domain + '/',
    type: 'ProfilePage'
  });
  
  const html = `<!doctype html>
<html lang="${site.language}">
<head>
${head}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${generateHeader()}
<main id="main" class="wrap">
${content}
</main>
${generateFooter()}
</body>
</html>`;
  
  writeFile(path.join(DIST, 'index.html'), html);
};

// Build article page
const buildArticle = (article) => {
  console.log(`Building article: ${article.slug}...`);
  
  const toc = article.tableOfContents ? article.tableOfContents.map(item => 
    `<a href="#${escape(item.id)}">${escape(item.title)}</a>`
  ).join('') : '';
  
  const content = `
<div class="article-head">
  <p class="eyebrow"><a href="/article/">Articles</a> / ${escape(article.eyebrow || article.topic)}</p>
  <h1>${article.shortTitle || article.title}</h1>
  <p class="lead">${escape(article.lead || article.description)}</p>
  <p class="meta">By ${escape(site.author.name)} · ${article.readingTime} min read · Learning note</p>
</div>
<div class="article-layout">
  ${toc ? `<aside class="toc" aria-label="Table of contents">
    <strong>In this article</strong>
    ${toc}
  </aside>` : ''}
  <article class="prose">
    ${article.body}
  </article>
</div>
`;
  
  const head = generateHead({
    title: article.title,
    description: article.description,
    canonical: article.canonical,
    type: 'Article',
    image: article.image,
    imageAlt: article.imageAlt,
    datePublished: article.datePublished,
    dateModified: article.dateModified
  });
  
  const html = `<!doctype html>
<html lang="${site.language}">
<head>
${head}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${generateHeader()}
<main id="main" class="wrap">
${content}
</main>
${generateFooter()}
</body>
</html>`;
  
  const articleDir = path.join(DIST, 'article', article.slug);
  writeFile(path.join(articleDir, 'index.html'), html);
};

// Build article index
const buildArticleIndex = (articles) => {
  console.log('Building article index...');
  
  const articleList = articles.map((article, idx) => `
    <a class="row" href="/article/${escape(article.slug)}/">
      <span class="num">${String(idx + 1).padStart(2, '0')}</span>
      <div>
        <h3>${article.shortTitle || article.title}</h3>
        <p>${escape(article.description)}</p>
      </div>
      <span class="meta">${escape(article.topic)} · ${article.readingTime} min ↗</span>
    </a>
  `).join('');
  
  const content = `
<div class="article-head">
  <p class="eyebrow">02 / Learning in public</p>
  <h1>The notebook</h1>
  <p class="lead">Frameworks, customer understanding, and growth thinking.</p>
</div>
${articleList}
<div class="actions">
  <a class="btn" href="/book/">See the complete book ↗</a>
</div>
`;
  
  const head = generateHead({
    title: 'Articles',
    description: 'Product frameworks, customer understanding, growth metrics, and business thinking.',
    canonical: site.domain + '/article/',
    type: 'website'
  });
  
  const html = `<!doctype html>
<html lang="${site.language}">
<head>
${head}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${generateHeader()}
<main id="main" class="wrap">
${content}
</main>
${generateFooter()}
</body>
</html>`;
  
  writeFile(path.join(DIST, 'article', 'index.html'), html);
};

// Build book page
const buildBook = (articles) => {
  console.log('Building book page...');
  
  const parts = book.parts.map(part => {
    const chapters = part.chapters.map(chapter => {
      if (chapter.articleId) {
        const article = articles.find(a => a.id === chapter.articleId);
        if (article) {
          return `<li><a href="/article/${escape(article.slug)}/">${article.shortTitle || article.title}</a></li>`;
        }
      }
      return `<li><span class="muted">${escape(chapter.title)} <em>(${escape(chapter.status)})</em></span></li>`;
    }).join('');
    
    return `
      <section>
        <h3>Part ${part.number}: ${escape(part.title)}</h3>
        <ol>${chapters}</ol>
      </section>
    `;
  }).join('');
  
  const content = `
<div class="article-head">
  <p class="eyebrow">${escape(book.eyebrow)}</p>
  <h1>${escape(book.title)}</h1>
  <p class="lead">${book.description}</p>
</div>
<article class="prose">
  ${parts}
  <p><a href="/article/">Browse articles ↗</a></p>
</article>
`;
  
  const head = generateHead({
    title: book.title,
    description: book.description,
    canonical: site.domain + '/book/',
    type: 'website'
  });
  
  const html = `<!doctype html>
<html lang="${site.language}">
<head>
${head}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${generateHeader()}
<main id="main" class="wrap">
${content}
</main>
${generateFooter()}
</body>
</html>`;
  
  writeFile(path.join(DIST, 'book', 'index.html'), html);
};

// Generate sitemap
const generateSitemap = (articles) => {
  console.log('Generating sitemap...');
  
  const urls = [
    { loc: site.domain + '/', priority: '1.0' },
    { loc: site.domain + '/article/', priority: '0.9' },
    { loc: site.domain + '/book/', priority: '0.8' },
    ...articles.map(a => ({
      loc: a.canonical,
      priority: '0.8',
      lastmod: a.dateModified || a.datePublished || null
    }))
  ];
  
  const urlsXml = urls.map(url => {
    let entry = `  <url>\n    <loc>${escape(url.loc)}</loc>`;
    if (url.lastmod) entry += `\n    <lastmod>${url.lastmod}</lastmod>`;
    if (url.priority) entry += `\n    <priority>${url.priority}</priority>`;
    entry += '\n  </url>';
    return entry;
  }).join('\n');
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;
  
  writeFile(path.join(DIST, 'sitemap.xml'), sitemap);
};

// Generate robots.txt
const generateRobots = () => {
  console.log('Generating robots.txt...');
  
  const robots = `User-agent: *
Allow: /

Sitemap: ${site.domain}/sitemap.xml`;
  
  writeFile(path.join(DIST, 'robots.txt'), robots);
};

// Generate 404 page
const generate404 = () => {
  console.log('Generating 404 page...');
  
  const content = `
<div class="article-head">
  <p class="eyebrow">404</p>
  <h1>Page not found</h1>
  <p class="lead">The page you're looking for doesn't exist or has been moved.</p>
  <div class="actions">
    <a class="btn primary" href="/">Go to homepage</a>
    <a class="btn" href="/article/">Browse articles</a>
  </div>
</div>
`;
  
  const head = generateHead({
    title: 'Page Not Found',
    description: 'The page you are looking for could not be found.',
    canonical: site.domain + '/404.html',
    type: 'website'
  });
  
  const html = `<!doctype html>
<html lang="${site.language}">
<head>
${head}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${generateHeader()}
<main id="main" class="wrap">
${content}
</main>
${generateFooter()}
</body>
</html>`;
  
  writeFile(path.join(DIST, '404.html'), html);
};

// Copy static assets
const copyAssets = () => {
  console.log('Copying static assets...');
  
  const copy = (src, dest) => {
    if (!fs.existsSync(src)) return;
    
    ensureDir(dest);
    const items = fs.readdirSync(src, { withFileTypes: true });
    
    for (const item of items) {
      const srcPath = path.join(src, item.name);
      const destPath = path.join(dest, item.name);
      
      if (item.isDirectory()) {
        copy(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  };
  
  // Copy from dist/assets if it already exists (CSS, images, PDFs)
  const existingAssets = path.join(DIST, 'assets');
  if (fs.existsSync(existingAssets)) {
    console.log('  Assets already in dist/assets');
  }
  
  // Copy portrait if it exists in root
  const rootPortrait = path.join(ROOT, 'me.png');
  if (fs.existsSync(rootPortrait)) {
    const destPortrait = path.join(ASSETS_DIST, 'vairag-akbari.webp');
    if (!fs.existsSync(destPortrait)) {
      console.log('  Note: me.png exists but assets/vairag-akbari.webp expected');
    }
  }
};

// Main build
const build = () => {
  console.log('Starting build...\n');
  
  // Ensure dist directory
  ensureDir(DIST);
  
  // Get articles
  const articles = getPublishedArticles();
  console.log(`Found ${articles.length} published article(s)\n`);
  
  // Build pages
  buildHomepage(articles);
  buildArticleIndex(articles);
  buildBook(articles);
  articles.forEach(buildArticle);
  
  // Generate metadata files
  generateSitemap(articles);
  generateRobots();
  generate404();
  
  // Copy assets
  copyAssets();
  
  // Copy _redirects if exists
  const redirectsSrc = path.join(DIST, '_redirects');
  if (fs.existsSync(redirectsSrc)) {
    console.log('Netlify _redirects already exists');
  }
  
  console.log('\n✅ Build complete!');
  console.log(`📁 Output: ${DIST}`);
};

// Run build
try {
  build();
} catch (error) {
  console.error('\n❌ Build failed:', error.message);
  console.error(error.stack);
  process.exit(1);
}
