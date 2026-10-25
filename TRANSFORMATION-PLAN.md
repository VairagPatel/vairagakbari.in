# Portfolio Transformation Plan: FDE + AI Engineering Portfolio

## Executive Summary

**Current State**: Production-ready portfolio positioned as "Growth operator targeting founder's office roles" at Jumbo Homes, with focus on sales pipeline, customer discovery, and workflow improvement.

**Target State**: Premium portfolio positioning as "Forward Deployed Engineer | AI & Full-Stack Builder | Growth & Operations Technologist" removing all Jumbo Homes references and showcasing Health Map as flagship personal project.

**Core Challenge**: This transformation requires **significant content rewriting** while preserving the excellent existing technical foundation and design system.

---

## Phase 1: Audit Results

### ✅ Strengths to Preserve

**Technical Architecture**
- Clean static HTML generator (build.js)
- Proper separation of content/config/templates
- Responsive design system with excellent typography
- Accessible, semantic HTML
- Strong SEO foundations (metadata, sitemap, robots.txt, JSON-LD)
- Fast, deterministic builds
- Proper validation and preview workflows

**Design System**
- Sophisticated minimalist aesthetic (cream background #efeee6, blue accent #2c46de)
- Beautiful Georgia serif headings + system sans body
- Excellent spacing and proportions
- Responsive grid layouts
- Professional portrait treatment (rounded top corners)
- Clean navigation and visual hierarchy

**Content Infrastructure**
- Well-structured article system with metadata
- Distribution workflow for multi-platform publishing
- Comprehensive documentation
- Version controlled, maintainable

### ⚠️ Critical Gaps vs. Master Prompt Requirements

**1. Positioning Mismatch (HIGH PRIORITY)**
- Current: "Growth operator at Jumbo Homes" seeking founder's office roles
- Required: Forward Deployed Engineer + AI Systems + Full-Stack + Growth Operations
- Issue: **All Jumbo Homes references must be removed** per master prompt
- Impact: Major content rewrite of profile.json, homepage, and experience

**2. Missing Core Sections**
- ❌ No dedicated Forward Deployed Engineering section explaining FDE approach
- ❌ No AI engineering capabilities showcase
- ❌ No full-stack technical project showcase beyond one article
- ❌ No experience/timeline page showing technical journey
- ❌ Growth & Operations presented as business role, not engineering capability

**3. Health Map Project**
- Required: Flagship personal project with detailed case study
- Current: Not present anywhere in the codebase
- Need: Full project page with architecture diagrams, proposed features, engineering roadmap

**4. Skills/Capabilities Matrix**
- Current: Simple "toolkit" text (Google Sheets, Excel, CRM)
- Required: Structured engineering capability matrix with categories:
  - Languages & Backend (Python, SQL, FastAPI, REST APIs)
  - AI & LLM Systems (RAG, embeddings, agents)
  - Data & Infrastructure (PostgreSQL, MongoDB, Redis)
  - Frontend (React, Next.js, TypeScript)
  - Engineering Fundamentals
  - Growth & Product Systems

**5. Technical Depth**
- Current profile capabilities focus on business operations
- Required: Technical problem-solving, architecture, AI implementation, deployment

**6. Work Examples**
- Current: Jumbo Homes work (must be removed), club presidency, sheet automation
- Required: Verified technical projects without Jumbo references

---

## Phase 2: Implementation Strategy

### Approach: Incremental Enhancement

**NOT a full rebuild** - we're enhancing the existing excellent foundation with:
1. Content repositioning and rewriting
2. New sections (FDE, Skills, Health Map project page)
3. Enhanced navigation
4. Preserved design system and technical architecture

### Priority Order

#### **P0: Critical Content Changes (Remove Jumbo + Reposition)**
1. Remove all Jumbo Homes references from:
   - `content/profile.json` (capabilities, work examples)
   - `config/site.json` (author description)
   - Build outputs
2. Rewrite positioning to FDE + AI + Full-Stack + Growth Operations
3. Update homepage hero and description
4. Revise author role and bio

#### **P1: Add Missing Core Sections**
1. Create Forward Deployed Engineering dedicated section/page
2. Build Health Map project case study page
3. Create Skills/Capabilities matrix page
4. Enhance navigation to include new sections

#### **P2: Content Enhancement**
1. Rewrite work examples with technical focus
2. Add architecture diagrams capability
3. Enhance article categorization (add AI Engineering, Backend, System Design categories)
4. Update book structure for new positioning

#### **P3: Design & UX Refinements**
1. Add interactive elements (project filters, command palette)
2. Improve mobile experience
3. Add microinteractions
4. Ensure dark-mode support is excellent

#### **P4: Technical Optimizations**
1. Performance audit and improvements
2. Accessibility audit (WCAG 2.2 AA)
3. Enhanced SEO
4. Better error states and loading

---

## Phase 3: Detailed Implementation Tasks

### Task Group A: Urgent Content Corrections

**A1. Remove Jumbo Homes References**
- [ ] Edit `content/profile.json`:
  - Remove capabilities[0]: "Sales pipeline stalls..." (mentions Jumbo)
  - Remove capabilities[3]: "Projects involve..." (mentions Jumbo coordination)
  - Remove work[0]: "End-to-end property sales..." (Jumbo role)
- [ ] Edit `config/site.json`:
  - Change description from "Founder's office, strategy, growth & product operator" to FDE positioning
  - Update author.role
- [ ] Search entire codebase for "Jumbo" and "Tara" to ensure complete removal

**A2. Rewrite Core Positioning**
- [ ] Update `content/profile.json`:
  ```json
  {
    "eyebrow": "Bengaluru, India · Open to FDE & AI Engineering opportunities",
    "headline": "I build intelligent software that solves real business problems.",
    "lead": "I'm a builder working at the intersection of AI engineering, full-stack development, product thinking, and growth operations. I turn complex workflows and ambiguous problems into practical, scalable technology.",
    "value": "Forward Deployed Engineering | AI & Full-Stack Builder | Growth & Operations Technologist"
  }
  ```
- [ ] Add dynamic role display component to hero
- [ ] Update capabilities array with technical problem-solving focus

**A3. Rewrite Toolkit Section**
```json
{
  "toolkit": {
    "inPractice": "Python, FastAPI, REST APIs, SQL, MongoDB, Redis, RAG, Embeddings, LLMs, Agent Orchestration, React, TypeScript, Product Analytics",
    "learning": "Advanced system design, Kubernetes, GraphQL, Real-time data pipelines, Production ML systems",
    "interest": "Building at the intersection of AI systems, full-stack products, and measurable business outcomes"
  }
}
```

### Task Group B: New Page - Forward Deployed Engineering

**B1. Create FDE Content File**
- [ ] Create `content/fde.json` with:
  - Problem-solving approach
  - Four core capabilities
  - Workflow diagram data
  - Case examples

**B2. Update Build Script**
- [ ] Add FDE page generation in `scripts/build.js`
- [ ] Create route `/fde/` or section on homepage

**B3. Visual Workflow Component**
```
Discover Problem → Understand Constraints → Design Architecture 
→ Build Solution → Integrate Systems → Deploy → Measure → Iterate
```

**B4. Four Capability Cards**
1. Technical problem solving (Architecture, APIs, databases, reliability)
2. Customer & business understanding (Requirements, stakeholder communication)
3. AI implementation (LLM workflows, RAG, agents)
4. Deployment & adoption (Production, observability, iteration)

### Task Group C: New Page - Health Map Project

**C1. Create Health Map Content**
- [ ] Create `content/projects/health-map.json` or similar structure
- [ ] Include:
  - Problem statement
  - Product vision (clearly marked as proposed, not deployed)
  - Proposed architecture diagram
  - Proposed features list
  - Engineering considerations
  - Project roadmap with status

**C2. Architecture Diagram**
Create clean visual representation:
```
Frontend (React/Next.js)
    ↓
Backend API (Python/FastAPI)
    ↓
Application Services
    ↓
PostgreSQL Database
    ↓
Optional AI Services & Retrieval Layer
```

Label clearly: **"Proposed Architecture - Planning Stage"**

**C3. Features Section**
- User authentication (planned)
- Structured info management (planned)
- Search & filtering (planned)
- Dashboard & visualizations (planned)
- AI-assisted retrieval (optional, planned)

**C4. Progress Roadmap**
Visual timeline showing:
- ✅ Problem discovery
- 🔄 System design (in progress)
- ⏳ Database implementation (planned)
- ⏳ Frontend development (planned)
- ⏳ Testing & security review (planned)
- ⏳ Deployment (planned)

### Task Group D: Skills & Experience Pages

**D1. Create Skills Matrix Page**
- [ ] Create `content/skills.json`
- [ ] Categories:
  - Languages & Backend
  - AI & LLM Systems
  - Data & Infrastructure
  - Frontend
  - Engineering Fundamentals
  - Growth & Product Systems
- [ ] For each skill, use honest labels:
  - "Built With" (verified)
  - "Working Knowledge"
  - "Currently Exploring"

**D2. Create Experience/Timeline Page**
- [ ] Remove Jumbo Homes experience
- [ ] Preserve: Club president, seller outreach automation, AI workflow design
- [ ] Rewrite with emphasis on:
  - Problems identified
  - Systems designed
  - Technical tools used
  - Engineering lessons
- [ ] Add timeline visualization

### Task Group E: Navigation & Architecture Updates

**E1. Update Navigation**
```json
{
  "main": [
    { "label": "Home", "href": "/" },
    { "label": "About", "href": "/#about" },
    { "label": "Projects", "href": "/#projects" },
    { "label": "FDE", "href": "/fde/" },
    { "label": "Experience", "href": "/experience/" },
    { "label": "Writing", "href": "/article/" },
    { "label": "Contact", "href": "/#contact" }
  ]
}
```

**E2. Homepage Structure**
- Hero (new positioning)
- Technical capability strip
- Forward Deployed Engineering section (summary + link to /fde/)
- Featured Projects (Health Map first)
- Work & Experience
- Growth & Operations as Engineering
- Writing/Articles
- Book
- Toolkit
- Contact

### Task Group F: Enhanced Article System

**F1. Add New Categories**
- [ ] Update article meta.json schema to support:
  - Python Internals
  - Backend Engineering
  - System Design
  - AI Engineering
  - RAG and Agentic Systems
  - Databases
  - Forward Deployed Engineering
  - Product and Growth Engineering
  - Building in Public

**F2. Article Page Enhancements**
- [ ] Add copy-code controls for code blocks
- [ ] Add reading progress indicator
- [ ] Improve table of contents with sticky positioning
- [ ] Add previous/next navigation

### Task Group G: Design Refinements

**G1. Interactive Elements**
- [ ] Add project filter component
- [ ] Implement command palette (keyboard navigation)
- [ ] Add copy-to-clipboard for email
- [ ] Architecture diagram explorer (hover states)

**G2. Microinteractions**
- [ ] Smooth page transitions
- [ ] Button hover states
- [ ] Link underline animations
- [ ] Focus indicators

**G3. Dark Mode**
- [ ] Ensure current light theme is excellent
- [ ] Add optional dark mode support
- [ ] Use CSS custom properties for theme switching

---

## Phase 4: Content Integrity Checklist

Before ANY deployment, verify:

- [ ] ❌ NO Jumbo Homes references anywhere
- [ ] ❌ NO Tara references anywhere
- [ ] ❌ NO invented work experience
- [ ] ❌ NO invented project results or metrics
- [ ] ✅ Health Map clearly marked as "in planning/design stage"
- [ ] ✅ Technologies only claimed when actually used, not just studied
- [ ] ✅ NO fabricated GitHub repos or live demos
- [ ] ✅ Genuine growth and operations experience preserved but reframed as engineering
- [ ] ✅ Proposed architecture clearly labeled "Proposed" not "Deployed"
- [ ] ✅ Verified personal and contact information only

---

## Phase 5: Execution Workflow

### Step 1: Content Audit & Preparation (1-2 hours)
- Search entire codebase for "Jumbo", "Tara"
- Document all locations requiring changes
- Prepare replacement content drafts
- Get approval on new positioning language

### Step 2: Critical Content Updates (2-3 hours)
- Update profile.json with new positioning
- Update site.json and navigation.json
- Remove Jumbo references from work examples
- Rebuild and verify homepage changes

### Step 3: New Page Development (4-6 hours)
- Build FDE section/page
- Build Health Map project page
- Build Skills matrix page
- Update build scripts to generate new routes

### Step 4: Navigation & Architecture (2 hours)
- Update site navigation
- Ensure all new routes work
- Update internal links
- Test navigation flow

### Step 5: Content Enhancement (3-4 hours)
- Rewrite capabilities with technical focus
- Add architecture considerations
- Enhance article system
- Update book structure

### Step 6: Design Refinements (3-4 hours)
- Add interactive elements
- Microinteractions
- Mobile optimization
- Accessibility audit

### Step 7: Quality Assurance (2-3 hours)
- Complete content integrity checklist
- Validate all pages
- Test responsiveness
- Check accessibility
- Verify SEO metadata
- Performance testing

### Step 8: Documentation (2 hours)
- Update EDITING-GUIDE.md
- Update deployment docs
- Create CHANGELOG.md entry
- Document new sections

### Step 9: Deployment & Verification (1 hour)
- Build production site
- Deploy to Netlify
- Verify live site
- Check all routes
- Verify no Jumbo references public

**Total Estimated Time: 20-28 hours**

---

## Phase 6: Success Criteria

### Must Have (MVP)
- ✅ All Jumbo Homes references removed
- ✅ New FDE + AI + Full-Stack positioning throughout
- ✅ Health Map project page (clearly marked as planning stage)
- ✅ Updated homepage with new positioning
- ✅ Preserved excellent design and architecture
- ✅ Mobile responsive
- ✅ SEO metadata updated
- ✅ All existing URLs preserved

### Should Have
- ✅ FDE dedicated section/page
- ✅ Skills matrix page
- ✅ Enhanced navigation
- ✅ Architecture diagrams
- ✅ Improved article categorization
- ✅ Interactive elements (filters, command palette)

### Nice to Have
- ⭐ Dark mode support
- ⭐ Advanced microinteractions
- ⭐ Reading progress indicators
- ⭐ Enhanced code blocks with syntax highlighting

---

## Phase 7: Risks & Mitigations

### Risk 1: Content Verification
**Risk**: Accidentally inventing capabilities or projects
**Mitigation**: Strict review against content integrity checklist; get explicit approval on new content

### Risk 2: Breaking Existing URLs
**Risk**: Changing routes breaks bookmarks or search indexing
**Mitigation**: Preserve all existing routes; add new ones; use redirects if necessary

### Risk 3: Design Drift
**Risk**: New sections feel inconsistent with existing design
**Mitigation**: Reuse existing components, spacing, typography; maintain design tokens

### Risk 4: Over-engineering
**Risk**: Adding unnecessary complexity to simple static site
**Mitigation**: Keep build process simple; avoid frameworks; static HTML + CSS focus

---

## Next Steps

**Immediate Actions Needed:**

1. **Content Approval**: Review and approve the proposed new positioning language and Health Map project description
2. **Technology Verification**: Confirm which technologies you've actually built with vs. currently learning
3. **Health Map Details**: Provide current status of Health Map (design stage, any prototypes, architecture decisions made)
4. **Work Examples**: Confirm which non-Jumbo work examples are accurate and should be featured

**Once Approved, Begin With:**
- Phase 1: Remove Jumbo Homes references
- Phase 2: Update core positioning
- Phase 3: Build Health Map project page

---

## Appendix: File Inventory

### Files Requiring Changes
```
content/profile.json          - MAJOR REWRITE (remove Jumbo, new positioning)
config/site.json              - Update author description
config/navigation.json        - Add new sections
scripts/build.js              - Add new page generation
```

### New Files to Create
```
content/fde.json              - Forward Deployed Engineering content
content/projects/health-map.json - Health Map project case study
content/skills.json           - Skills matrix data
content/experience.json       - Timeline/experience (non-Jumbo)
```

### Files to Preserve As-Is
```
scripts/build.js              - Enhance, don't rebuild
dist/assets/style.css         - Extend, preserve design
netlify.toml                  - Keep existing config
docs/*                        - Update but preserve structure
```

---

**Status**: Ready for Phase 1 execution pending content approval
**Created**: October 21, 2026
**Document**: TRANSFORMATION-PLAN.md
