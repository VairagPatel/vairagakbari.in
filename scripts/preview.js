#!/usr/bin/env node
/**
 * Local preview server for vairagakbari.in
 * Serves the dist/ folder with proper MIME types
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8000;
const DIST = path.join(__dirname, '..', 'dist');

// MIME types
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf'
};

const server = http.createServer((req, res) => {
  let filePath = path.join(DIST, req.url === '/' ? 'index.html' : req.url);
  
  // Handle directory requests
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }
  
  // Security: prevent directory traversal
  if (!filePath.startsWith(DIST)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    // Serve 404 page
    const notFoundPath = path.join(DIST, '404.html');
    if (fs.existsSync(notFoundPath)) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(fs.readFileSync(notFoundPath));
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
    return;
  }
  
  // Get file extension and MIME type
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  
  // Read and serve file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
      return;
    }
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
  
  // Log request
  const status = fs.existsSync(filePath) ? 200 : 404;
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - ${status}`);
});

// Check if dist exists
if (!fs.existsSync(DIST)) {
  console.error('❌ Error: dist/ folder not found');
  console.error('Run "npm run build" first to generate the site');
  process.exit(1);
}

server.listen(PORT, () => {
  console.log('\n🚀 Preview server running!\n');
  console.log(`   Local:    http://localhost:${PORT}`);
  console.log(`   Folder:   ${DIST}\n`);
  console.log('Press Ctrl+C to stop\n');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Error: Port ${PORT} is already in use`);
    console.error(`Try a different port: PORT=8001 npm run preview`);
  } else {
    console.error('❌ Server error:', err.message);
  }
  process.exit(1);
});
