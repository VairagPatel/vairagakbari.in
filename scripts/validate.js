#!/usr/bin/env node
/**
 * Validation script for vairagakbari.in
 * Checks for common issues before deployment
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const CONTENT = path.join(ROOT, 'content');
const CONFIG = path.join(ROOT, 'config');

const errors = [];
const warnings = [];

// Utilities
const readJSON = (filepath) => {
  try {
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
  } catch (e) {
    errors.push(`Failed to read ${filepath}: ${e.message}`);
    return null;
  }
};

console.log('🔍 Validating project...\n');

// 1. Check required config files
console.log('Checking configuration files...');
const requiredConfigs = [
  path.join(CONFIG, 'site.json'),
  path.join(CONFIG, 'navigation.json'),
  path.join(CONTENT, 'profile.json'),
  path.join(CONTENT, 'book.json')
];

requiredConfigs.forEach(file => {
  if (!fs.existsSync(file)) {
    errors.push(`Missing required config: ${path.relative(ROOT, file)}`);
  } else {
    readJSON(file); // Validates JSON syntax
  }
});

// 2. Validate site.json
const site = readJSON(path.join(CONFIG, 'site.json'));
if (site) {
  if (!site.domain || !site.domain.startsWith('https://')) {
    errors.push('site.json: domain must start with https://');
  }
  if (!site.name) errors.push('site.json: name is required');
  if (!site.author || !site.author.name) {
    errors.push('site.json: author.name is required');
  }
}

// 3. Validate articles
console.log('Validating articles...');
const articlesDir = path.join(CONTENT, 'articles');
const seenIds = new Set();
const seenSlugs = new Set();
const seenCanonicals = new Set();

if (fs.existsSync(articlesDir)) {
  const articleDirs = fs.readdirSync(articlesDir, { withFileTypes: true })
    .filter(d => d.isDirectory());
  
  articleDirs.forEach(dir => {
    const dirPath = path.join(articlesDir, dir.name);
    const metaPath = path.join(dirPath, 'meta.json');
    const bodyPath = path.join(dirPath, 'body.html');
    
    // Check meta.json exists
    if (!fs.existsSync(metaPath)) {
      warnings.push(`${dir.name}: missing meta.json`);
      return;
    }
    
    const meta = readJSON(metaPath);
    if (!meta) return;
    
    // Required fields
    if (!meta.id) errors.push(`${dir.name}/meta.json: id is required`);
    if (!meta.title) errors.push(`${dir.name}/meta.json: title is required`);
    if (!meta.slug) errors.push(`${dir.name}/meta.json: slug is required`);
    if (!meta.description) errors.push(`${dir.name}/meta.json: description is required`);
    if (!meta.canonical) errors.push(`${dir.name}/meta.json: canonical is required`);
    if (!meta.status) errors.push(`${dir.name}/meta.json: status is required`);
    
    // Validate status
    const validStatuses = ['draft', 'review', 'published'];
    if (meta.status && !validStatuses.includes(meta.status)) {
      errors.push(`${dir.name}/meta.json: status must be one of: ${validStatuses.join(', ')}`);
    }
    
    // Check for duplicates
    if (meta.id) {
      if (seenIds.has(meta.id)) {
        errors.push(`Duplicate article ID: ${meta.id}`);
      }
      seenIds.add(meta.id);
    }
    
    if (meta.slug) {
      if (seenSlugs.has(meta.slug)) {
        errors.push(`Duplicate slug: ${meta.slug}`);
      }
      seenSlugs.add(meta.slug);
      
      // Validate slug format
      if (!/^[a-zA-Z0-9-]+$/.test(meta.slug)) {
        errors.push(`${dir.name}: slug contains invalid characters (use letters, numbers, hyphens only)`);
      }
      
      // Check for path traversal
      if (meta.slug.includes('..') || meta.slug.includes('/')) {
        errors.push(`${dir.name}: slug contains path traversal characters`);
      }
    }
    
    if (meta.canonical) {
      if (seenCanonicals.has(meta.canonical)) {
        errors.push(`Duplicate canonical URL: ${meta.canonical}`);
      }
      seenCanonicals.add(meta.canonical);
      
      // Canonical should match expected pattern
      if (site && meta.slug) {
        const expected = `${site.domain}/article/${meta.slug}/`;
        if (meta.canonical !== expected) {
          warnings.push(`${dir.name}: canonical "${meta.canonical}" doesn't match expected "${expected}"`);
        }
      }
      
      // Canonical must not have fragment
      if (meta.canonical.includes('#')) {
        errors.push(`${dir.name}: canonical URL must not contain fragment (#)`);
      }
    }
    
    // Check body.html for published articles
    if (meta.status === 'published') {
      if (!fs.existsSync(bodyPath)) {
        errors.push(`${dir.name}: published article missing body.html`);
      } else {
        const body = fs.readFileSync(bodyPath, 'utf8');
        
        // Check for section IDs in body match table of contents
        if (meta.tableOfContents) {
          meta.tableOfContents.forEach(item => {
            if (!body.includes(`id="${item.id}"`)) {
              warnings.push(`${dir.name}: table of contents references missing section #${item.id}`);
            }
          });
        }
        
        // Warn about empty body
        if (body.trim().length < 100) {
          warnings.push(`${dir.name}: body.html seems very short`);
        }
      }
    }
    
    // Check dates format
    const dateFields = ['datePublished', 'dateModified'];
    dateFields.forEach(field => {
      if (meta[field]) {
        // ISO 8601 format check
        if (!/^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?Z)?$/.test(meta[field])) {
          warnings.push(`${dir.name}: ${field} should be in ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss.sssZ)`);
        }
      }
    });
    
    // Validate sources array
    if (meta.sources && Array.isArray(meta.sources)) {
      meta.sources.forEach((source, idx) => {
        if (!source.text || !source.url) {
          errors.push(`${dir.name}: sources[${idx}] must have text and url`);
        }
      });
    }
  });
  
  console.log(`  Found ${articleDirs.length} article(s)`);
}

// 4. Check dist output exists
console.log('Checking build output...');
if (!fs.existsSync(DIST)) {
  warnings.push('dist/ directory does not exist - run build first');
} else {
  const requiredFiles = ['index.html', 'sitemap.xml', 'robots.txt', '404.html'];
  requiredFiles.forEach(file => {
    if (!fs.existsSync(path.join(DIST, file))) {
      warnings.push(`dist/${file} is missing`);
    }
  });
  
  // Check assets
  if (!fs.existsSync(path.join(DIST, 'assets', 'style.css'))) {
    warnings.push('dist/assets/style.css is missing');
  }
}

// 5. Validate HTML files in dist
console.log('Validating HTML output...');
if (fs.existsSync(DIST)) {
  const findHtml = (dir, files = []) => {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    items.forEach(item => {
      const fullPath = path.join(dir, item.name);
      if (item.isDirectory()) {
        findHtml(fullPath, files);
      } else if (item.name.endsWith('.html')) {
        files.push(fullPath);
      }
    });
    return files;
  };
  
  const htmlFiles = findHtml(DIST);
  htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const rel = path.relative(DIST, file);
    
    // Check for required elements
    if (!content.includes('<!doctype html>')) {
      warnings.push(`${rel}: missing doctype`);
    }
    if (!content.includes('<html lang=')) {
      warnings.push(`${rel}: missing lang attribute`);
    }
    if (!content.includes('<meta charset=')) {
      warnings.push(`${rel}: missing charset meta tag`);
    }
    if (!content.includes('viewport')) {
      warnings.push(`${rel}: missing viewport meta tag`);
    }
    if (!content.includes('<title>')) {
      errors.push(`${rel}: missing title tag`);
    }
    if (!content.includes('canonical')) {
      warnings.push(`${rel}: missing canonical link`);
    }
    
    // Check for distribution folder references (should never be in dist)
    if (content.includes('/distribution/')) {
      errors.push(`${rel}: contains reference to /distribution/ - this must not be public`);
    }
  });
  
  console.log(`  Checked ${htmlFiles.length} HTML file(s)`);
}

// 6. Check for accidentally committed secrets or temp files
console.log('Checking for sensitive files...');
const sensitivePatterns = [
  '.env',
  '.env.local',
  'credentials.json',
  'secrets.json',
  'private-key',
  'id_rsa'
];

const checkSensitive = (dir, basePath = ROOT) => {
  if (!fs.existsSync(dir)) return;
  
  const items = fs.readdirSync(dir, { withFileTypes: true });
  items.forEach(item => {
    if (item.name === 'node_modules' || item.name === '.git') return;
    
    const fullPath = path.join(dir, item.name);
    const relativePath = path.relative(basePath, fullPath);
    
    if (item.isDirectory()) {
      // Check if distribution folder is inside dist
      if (item.name === 'distribution' && fullPath.startsWith(DIST + path.sep)) {
        errors.push('distribution/ folder found in dist/ - this must not be deployed');
        return;
      }
      checkSensitive(fullPath, basePath);
    } else {
      sensitivePatterns.forEach(pattern => {
        if (item.name.includes(pattern)) {
          warnings.push(`Potentially sensitive file: ${relativePath}`);
        }
      });
    }
  });
};

checkSensitive(DIST, DIST); // Check dist for any distribution folder

// 7. Book chapter validation
console.log('Validating book structure...');
const book = readJSON(path.join(CONTENT, 'book.json'));
if (book && book.parts) {
  book.parts.forEach(part => {
    if (part.chapters) {
      part.chapters.forEach(chapter => {
        if (chapter.articleId) {
          if (!seenIds.has(chapter.articleId)) {
            errors.push(`book.json references unknown article ID: ${chapter.articleId}`);
          }
        } else if (!chapter.title || !chapter.status) {
          errors.push(`book.json: planned chapters need title and status`);
        }
      });
    }
  });
}

// Report results
console.log('\n' + '='.repeat(60));
console.log('VALIDATION RESULTS');
console.log('='.repeat(60) + '\n');

if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ All checks passed!\n');
  process.exit(0);
}

if (errors.length > 0) {
  console.log(`❌ ${errors.length} ERROR(S):\n`);
  errors.forEach(err => console.log(`   • ${err}`));
  console.log();
}

if (warnings.length > 0) {
  console.log(`⚠️  ${warnings.length} WARNING(S):\n`);
  warnings.forEach(warn => console.log(`   • ${warn}`));
  console.log();
}

if (errors.length > 0) {
  console.log('Build should not be deployed until errors are fixed.\n');
  process.exit(1);
} else {
  console.log('✅ No critical errors. Warnings should be reviewed.\n');
  process.exit(0);
}
