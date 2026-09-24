# Vairag Akbari — static HTML portfolio

No framework, build step, database, or JavaScript required. Upload the contents of `dist/` to a static host supporting directory index.html pages. The intended public origin is https://vairagakbari.in. The Sites copy initially uses private access; that copy is not searchable by Google. Domain connection/public access must be completed before requesting indexing.

## Add an article
1. Copy `templates/article.html` into `dist/article/your-topic/index.html`.
2. Replace every ALL_CAPS placeholder: page title, description, canonical URL, Open Graph values, structured data, headline and body.
3. Give each subsection a stable id. Link with `/article/your-topic/#section-id`. A fragment is an in-page jump, not a separate indexed page.
4. Add a real linked row to `dist/article/index.html` and the home page. If it belongs in the book, link the SAME article from `dist/book/index.html`; do not duplicate its body.
5. Add the canonical URL without the fragment to `dist/sitemap.xml`. Update publication/modified dates only when accurate; initial sample omits unverified dates.
6. Preview, check links on mobile, then upload/redeploy. This is a file-based publishing workflow, not a CMS.

## Content to review
The JTBD article is an initial draft written for this project. Review it in your own voice before public release. Work descriptions come from your attached résumés. The listing image agent is explicitly described as designed, not fully deployed. No unsupported software projects, published-article history, or personal conversion achievements were carried over from the original template.

## Public launch
Keep exactly one primary domain variant; redirect alternatives to it. Retain the supplied `Job-To-Be-Done` spelling in all links (or change all references and add a permanent redirect). Serve /404.html with HTTP 404 status for missing paths. Enable HTTPS; verify the domain in Google Search Console; submit /sitemap.xml; inspect an article URL. Canonicals are signals, not guaranteed indexing. No analytics is installed. Add your own analytics account only when ready and configure consent if required for your usage.

Read DISTRIBUTION.md for a publishing plan. The Amplitude PDF is a reference you supplied, not redistributed website content.
