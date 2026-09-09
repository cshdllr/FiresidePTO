# Fireside PTO website

A minimal, light-mode website concept for Fireside Elementary's PTO. Plain HTML, CSS, and JavaScript: no package manager, paid hosting service, or build step is required.

## Current status

This is a design preview, not a replacement for the current school website. It includes a featured event, Events with a Past meetings section, event detail views, and a PTO Team directory.

Public content has been imported from the existing site: meeting records, the full listed team, volunteer committees, budgets, and forms. See `content-sources.md` for coverage and unresolved source conflicts. Before using it as the official site, resolve unconfirmed event dates and contacts and replace photo placeholders. The Donate link opens the donation destination published on the existing homepage. Existing school-domain settings have not been changed.

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
| `content.js` | All events, meeting documents/recaps, team contacts, resources, and committees |
| `content-sources.md` | Source links, migration decisions, and unresolved conflicts |
| `index.html` | Page shell and navigation |
| `app.js` | Content rendering, automatic event ordering, and hash navigation |
| `design.css` | Shared visual styles and tokens |
| `design.md` | Design rules and rationale |
| `site.css` | Standalone page shell |
| `assets/fireside-logo.png` | Supplied school logo |
| `design-system.html` | Visual reference, component examples, and embedded token inventory |
| `design-system.css` | Reference-page-only table and specimen layout |

Update each event once in `content.js`; both listings and detail views read from it. Imported information is a reviewed snapshot and does not synchronize automatically with the old website. The design-system page has an embedded stylesheet snapshot for documentation, so refresh it when changing `design.css`.

The site uses shareable hash URLs within a single page, with browser history and heading focus after navigation. For example, `#meetings` opens the archive and `#event/2026-04-15-general` opens that meeting.

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
