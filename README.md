# Fireside PTO website

A minimal, light-mode website concept for Fireside Elementary's PTO. Plain HTML, CSS, and JavaScript: no package manager, paid hosting service, or build step is required.

## Current status

This is a design preview, not a replacement for the current school website. It includes a featured event, Events with a Past meetings section, event detail views, and a PTO Team directory.

Before using it as the official site, confirm event dates and contacts, replace photo placeholders, complete the roster, and replace the illustrative archived meeting with actual records. Some links intentionally go to the existing Fireside PTO website. The Donate link currently opens its fundraising information page. Existing school-domain settings have not been changed.

## Run locally

Open `index.html` in a browser, or run this in the project folder:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. The component reference is `design-system.html`.

## Publish on GitHub Pages

1. Push this repository to the GitHub owner and repository chosen by the PTO.
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch containing these files (currently `master`) and **/(root)**, then save.
5. Wait for GitHub's Pages deployment to finish. GitHub displays the public site URL on that settings page.

For a project repository the URL is usually `https://OWNER.github.io/REPOSITORY/`. All local assets use relative paths so the repository subpath works. `.nojekyll` tells GitHub to serve these static files directly.

[GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) is free with public repositories. Private-repository Pages requires an eligible paid plan. Publishing from a private repository does not, by itself, make the resulting website private.

## Editing guide

| File | What to edit |
| --- | --- |
| `index.html` | Homepage event summaries, navigation, and PTO team names/contact links |
| `app.js` | Detailed event content and view-switching behavior |
| `design.css` | Shared visual styles and tokens |
| `design.md` | Design rules and rationale |
| `site.css` | Standalone page shell |
| `assets/fireside-logo.png` | Supplied school logo |
| `design-system.html` | Visual reference, component examples, and embedded token inventory |
| `design-system.css` | Reference-page-only table and specimen layout |

Event summary information currently appears in `index.html`, while event details are in `app.js`; update both when a date changes. The design-system page has an embedded stylesheet snapshot for documentation, so refresh it when changing `design.css`.

The prototype switches views within a single page. Individual event URLs, browser history integration, and focus management after view changes remain future implementation work.

## Handing it to the next PTO team

- Prefer a PTO-owned GitHub organization, with at least two trusted organization owners.
- Give each maintainer their own GitHub account and appropriate repository access; do not share a personal password.
- Keep domain registration, renewal, and recovery details in PTO-owned accounts if a custom domain is added later.
- Walk through changing an event, updating a team member, and reverting a commit before leadership changes.
- Keep private parent/student information and credentials out of the repository. Public repositories expose source files and commit history, not just the rendered website.
- Use a pull request for changes that need another person's review. GitHub's browser editor can handle small text updates.

## Checks before publishing changes

Check the homepage, Events including Past meetings, a detail view, and the PTO Team page on desktop and mobile. Test links and keyboard navigation. Follow `design.md` when changing the visual system.

The original logo and school branding are supplied assets; this repository does not assert new ownership or grant a separate license to them.
