# Master prompt — Vairag Akbari’s portfolio and publishing system

Copy everything below into your coding agent. Attach the current portfolio project, your latest verified résumé, and any article drafts. This is an implementation brief, not a claim that the upgrades are already live.

---

You are my website engineer, content systems designer, SEO specialist, and growth editor. Upgrade my existing portfolio into a maintainable, production-ready, static HTML publishing system. Implement it, validate it, and document exactly how I use it. Do not stop at a proposal.

## 1. My positioning and constraints

My name is Vairag Akbari. My intended public website is https://vairagakbari.in. I am applying for founder’s office, strategy, growth, product, and relevant GTM engineering roles. I work on business operations, sales funnels, customer understanding, and practical agent workflows. I am learning SQL, Excel, Mixpanel, frameworks, funnels, and product analytics. Keep learning separate from demonstrated experience.

The site should show my business thinking through concise work examples and useful articles. Do not add software-development portfolio projects, invented results, fake testimonials, fake newsletter subscribers, fake employers, or unverified proficiency. GTM agents are relevant when tied to a real business workflow; describe designed, prototyped, and deployed work accurately.

I like the existing design. Preserve its typography, colours, portrait treatment, content hierarchy, and simple feel. Improve consistency, mobile usability, accessibility, and maintainability without redesigning it into a dashboard or SaaS app. Write naturally, in short, concrete sentences. Avoid inflated first-person claims.

## 2. Inspect before editing

Read the actual current source, project instructions, hosting configuration, and supplied materials. Preserve the existing repository, Site identity, working URLs, and deployment method. The previously built version has a home page, /article/, /book/, /article/Job-To-Be-Done/, a résumé, a portrait, a stylesheet, sitemap, and robots file. Verify the current state instead of assuming nothing has changed.

Do not overwrite my current public domain, change sharing, connect accounts, publish to social platforms, or send newsletters just because a publishing workflow exists. Honour the permissions and hosting instructions active in this session. Prepare external publishing drafts by default; actual posting requires my explicit instruction. Keep my current audience unless I request a change.

## 3. Architecture: separate pages, shared source

The final website must be static HTML and CSS. Each article must have its own physical HTML file and independently accessible URL. Core text, headings, links, and metadata must be present in the initial HTML without JavaScript. No SPA, database, CMS subscription, React conversion, or login is necessary.

Use a small build-time generator to avoid repeatedly editing the same header, metadata, and article lists. Reuse an existing suitable build tool; otherwise use a minimal dependency-light approach. Document prerequisites and one command each for build, preview, and validation. Visitors must not need that tooling: dist/ is a complete portable static website.

Maintain one source of truth. The author edits source content, then the build produces HTML. Do not require manual edits to both sources and generated output. Shared templates must be resolved at build time, not through browser JavaScript or server-side includes.

Implement this structure, adapting names only when necessary to preserve the current project:

```text
config/
  site.json                    # identity, domain, verified social URLs, contact
  navigation.json              # navigation and footer links
content/
  profile.json                 # introduction, role focus, work, toolkit
  book.json                    # parts, order, article IDs, planned topics
  articles/
    job-to-be-done/
      meta.json                # per-article metadata and workflow status
      body.html                # HTML fragment: article text and diagrams
    revenue-tree/
      meta.json                # draft example, excluded from production
      body.html
src/
  templates/
    layout.html
    article.html
    article-index.html
    book.html
  assets/
    css/site.css
    js/site.js                 # only if useful; reading must work without it
    images/vairag-akbari.webp
    resume/vairag-akbari-resume.pdf
    articles/job-to-be-done/    # original diagrams or supplied article images
scripts/
  build.*
  validate.*
  new-article.*
  preview.*
distribution/                  # private working files: NEVER ship in dist
  job-to-be-done/
    source.json                # article ID, revision, canonical, last generated
    linkedin-post.md
    linkedin-article.md
    instagram-carousel.md
    x-thread.md
    threads-posts.md
    substack-digest.md
    medium.md
    gfg-review.md
    leetcode-review.md
    other-channels.md
    publishing-log.json
docs/
  EDITING-GUIDE.md
  PUBLISHING-CHECKLIST.md
  PLATFORM-GUIDE.md
  SEO-GUIDE.md
  DEPLOYMENT.md
  CHANGELOG.md
dist/                          # generated public output only
  index.html
  article/index.html
  article/Job-To-Be-Done/index.html
  book/index.html
  assets/...
  sitemap.xml
  robots.txt
  feed.xml
  404.html
```

A new article starts with new-article, creating its own folder, draft metadata, and body. Show an exact command that works with the chosen implementation. It must not silently overwrite an existing article. Validate slugs, duplicate IDs, missing required fields, and path traversal. Keep a draft excluded until I deliberately mark it for publication.

Retain /article/Job-To-Be-Done/ exactly. Use lowercase kebab-case for new URLs unless there is an existing URL to preserve. Article IDs should be stable even when titles change. If a published slug changes, prepare a permanent redirect and update internal references. Never silently break old links or section anchors.

## 4. Article and page experience

Each article page needs a unique title, short description, author, accurate publication/update dates when known, reading time derived from the body, semantic headings, section anchors, an accessible contents list, relevant visual explanations, sources, and related articles when they actually exist. Do not display empty components or dead links.

Use accessible HTML or SVG for exact diagrams. Put the diagram’s reasoning in accompanying text. Do not use AI-generated images for precise numeric charts. Do not reproduce a reference book’s text or diagrams without permission. User-provided PDFs may inform research but must not be redistributed by default.

Support /article/Job-To-Be-Done/#sub-topic with a matching id="sub-topic". Every fragment must resolve to a visible heading or section. A fragment is a jump within one article, not a separate indexed document. Give a topic its own page only if it merits a substantial standalone article.

Build the homepage article list, article archive, sitemap, feed, and book links from published article metadata. The book groups the existing article pages; do not duplicate complete articles into indexable chapter copies. Planned chapters appear as plain text with an honest status, never as broken links.

Preserve résumé and contact links. Only display social profiles whose URLs I have supplied or verified. Instagram, X, GFG, Substack, Threads, or LeetCode accounts must not be invented from my name. An unavailable profile can be null in config and hidden publicly.

## 5. Per-page metadata: unique values, shared generator

Different pages require different values; they do not require a different random collection of tags. Render one consistent head template from each page’s metadata.

Every public indexable page must have:
- UTF-8, viewport, correct document language, and a site-specific favicon.
- A unique, descriptive title with the brand used once.
- A useful meta description summarising that page. Treat length as an editorial guideline, not a ranking formula.
- One absolute HTTPS self-canonical URL with no tracking parameters or fragment.
- Open Graph title, description, URL, site name, and correct type.
- X/Twitter card metadata appropriate to available assets, with page-specific title and description.
- Suitable JSON-LD matching visible facts.

Use ProfilePage with Person for the homepage where appropriate; CollectionPage for archive/book navigation; Article or BlogPosting for articles; BreadcrumbList for actual visible breadcrumbs when useful. Do not add ratings, awards, FAQs, or rich-result schemas just to obtain search features. Do not fabricate publisher organisations or social identities.

For articles, expose headline, description, author name and author URL, mainEntityOfPage, accurate datePublished/dateModified, and an image only if a suitable real asset exists. Set article publication metadata consistently. Do not reset datePublished when deploying. Change dateModified only for meaningful editorial changes. When historical dates cannot be verified, omit them until supplied rather than backdating.

When a supplied or explicitly requested sharing image exists, use an absolute public image URL, correct dimensions and useful alt text. Without one, use an appropriate summary card and omit image fields. Do not reference nonexistent files or automatically start generating social images. Never reuse a misleading article image from another topic.

Omit meta keywords and invented SEO scores. Default index/follow need not be explicitly repeated. Keep staged/draft material protected and out of production output; noindex is not access control. If a public staging site is required, make it noindex, and ensure the production build cannot accidentally inherit that setting. Do not block a page in robots.txt and assume a crawler will still read its noindex tag.

Use the provided ARTICLE-METADATA.example.json as a data-shape example. Validate and escape HTML attributes, text, URLs, and embedded JSON-LD correctly; input containing </script> must not break out of JSON-LD. Article body HTML is trusted author input, not a public upload endpoint.

## 6. Website-first publishing pipeline

Implement a file-based editorial workflow, not automatic posting:

Draft → reviewed → published on the website → website checked → channel drafts approved → manually distributed → measured → updated.

The metadata status controls inclusion in the public build. A successful build alone does not prove an article is live. Record actual public verification separately. If publication fails, do not advance the log or announce success.

For each approved website article, prepare a separate distribution folder and separate files for the named platforms. All variants must derive from the same reviewed article revision, not introduce unverified statistics or personal stories. Record the source revision so later article edits can flag variants as stale. Do not automatically rewrite or repost content already distributed.

Each channel file contains: format, purpose, audience, ready-to-review draft or an explicit skip reason, destination link if relevant, suggested visual, image alt text when relevant, factual checks, and publication status. Mark GFG/LeetCode as not applicable when appropriate instead of forcing every article into every channel.

A publishing log needs platform, status, source revision, approved_at, published_at, actual platform URL, UTM URL where applicable, and notes. Keep missing values null. Distinguish draft-ready, approved, submitted, published, rejected, skipped, and needs-update. GFG submission is not publication. A human marking a checklist is not proof an API completed a post.

Use clean canonical URLs on the website and in structured data. Distribution links can append ?utm_source=linkedin&utm_medium=social&utm_campaign=job-to-be-done before any #fragment. Keep campaign names consistent. Do not add campaign parameters to internal navigation.

## 7. Platform adaptation rules

Treat recommended lengths and slide counts as editorial choices; check current account/platform limits before delivery. Do not claim universal canonical controls, guaranteed clickable captions, free API access, or automatic cross-posting capabilities.

- LinkedIn post: one practical insight, short paragraphs, one diagram/carousel idea, and a relevant link. Avoid engagement bait.
- LinkedIn article: a distinct, useful professional adaptation with its own angle and a clear source link. Do not present a source credit as a canonical tag. A linked excerpt is the safer default if protecting the full original from duplication is the priority.
- Instagram: a readable carousel outline (suggest 5–7 slides, not a platform maximum), caption, alt text, and profile/story link instruction only when supported by the account. Do not assume a typed caption URL is clickable.
- X: a concise standalone post or numbered thread. Adapt for current account limits. Include a useful takeaway before the link.
- Threads: a conversational insight and a genuine discussion question, optionally a short sequence. Avoid mechanically copying the X thread.
- Substack: a chapter digest or a distinct essay excerpt with links to the website and book. Keep subscriber management on the chosen service; do not build a fake subscribe form. Sending to subscribers requires authorisation.
- Medium: prefer an adapted excerpt. If I choose full republication, check current policies and use its import/canonical mechanism where supported, then verify the result. That mechanism is not a guarantee Google selects my original.
- GeeksforGeeks: editorial evaluation first. Check current topic suitability, originality, reuse, AI-content, and submission requirements. Its published policy warns against AI-generated submissions and plagiarism. Do not generate submission-ready GFG prose where that conflicts with the policy; create a human-writing brief and checklist instead. Do not assume an article already on my site is eligible, or that I can control canonical tags or add promotional links.
- LeetCode: optional for genuinely relevant SQL/problem-solving explanations or suitable interview discussion. Not a general distribution channel for JTBD, CXO essays, or marketing funnels. For unrelated articles, create a file explaining “skip—audience mismatch,” not a promotional draft. Check current rules for any relevant post; avoid contest violations or copied solutions.
- Pinterest: a useful original diagram/pin brief and article destination link.
- YouTube/Shorts: a concise explanation script with a source link in an appropriate supported location.
- Reddit/Quora: answer a real relevant question substantively. Follow community rules and disclose affiliation where applicable; do not spam links.
- DEV/Hashnode: optional only for genuinely relevant technical analytics or automation articles; do not shift the main portfolio toward software development.
- WhatsApp/Telegram communities: prepare a short relevant summary; no unsolicited bulk distribution.

Prioritise my site + LinkedIn, then one sustainable secondary channel. The system should support many channels without obliging me to publish everywhere.

## 8. SEO principles and honest expectations

Original examples, useful content, clear navigation, crawlable HTML, accurate metadata, internal links, fast pages, and relevant earned references form the foundation. Publishing first is a workflow choice, not a guarantee of source attribution, rankings, or indexation. Social links do not automatically pass ranking value. Do not describe duplicate content as an automatic penalty.

Canonical tags are signals. Google’s current syndication guidance does not recommend relying on cross-domain canonicals to prevent syndicated duplication; where a partner can exclude the syndicated copy from indexing, that is a stronger solution for that specific purpose. Do not noindex my original article. If a platform offers neither suitable controls nor acceptable reuse terms, favour a useful excerpt or skip full republication.

No fixed “wait 24/48/72 hours” rule guarantees the original will rank. Check that the original is public, returns 200, is internally linked, and is in the sitemap. Search Console inspection is helpful if access exists; do not fabricate indexing status or promise an indexing deadline.

Do not publish empty SEO landing pages for every keyword, separate shallow pages for every subheading, or my private channel drafts. There must be no public /distribution/ copies competing with my articles.

## 9. Production reliability

- Deterministic build: the same source produces the same output; draft content, logs, credentials, source maps containing secrets, and internal notes stay out of dist.
- Validate required metadata, allowed URLs, duplicate slugs/canonicals, missing assets, links, fragments, malformed JSON-LD, sitemap XML, and feed XML.
- All internal pages use consistent domain and trailing-slash rules. Implement host-specific permanent redirects for HTTP/www or legacy paths only after confirming the selected host’s mechanism.
- Real 404 responses for unknown paths, HTTPS, correct content types, and cache rules: long caching for versioned assets; suitable revalidation for HTML/feed/sitemap.
- Mobile layouts, visible keyboard focus, semantic landmarks, skip navigation, descriptive links, accessible contrast, reduced motion, image dimensions, and no sideways overflow at typical phone widths or enlarged text.
- Compress images and avoid lazy loading the main above-the-fold portrait; lazy load appropriate below-the-fold images. Avoid unnecessary fonts, embeds, trackers, and JavaScript.
- Apply security headers that the host supports and validate they do not break assets. No credentials in HTML or committed config. Do not invent host settings that are not supported.
- Tracking is optional and absent unless I supply a chosen account/configuration. If enabled, document event definitions such as article view, résumé click, and contact click. These are behavioural signals, not proof of a qualified lead or interview.
- Preserve Git history and document backup/rollback. Reuse the actual hosting flow. Do not create a new Site identity for an update.

## 10. What I need to keep changing

Create a plain-language guide naming the actual files and exact fields. Cover:
1. Profile/role changes, verified work examples, résumé and portrait.
2. Social handles, contact details, and domain configuration.
3. A new article’s title, slug, summary, topic, body, heading IDs, sources, media, status, and book chapter.
4. Editing an existing article while preserving URLs and publication dates.
5. Adding or moving a book chapter by article ID without copying its text.
6. Generating and reviewing platform-specific drafts after the website article is live.
7. Logging external publication URLs and marking outdated adaptations.
8. Reviewing broken links, public indexing, and meaningful business outcomes monthly.
9. Deployment and rollback commands and any manual domain verification steps.

Explain what is automatic: archive lists, navigation from config, metadata rendering, reading time, sitemap, feed, book references, related links from valid IDs, and draft exclusion. I should not manually edit ten files to publish one article.

## 11. Acceptance and handoff

Test one real article through the complete local workflow and show evidence. Do not create a fake public article just to test automation. Use a draft fixture excluded from dist. Verify the existing JTBD route and #sub-topic anchor survive, page-specific metadata differs correctly, the résumé loads, and draft/channel files are not publicly emitted.

Check desktop and mobile presentation where available, keyboard navigation, and reading with JavaScript disabled. Validate production output once after the final edits. Report checks actually run and limitations honestly; do not call the work production-ready merely because it builds.

Deliver:
- Updated working project preserving my design and verified content.
- Generated independent HTML pages, shared CSS and only necessary JS.
- A reusable article template and working creation/build/validation commands.
- Per-article metadata and per-platform private draft files.
- Separate editing, publishing, platform, SEO, and deployment guides.
- A change summary, validation results, actual preview/deployment result, and remaining owner actions.

Proceed with sensible defaults. Ask only when a missing fact blocks safe implementation. Never invent achievements, social handles, credentials, account access, publication dates, or successful posting. If a requested platform is unsuitable or disallows the intended workflow, explain that and preserve the useful remainder of the system.

---

## Evidence notes for the implementing agent

Sources checked on 24 September 2026. Recheck platform rules before using them; these links are not permission to publish.

- Google canonical consolidation: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google syndication guidance: https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting
- Medium canonical links: https://help.medium.com/hc/en-us/articles/360033930293-Set-a-canonical-link
- Medium importing: https://help.medium.com/hc/en-us/articles/214550207-Importing-a-post-to-Medium
- LinkedIn articles: https://www.linkedin.com/help/linkedin/answer/a522427
- Substack publishing: https://support.substack.com/hc/en-us/articles/360037831771-How-do-I-publish-a-new-post-on-Substack
- Threads overview: https://help.instagram.com/788669719351544/
- GFG contribution entry point: https://www.geeksforgeeks.org/blogs/contribute/
- GFG copyright/AI-content policy: https://www.geeksforgeeks.org/legal/copyright-information/
- LeetCode guide: https://support.leetcode.com/hc/en-us/articles/360012067053-LeetCode-QuickStart-Guide
- Reddit spam guidance: https://support.reddithelp.com/hc/en-us/articles/360043504051-Spam
