#!/usr/bin/env node
/**
 * Create a new article with proper structure
 * Usage: npm run new-article
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT = path.join(__dirname, '..');
const ARTICLES_DIR = path.join(ROOT, 'content', 'articles');
const CONFIG_PATH = path.join(ROOT, 'config', 'site.json');

// Ensure articles directory exists
if (!fs.existsSync(ARTICLES_DIR)) {
  fs.mkdirSync(ARTICLES_DIR, { recursive: true });
}

// Read site config for domain
let domain = 'https://vairagakbari.in';
if (fs.existsSync(CONFIG_PATH)) {
  try {
    const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    domain = config.domain;
  } catch (e) {
    console.warn('Could not read site config, using default domain');
  }
}

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const prompt = (question) => new Promise((resolve) => {
  rl.question(question, resolve);
});

// Convert string to slug
const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Validate slug format
const isValidSlug = (slug) => {
  return /^[a-z0-9-]+$/.test(slug) && !slug.includes('..') && !slug.includes('/');
};

const main = async () => {
  console.log('\n📝 Create a new article\n');
  console.log('This will create a new article folder with meta.json and body.html\n');
  
  try {
    // Get article details
    const title = await prompt('Article title: ');
    if (!title.trim()) {
      console.error('❌ Title is required');
      process.exit(1);
    }
    
    const suggestedSlug = slugify(title);
    const slugPrompt = await prompt(`Article slug [${suggestedSlug}]: `);
    const slug = slugPrompt.trim() || suggestedSlug;
    
    // Validate slug
    if (!isValidSlug(slug)) {
      console.error('❌ Invalid slug format. Use only lowercase letters, numbers, and hyphens.');
      process.exit(1);
    }
    
    // Check if article exists
    const articleDir = path.join(ARTICLES_DIR, slug);
    if (fs.existsSync(articleDir)) {
      console.error(`❌ Article "${slug}" already exists at ${articleDir}`);
      process.exit(1);
    }
    
    const description = await prompt('Short description: ');
    if (!description.trim()) {
      console.error('❌ Description is required');
      process.exit(1);
    }
    
    const topic = await prompt('Topic (e.g., Product, Growth, Analytics): ');
    const topicValue = topic.trim() || 'Learning';
    
    // Generate article ID (lowercase with hyphens)
    const id = slug;
    
    // Create article directory
    fs.mkdirSync(articleDir, { recursive: true });
    
    // Create meta.json
    const meta = {
      id: id,
      title: title.trim(),
      shortTitle: title.trim(),
      slug: slug,
      topic: topicValue,
      eyebrow: `${topicValue} · Learning note`,
      description: description.trim(),
      lead: description.trim(),
      readingTime: null,
      status: 'draft',
      datePublished: null,
      dateModified: null,
      chapterNumber: null,
      partNumber: null,
      canonical: `${domain}/article/${slug}/`,
      image: null,
      imageAlt: null,
      sources: [],
      relatedArticles: [],
      tableOfContents: [
        { id: 'introduction', title: 'Introduction' }
      ]
    };
    
    fs.writeFileSync(
      path.join(articleDir, 'meta.json'),
      JSON.stringify(meta, null, 2),
      'utf8'
    );
    
    // Create body.html template
    const body = `<section id="introduction">
  <h2>Introduction</h2>
  <p>Write your article content here.</p>
  <p>Use semantic HTML with section elements for major parts. Each section should have an id attribute that matches an entry in the tableOfContents in meta.json.</p>
</section>

<section id="next-topic">
  <h2>Your Next Section</h2>
  <p>Continue your article here.</p>
  
  <div class="callout">
    <strong>Callout box</strong>
    <p>Use this style for important notes or key takeaways.</p>
  </div>
</section>

<section id="sources">
  <h2>Sources and further reading</h2>
  <p>List your sources and references here.</p>
</section>
`;
    
    fs.writeFileSync(
      path.join(articleDir, 'body.html'),
      body,
      'utf8'
    );
    
    // Create images folder
    const imagesDir = path.join(articleDir, 'images');
    fs.mkdirSync(imagesDir, { recursive: true });
    fs.writeFileSync(
      path.join(imagesDir, '.gitkeep'),
      '',
      'utf8'
    );
    
    console.log('\n✅ Article created successfully!\n');
    console.log(`   Location: content/articles/${slug}/`);
    console.log(`   ID: ${id}`);
    console.log(`   Slug: ${slug}`);
    console.log(`   Status: draft\n`);
    
    console.log('Next steps:');
    console.log(`   1. Edit content/articles/${slug}/body.html`);
    console.log(`   2. Update content/articles/${slug}/meta.json if needed`);
    console.log(`   3. Add images to content/articles/${slug}/images/ if needed`);
    console.log(`   4. Change status to "published" in meta.json`);
    console.log(`   5. Run "npm run build" to generate the site`);
    console.log(`   6. Run "npm run validate" to check for issues\n`);
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
};

main();
