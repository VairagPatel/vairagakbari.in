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

// Get all projects
const getProjects = () => {
  const projectsDir = path.join(CONTENT, 'projects');
  const projects = [];
  
  if (!fs.existsSync(projectsDir)) return projects;
  
  const projectFiles = fs.readdirSync(projectsDir)
    .filter(f => f.endsWith('.json'));
  
  for (const file of projectFiles) {
    const projectPath = path.join(projectsDir, file);
    const project = readJSON(projectPath);
    projects.push(project);
  }
  
  // Sort: implemented first, then by date
  return projects.sort((a, b) => {
    if (a.status === 'Implemented' && b.status !== 'Implemented') return -1;
    if (a.status !== 'Implemented' && b.status === 'Implemented') return 1;
    return 0;
  });
};

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
  // Get all verified social links
  const socialLinks = [];
  const socialPlatforms = {
    linkedin: 'LinkedIn',
    github: 'GitHub',
    twitter: 'X',
    instagram: 'Instagram',
    medium: 'Medium',
    substack: 'Substack',
    geeksforgeeks: 'GeeksforGeeks',
    leetcode: 'LeetCode',
    threads: 'Threads'
  };
  
  Object.entries(socialPlatforms).forEach(([key, label]) => {
    if (site.social[key]) {
      socialLinks.push(`<a href="${escape(site.social[key])}">${escape(label)}</a>`);
    }
  });
  
  return `<footer class="wrap footer">
  <span>${escape(navigation.copyright)}</span>
  <span>${escape(site.author.role)} · ${escape(site.author.location)}</span>
  ${socialLinks.join('')}
</footer>`;
};

// Build homepage
const buildHomepage = (articles, projects) => {
  console.log('Building homepage...');
  
  // Use profile.projects for homepage display (which references the detailed project files)
  const featuredProjects = profile.projects || projects;
  
  // Featured projects section
  const projectCards = featuredProjects.map(project => {
    const statusBadge = project.status === 'Planning Stage' 
      ? '<span class="badge planning">Planning Stage</span>' 
      : '<span class="badge implemented">Implemented</span>';
    
    const techStack = project.technologies 
      ? (Array.isArray(project.technologies) ? project.technologies.slice(0, 5) : [])
      : [];
    
    const metrics = project.metrics ? `
      <div class="project-metrics">
        ${project.metrics.apiRoutes ? `<span>${project.metrics.apiRoutes} API routes</span>` : ''}
        ${project.metrics.pages ? `<span>${project.metrics.pages} pages</span>` : ''}
        ${project.metrics.databaseModels || project.metrics.roles ? `<span>${project.metrics.databaseModels || project.metrics.roles} ${project.metrics.databaseModels ? 'models' : 'roles'}</span>` : ''}
      </div>
    ` : '';
    
    return `
    <article class="project-card">
      <div class="project-header">
        <h3><a href="${escape(project.caseStudyUrl || '#')}">${escape(project.name)}</a></h3>
        ${statusBadge}
      </div>
      <p class="project-tagline">${escape(project.tagline)}</p>
      <p class="project-description">${escape(project.description)}</p>
      <p class="project-differentiator"><strong>Key:</strong> ${escape(project.differentiator)}</p>
      ${metrics}
      <div class="project-tech">
        ${techStack.map(tech => `<span class="tech-tag">${escape(tech)}</span>`).join('')}
      </div>
      <div class="project-links">
        <a href="${escape(project.caseStudyUrl || '#')}" class="btn-link">View case study →</a>
      </div>
    </article>
    `;
  }).join('');
  
  // FDE section
  const fdeCapabilities = profile.fde.capabilities.map(cap => `
    <div class="fde-capability">
      <h4>${escape(cap.title)}</h4>
      <p>${escape(cap.description)}</p>
    </div>
  `).join('');
  
  const fdeExamples = profile.fde.examples.map(example => `
    <div class="fde-example">
      <strong>${escape(example.project)}:</strong> ${escape(example.application)}
    </div>
  `).join('');
  
  // Experience section
  const experienceItems = profile.experience.slice(0, 3).map((exp, idx) => `
    <article class="experience-item">
      <p class="meta">${escape(exp.period)} · ${escape(exp.type)}</p>
      <h3>${escape(exp.title)}</h3>
      <p>${escape(exp.description)}</p>
      <ul class="achievements">
        ${exp.achievements.slice(0, 3).map(ach => `<li>${escape(ach)}</li>`).join('')}
      </ul>
      <div class="tech-stack">
        ${exp.technologies.slice(0, 5).map(tech => `<span class="tag">${escape(tech)}</span>`).join('')}
      </div>
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
    <p class="value-prop">${profile.value}</p>
    <div class="actions">
      <a class="btn primary" href="${escape(profile.resumePdf)}">Download résumé ↗</a>
      <a class="btn" href="#projects">View projects</a>
    </div>
  </div>
  <figure>
    <img src="${escape(profile.portraitImage)}" alt="${escape(profile.portraitAlt)}" width="928" height="1152" fetchpriority="high">
    <figcaption class="caption">${profile.portraitCaption}</figcaption>
  </figure>
</section>

<section id="projects">
  <div class="section-head">
    <div>
      <p class="eyebrow">01 / Featured Projects</p>
      <h2>Building real<br>products</h2>
    </div>
    <p>Full-stack applications, geospatial systems, and AI-powered workflows. From problem understanding through architecture, implementation, and deployment.</p>
  </div>
  <div class="projects-grid">
    ${projectCards}
  </div>
</section>

<section id="fde">
  <div class="section-head">
    <div>
      <p class="eyebrow">02 / Forward Deployed Engineering</p>
      <h2>Engineering at the intersection of product, customers, and systems</h2>
    </div>
    <p>${escape(profile.fde.description)}</p>
  </div>
  <div class="fde-workflow">
    ${profile.fde.workflow.map(step => `<div class="workflow-step">${escape(step)}</div>`).join('<span class="arrow">→</span>')}
  </div>
  <div class="fde-capabilities-grid">
    ${fdeCapabilities}
  </div>
  <div class="fde-examples">
    <h3>Demonstrated through projects:</h3>
    ${fdeExamples}
  </div>
</section>

<section id="experience">
  <div class="section-head">
    <div>
      <p class="eyebrow">03 / Experience & Technical Background</p>
      <h2>What I've built<br>& learned</h2>
    </div>
    <p>Personal projects, automation workflows, and hands-on technical experience.</p>
  </div>
  <div class="experience-grid">
    ${experienceItems}
  </div>
</section>

<section>
  <div class="section-head">
    <div>
      <p class="eyebrow">04 / Learning in public</p>
      <h2>Frameworks, with<br>the thinking attached</h2>
    </div>
    <p>I document what I'm learning through articles: the question, the framework, and a worked example.</p>
  </div>
  ${featuredArticles}
  <div class="actions">
    <a href="/article/">Browse all articles ↗</a>
  </div>
</section>

<section>
  <div class="book">
    <p class="eyebrow">05 / A book in progress</p>
    <h2>${escape(book.title)}</h2>
    <p>${book.description}</p>
    <a class="btn" href="/book/">Open the book ↗</a>
  </div>
</section>

<section>
  <div class="section-head">
    <div>
      <p class="eyebrow">06 / Technical toolkit</p>
      <h2>Technologies I<br>work with</h2>
    </div>
    <div>
      <p><strong>Built with:</strong> ${profile.toolkit.inPractice}</p>
      <p><strong>Currently learning:</strong> ${profile.toolkit.learning}</p>
      <p class="caption">${profile.toolkit.interest}</p>
    </div>
  </div>
</section>

<section id="contact">
  <p class="eyebrow">07 / Let's connect</p>
  <h2>Looking for forward deployed<br>or full-stack engineering roles?</h2>
  <p class="lead">I'm actively seeking opportunities where I can build technical solutions that directly address customer and business problems.</p>
  <div class="actions">
    <a class="btn primary" href="mailto:${escape(site.contact.email)}">Email me</a>
    ${site.social.linkedin ? `<a class="btn" href="${escape(site.social.linkedin)}">Connect on LinkedIn ↗</a>` : ''}
  </div>
  ${(() => {
    const socialLinks = [];
    const socialPlatforms = {
      github: 'GitHub',
      twitter: 'X',
      instagram: 'Instagram',
      medium: 'Medium'
    };
    
    Object.entries(socialPlatforms).forEach(([key, label]) => {
      if (site.social[key]) {
        socialLinks.push(`<a href="${escape(site.social[key])}">${escape(label)} ↗</a>`);
      }
    });
    
    if (socialLinks.length > 0) {
      return `<p class="muted" style="margin-top: 24px;">Also find me on: ${socialLinks.join(' · ')}</p>`;
    }
    return '';
  })()}
</section>
`;
  
  const head = generateHead({
    title: `Forward Deployed Engineer | Full-Stack & AI Builder | ${site.name}`,
    description: "Full-stack engineer building intelligent products and connected systems. SnapCart, Rydex, and Health Map case studies. React, Next.js, TypeScript, MongoDB, AI integrations.",
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

// Build project case study page
const buildProjectPage = (project) => {
  console.log(`Building project page: ${project.slug}...`);
  
  const content = `
<div class="article-head">
  <p class="eyebrow"><a href="/#projects">Projects</a> / ${escape(project.status)}</p>
  <h1>${escape(project.title)}</h1>
  <p class="lead">${escape(project.description)}</p>
  <p class="meta">${escape(project.date)}</p>
</div>

<article class="prose project-detail">
  ${project.status === 'Planning Stage' ? `
  <div class="callout planning-notice">
    <strong>Project Status: Planning & Architecture Stage</strong>
    <p>This project is currently in the planning and system design phase. The architecture, features, and technical approach described below represent proposed solutions based on requirements analysis and research, not deployed implementation.</p>
  </div>
  ` : ''}
  
  <section id="overview">
    <h2>Problem & Solution</h2>
    <div class="problem-solution">
      <div>
        <h3>Problem</h3>
        <p>${escape(project.problem || project.description)}</p>
      </div>
      <div>
        <h3>${project.status === 'Planning Stage' ? 'Proposed Solution' : 'Solution'}</h3>
        <p>${escape(project.proposedSolution || project.solution)}</p>
      </div>
    </div>
  </section>
  
  ${project.metrics ? `
  <section id="metrics">
    <h2>Technical Metrics</h2>
    <div class="metrics-grid">
      ${project.metrics.apiRoutes ? `<div class="metric-card"><strong>${project.metrics.apiRoutes}</strong><span>API Routes</span></div>` : ''}
      ${project.metrics.pages ? `<div class="metric-card"><strong>${project.metrics.pages}</strong><span>Pages</span></div>` : ''}
      ${project.metrics.databaseModels ? `<div class="metric-card"><strong>${project.metrics.databaseModels}</strong><span>Database Models</span></div>` : ''}
      ${project.metrics.userRoles ? `<div class="metric-card"><strong>${project.metrics.userRoles}</strong><span>User Roles</span></div>` : ''}
      ${project.metrics.onboardingSteps ? `<div class="metric-card"><strong>${project.metrics.onboardingSteps}</strong><span>Onboarding Steps</span></div>` : ''}
    </div>
  </section>
  ` : ''}
  
  <section id="technologies">
    <h2>Technology Stack</h2>
    <div class="tech-categories">
      ${Object.entries(project.technologies).map(([category, techs]) => `
        <div class="tech-category">
          <h4>${category.charAt(0).toUpperCase() + category.slice(1)}</h4>
          <div class="tech-list">
            ${(Array.isArray(techs) ? techs : [techs]).map(tech => `<span class="tech-badge">${escape(tech)}</span>`).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  </section>
  
  ${project.roles ? `
  <section id="roles">
    <h2>User Roles & Features</h2>
    ${project.roles.map(role => `
      <div class="role-card">
        <h3>${escape(role.name)}</h3>
        <ul>
          ${role.features.map(feature => `<li>${escape(feature)}</li>`).join('')}
        </ul>
      </div>
    `).join('')}
  </section>
  ` : ''}
  
  ${project.orderLifecycle || project.bookingLifecycle ? `
  <section id="lifecycle">
    <h2>${project.orderLifecycle ? 'Order' : 'Booking'} Lifecycle</h2>
    <div class="lifecycle-flow">
      ${(project.orderLifecycle || project.bookingLifecycle).map((stage, idx) => `
        <div class="lifecycle-stage">
          <div class="stage-number">${idx + 1}</div>
          <h4>${escape(stage.stage)}</h4>
          <p>${escape(stage.description)}</p>
        </div>
        ${idx < (project.orderLifecycle || project.bookingLifecycle).length - 1 ? '<div class="stage-arrow">→</div>' : ''}
      `).join('')}
    </div>
  </section>
  ` : ''}
  
  ${project.partnerOnboarding ? `
  <section id="onboarding">
    <h2>Partner Onboarding Workflow</h2>
    <div class="onboarding-steps">
      ${project.partnerOnboarding.map(step => `
        <div class="onboarding-step">
          <div class="step-number">Step ${step.step}</div>
          <h4>${escape(step.title)}</h4>
          <p>${escape(step.description)}</p>
        </div>
      `).join('')}
    </div>
  </section>
  ` : ''}
  
  <section id="architecture">
    <h2>${project.status === 'Planning Stage' ? 'Proposed Architecture' : 'System Architecture'}</h2>
    <p>${escape((project.architecture && project.architecture.description) || (project.proposedArchitecture && project.proposedArchitecture.description) || '')}</p>
    <div class="architecture-layers">
      ${((project.architecture && project.architecture.layers) || (project.architecture && project.architecture.components) || (project.proposedArchitecture && project.proposedArchitecture.components) || []).map(layer => `
        <div class="arch-layer">
          <h4>${escape(layer.name)}</h4>
          <p class="tech-label">${escape(layer.tech)}</p>
          ${layer.status ? `<span class="status-badge">${escape(layer.status)}</span>` : ''}
          <ul>
            ${(Array.isArray(layer.responsibilities) ? layer.responsibilities : []).map(resp => `<li>${escape(resp)}</li>`).join('')}
          </ul>
        </div>
      `).join('')}
    </div>
  </section>
  
  ${project.keyFeatures ? `
  <section id="features">
    <h2>Key Engineering Features</h2>
    ${project.keyFeatures.map(feature => `
      <div class="feature-card">
        <h3>${escape(feature.title)}</h3>
        <p>${escape(feature.description)}</p>
      </div>
    `).join('')}
  </section>
  ` : ''}
  
  ${project.engineeringDecisions || project.architectureRationale ? `
  <section id="decisions">
    <h2>Engineering Decisions & Tradeoffs</h2>
    ${(project.engineeringDecisions || project.architectureRationale || []).map(decision => `
      <div class="decision-card">
        <h4>${escape(decision.decision)}</h4>
        <p><strong>Rationale:</strong> ${escape(decision.rationale)}</p>
        ${decision.tradeoffs ? `<p><strong>Tradeoffs:</strong> ${escape(decision.tradeoffs)}</p>` : ''}
        ${decision.considerations ? `<p><strong>Considerations:</strong> ${escape(decision.considerations)}</p>` : ''}
      </div>
    `).join('')}
  </section>
  ` : ''}
  
  ${project.challenges ? `
  <section id="challenges">
    <h2>Challenges & Solutions</h2>
    ${project.challenges.map(challenge => `
      <div class="challenge-card">
        <h4>${escape(challenge.challenge)}</h4>
        <p><strong>Solution:</strong> ${escape(challenge.solution)}</p>
      </div>
    `).join('')}
  </section>
  ` : ''}
  
  ${project.lessonsLearned ? `
  <section id="lessons">
    <h2>Lessons Learned</h2>
    <ul class="lessons-list">
      ${project.lessonsLearned.map(lesson => `<li>${escape(lesson)}</li>`).join('')}
    </ul>
  </section>
  ` : ''}
  
  ${project.projectRoadmap ? `
  <section id="roadmap">
    <h2>Project Roadmap</h2>
    ${project.projectRoadmap.map(phase => `
      <div class="roadmap-phase ${phase.status.toLowerCase().replace(' ', '-')}">
        <div class="phase-header">
          <h4>${escape(phase.phase)}</h4>
          <span class="phase-status">${escape(phase.status)}</span>
        </div>
        <p>${escape(phase.description)}</p>
        ${phase.deliverables ? `
          <p class="deliverables"><strong>Deliverables:</strong> ${phase.deliverables.map(d => escape(d)).join(', ')}</p>
        ` : ''}
      </div>
    `).join('')}
  </section>
  ` : ''}
  
  <section id="back">
    <div class="actions">
      <a href="/#projects" class="btn">← Back to all projects</a>
      ${project.github ? `<a href="${escape(project.github)}" class="btn">View on GitHub ↗</a>` : ''}
      ${project.demo ? `<a href="${escape(project.demo)}" class="btn primary">View live demo ↗</a>` : ''}
    </div>
  </section>
</article>
`;
  
  const head = generateHead({
    title: project.title,
    description: project.description,
    canonical: project.canonical,
    type: 'Article',
    datePublished: project.datePublished
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
  
  const projectDir = path.join(DIST, 'projects', project.slug);
  writeFile(path.join(projectDir, 'index.html'), html);
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
const generateSitemap = (articles, projects) => {
  console.log('Generating sitemap...');
  
  const urls = [
    { loc: site.domain + '/', priority: '1.0' },
    { loc: site.domain + '/article/', priority: '0.9' },
    { loc: site.domain + '/book/', priority: '0.8' },
    ...projects.map(p => ({
      loc: p.canonical,
      priority: '0.9',
      lastmod: p.datePublished || null
    })),
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
  
  // Get projects and articles
  const projects = getProjects();
  const articles = getPublishedArticles();
  console.log(`Found ${projects.length} project(s)`);
  console.log(`Found ${articles.length} published article(s)\n`);
  
  // Build pages
  buildHomepage(articles, projects);
  projects.forEach(buildProjectPage);
  buildArticleIndex(articles);
  buildBook(articles);
  articles.forEach(buildArticle);
  
  // Generate metadata files
  generateSitemap(articles, projects);
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
