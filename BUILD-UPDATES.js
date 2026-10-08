// BUILD-UPDATES.js
// Apply these changes to scripts/build.js

// REPLACE the entire buildHomepage function (starting at line 210) with this:

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
  
  // NEW: Capabilities section
  const capabilities = profile.capabilities ? profile.capabilities.map(cap => `
    <article class="capability">
      <h3>${cap.problem}</h3>
      <p><strong>My approach:</strong> ${cap.approach}</p>
      <p class="evidence"><strong>Evidence:</strong> ${cap.evidence}</p>
    </article>
  `).join('') : '';
  
  const content = `
<section class="hero">
  <div>
    <p class="eyebrow">${profile.eyebrow}</p>
    <h1>${profile.headline}</h1>
    <p class="lead">${profile.lead}</p>
    ${profile.value ? `<p class="value-prop">${profile.value}</p>` : ''}
    <div class="actions">
      <a class="btn primary" href="${escape(profile.resumePdf)}">Download résumé ↗</a>
      <a class="btn" href="#${profile.capabilities ? 'capabilities' : 'work'}">See what I can do</a>
    </div>
  </div>
  <figure>
    <img src="${escape(profile.portraitImage)}" alt="${escape(profile.portraitAlt)}" width="928" height="1152" fetchpriority="high">
    <figcaption class="caption">${profile.portraitCaption}</figcaption>
  </figure>
</section>

${profile.capabilities ? `<section id="capabilities">
  <div class="section-head">
    <div>
      <p class="eyebrow">01 / What I can help you solve</p>
      <h2>Business problems<br>I tackle</h2>
    </div>
    <p>I'm a growth operator who diagnoses pipeline issues, improves workflows, and helps teams close more deals.</p>
  </div>
  ${capabilities}
</section>` : ''}

<section id="work">
  <div class="section-head">
    <div>
      <p class="eyebrow">${profile.capabilities ? '02' : '01'} / Work in practice</p>
      <h2>Experience &<br>projects</h2>
    </div>
    <p>Where I've applied these capabilities in real business contexts.</p>
  </div>
  <div class="grid">
    ${workCards}
  </div>
</section>

<section>
  <div class="section-head">
    <div>
      <p class="eyebrow">${profile.capabilities ? '03' : '02'} / Learning in public</p>
      <h2>Frameworks, with<br>the thinking attached.</h2>
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
    <p class="eyebrow">${escape(book.eyebrow || '04 / A book in progress')}</p>
    <h2>${escape(book.title)}</h2>
    <p>${book.description}</p>
    <a class="btn" href="/book/">Open the book ↗</a>
  </div>
</section>

<section>
  <div class="section-head">
    <div>
      <p class="eyebrow">${profile.capabilities ? '05' : '04'} / My toolkit</p>
      <h2>Using today.<br>Learning next.</h2>
    </div>
    <div>
      <p><strong>In practice:</strong> ${profile.toolkit.inPractice}</p>
      <p><strong>Currently learning:</strong> ${profile.toolkit.learning}</p>
      <p class="caption">${profile.toolkit.interest}</p>
    </div>
  </div>
</section>

<section id="contact">
  <p class="eyebrow">${profile.capabilities ? '06' : '05'} / Let's talk</p>
  <h2>Looking for someone to own<br>growth end-to-end?</h2>
  <p class="lead">I'm actively seeking founder's office and growth roles where I can own the customer journey from pipeline to close.</p>
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
      medium: 'Medium',
      substack: 'Substack',
      geeksforgeeks: 'GeeksforGeeks',
      leetcode: 'LeetCode',
      threads: 'Threads'
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
    title: `Growth Operator — Founder's Office & Strategy Roles | ${site.name}`,
    description: "Growth operator targeting founder's office roles. I diagnose pipeline bottlenecks, turn customer insights into revenue, and fix workflows. Currently @ Jumbo Homes.",
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
