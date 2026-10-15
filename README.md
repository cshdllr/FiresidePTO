# Fireside PTO website

A minimal, light-mode website concept for Fireside Elementary's PTO. Plain HTML, CSS, and JavaScript: no package manager, paid hosting service, or build step is required.

## Current status

This is a design preview, not a replacement for the current school website. It includes a three-card event preview on Home, a vertical card list on Events, a combined Past events list, event detail views, and a PTO Team directory.

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
4. Select the `main` branch and **/(root)**, then save.
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

The site uses shareable hash URLs within a single page, with browser history and heading focus after navigation. For example, `#past-events` opens past events and the archive (`#meetings` remains a compatible alias) and `#event/2026-04-15-general` opens that meeting.

## Handing it to the next PTO team

- Prefer a PTO-owned GitHub organization, with at least two trusted organization owners.
- Give each maintainer their own GitHub account and appropriate repository access; do not share a personal password.
- Keep domain registration, renewal, and recovery details in PTO-owned accounts if a custom domain is added later.
- Walk through changing an event, updating a team member, and reverting a commit before leadership changes.
- Keep private parent/student information and credentials out of the repository. Public repositories expose source files and commit history, not just the rendered website.
- Use a pull request for changes that need another person's review. GitHub's browser editor can handle small text updates.

## Checks before publishing changes

Check the homepage, Events including Past events, a detail view, and the PTO Team page on desktop and mobile. Test links and keyboard navigation. Follow `design.md` when changing the visual system.

The original logo and school branding are supplied assets; this repository does not assert new ownership or grant a separate license to them.
# Sponsors

The homepage carousel is maintained in `sponsors.js`. The roster comes from the supplied 2025–2026 poster; verify sponsorships before a new season. Eleven logos now use separate official originals in `assets/sponsors/`. Old Friends uses a crop from the original PTO poster until a separate logo is available. Asset sources and verification notes are recorded in `assets/sponsors/sources.json`.

Each sponsor entry contains its name, website `url`, local `src`, original image dimensions, and artwork `bounds` as `[left, top, width, height]` in original pixels. The display crops excess whitespace through CSS; original files remain unchanged. Measure visible artwork when replacing a file, including any intentional frame or tagline. A `null` URL displays an unlinked logo. Old Friends currently has no link because its former domain redirects to unrelated content.

Artwork fits within 184 × 88px; exceptionally wide wordmarks can specify `maxWidth` (Goddard uses 264px). The gap between visible artwork is 48px, or 32px below 480px, in a 144px-tall strip. These rules live in `site.css` and `sponsors.js`. The heading has no year label. Duplicate logos stay out of keyboard navigation. The strip continues on hover and shows a static wrapping list during keyboard focus or reduced motion.

## Events and program pages

- Event `time` includes minutes for both endpoints, including whole hours: `8:00–9:15 am` or `3:00–4:30 pm`. Keep source uncertainty notes intact.
- Event `date` is the first day; optional `endDate` is the inclusive final day. Both use `YYYY-MM-DD`. A December 1–31 event remains upcoming/ongoing through December 31, then appears under Past events. Leave `endDate` null for a single day. Do not add a seasonal event until its details are confirmed.
- Optional event `image`: `{ "src": "assets/event-flyer.jpg", "alt": "Description of the flyer" }`. Put the event’s essential information in text too. The homepage and detail page display it without cropping.
- Attach agendas, minutes, or recap documents through the event’s `documents` array: `{ "label": "Meeting minutes", "url": "https://..." }`. Records stay at the same `#event/id` URL. Completed meetings and other events appear together under Past events. Adding minutes is a manual content update, not an automatic import.
- Volunteer programs have stable `id` values and `#program/id` pages. Keep the short `description` for the directory, full paragraphs in `body`, and optional `{ "src": "assets/program-photo.jpg", "alt": "Description" }` entries in `photos`.
- Fundraising links and the spirit-wear image live in `content.js` under `fundraising`. The current merchandise photo is served from the original PTO website and depends on that host remaining available.
- Run focused rendering checks with `node --test tests/*.test.cjs`. No install or build step is required.

Event `coverImage` accepts `{ "src": "assets/photo.jpg", "alt": "Description", "caption": "Optional caption" }`. It fills the card cover and appears on the detail page. If no cover is supplied, the card uses `image` (a flyer, shown without cropping), then the Fireside-branded default. Missing image files also reveal the default. Each card is one keyboard-accessible link.

## Design system maintenance

Open `card-explorations.html` to compare ten card directions, each with a three-event Home preview and a stacked Events list. The gallery uses fixed real event examples so each design shows the same content. Numbered URL fragments such as `#03` link to a direction. Selecting a study does not apply its design to the site.

Shared foundations are in `design.css`; page layouts are in `site.css`. The site uses Georgia headings and a system sans-serif stack, without font downloads. Previous font assets are retained only for the comparison page. After changing tokens, run `python3 scripts/update_design_reference.py` to update the live reference in `design-system.html`. See `design.md` for component, motion, accessibility, and responsive rules. No build step is needed to publish the site.

Team photos live in `assets/team/`. In `content.js`, add an optional `photo` object to a team member, for example `{ "src": "assets/team/name.jpg", "position": "50% 40%" }`. The position adjusts the visible crop in the 4:3 card; missing photos use initials.

Page entrances are handled by `motion.js` using the motion tokens in `design.css`. The design-system page includes a Replay entrance control. Reduced-motion users see content immediately.
