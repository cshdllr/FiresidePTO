# Fireside PTO design system

Status: adopted for the light-mode prototype. Earlier dark and exploratory concepts are historical snapshots. This document describes the system; `design.css` is the implementation source, linked by `index.html` and `design-system.html`. Update the reference's embedded CSS/token snapshot when the stylesheet changes. No live school site has been changed.

## Principles

- Lead the homepage with the next event. Put past meetings inside Events.
- Keep the supplied Fireside logo unchanged. Its red and gold supply the brand color; the interface stays neutral.
- Use type, spacing, and thin dividers to create hierarchy. Avoid decorative shadows and unnecessary cards.
- Reuse the roles below before adding a token or component-specific override.

## Typography: five roles

Each variable is a complete CSS `font` shorthand, including weight, size, line height, and font family. This avoids separate size, weight, leading, and family tokens for every component. All roles use weight 400.

| Token | Default size / line height | Typeface | Use |
| --- | --- | --- | --- |
| `--fr-type-title` | `clamp(2rem, 1.5rem + 2vw, 3rem)` / 1.2 | Georgia, serif | Page title only; 32–48px at a 16px root |
| `--fr-type-heading` | 1.5rem / 1.2 | Georgia, serif | Section headings, prominent dates, brand name |
| `--fr-type-item` | 1.25rem / 1.4 | Georgia, serif | Event names and team member names |
| `--fr-type-body` | 1rem / 1.6 | Arial, sans-serif | Paragraphs, primary buttons, detail content |
| `--fr-type-meta` | .875rem / 1.4 | Arial, sans-serif | Navigation, labels, metadata, secondary links |

At the browser's default root size, these resolve to 32–48, 24, 20, 16, and 14px. Do not set the root font size to a fixed pixel value. Keep uppercase labels short and use .06em tracking; titles use −.02em tracking. Do not create a smaller caption style. Use semantic heading levels independently of visual roles.

## Colors

| Token | Value | Use |
| --- | --- | --- |
| `--fr-paper` | `#ffffff` | Page background |
| `--fr-text` | `#252827` | Headings and primary text |
| `--fr-muted` | `#666d68` | Supporting text |
| `--fr-line` | `#e2e6e2` | Decorative separators only |
| `--fr-wash` | `#f5f7f4` | Event information and photo placeholders |
| `--fr-solid` | `#29332d` | Primary action fill |
| `--fr-solid-text` | `#ffffff` | Text on primary actions |

The two white tokens have different semantic jobs and remain separate. Dormant dark-mode values were removed from this light system. Keep the logo's colors in the supplied asset; do not guess brand hex values from the screenshot.

Source-color contrast ratios: primary text on paper 14.88:1; secondary text on paper 5.31:1; secondary text on wash 4.93:1; primary text on wash 13.81:1; button text on solid 13.08:1. These pairs exceed the [WCAG normal-text minimum of 4.5:1](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). The divider color is not suitable as the sole essential boundary of a control. These checks are not a full accessibility audit.

## Spacing and layout

Use the small spacing scale **4, 8, 12, 16, 24, 32, 40, 48px**. Do not create a variable for every number. Use semantic variables for the shared responsive dimensions:

| Token | Desktop | At 720px and below |
| --- | --- | --- |
| `--fr-gutter` | 40px | 24px |
| `--fr-section-space` | 40px | 32px |
| `--fr-layout-gap` | 48px | 24px |
| `--fr-content-max` | 1120px | Same maximum; content shrinks to fit |
| `--fr-reading-max` | 65ch | Same maximum; content shrinks to fit |
| `--fr-control-min` | 44px | 44px |
| `--fr-radius` | 3px | 3px |

Header, main, and footer share the same gutter and maximum width. The maximum includes padding. Structural borders are 1px and selected indicators 2px. No shadows. Keep native focus indicators.

Content-driven breakpoints:

- **960px:** navigation gets its own row so larger labels fit comfortably.
- **720px:** smaller gutters, single-column hero/detail content, two-column team directory, wrapping event rows.
- **480px:** single-column team directory and lower homepage sections; logo shrinks from 72px to 56px.

The extra header breakpoint is deliberate; forcing it into the content breakpoint would crowd navigation after increasing text size. CSS variables cannot be used directly in standard media-query conditions.

Special geometry is not a spacing token: the logo is 72px (56px on small screens), the event date column is 56px, and team portraits use a 4:3 ratio. Preserve logo proportions with `object-fit: contain`; crop actual portraits with `object-fit: cover`.

## Components and interactions

- Primary button: body type, solid background, white text, 12px × 24px padding, 3px radius, minimum 44px height. One prominent action per section.
- Secondary link: metadata type, visible underline, minimum 44px height when standalone. Inline prose links remain inline.
- Navigation: metadata type, minimum 44px height. Current page uses an underline and `aria-current="page"`.
- Event filters: metadata type, minimum 44px height. Selected filter uses an underline and `aria-pressed`.
- Event row: shared date column, item title, metadata, entire row clickable. Internal destinations use →; external destinations use ↗.
- Team entry: consistent portrait ratio, role label, item title, role-specific contact. Never invent names, photos, or contact addresses.
- Meeting records: agenda before the event; recap and minutes afterward on the same event page. Past meetings lists those existing pages. Other event types omit meeting-record sections.
- Disclosure: native `details`/`summary`, at least 44px summary height, visible browser focus.

44px is our internal usability target. [WCAG 2.2 AA target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) uses a 24px minimum with exceptions; 44px is not a claim about that standard. Preserve [visible keyboard focus](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html).

## Change rules and verification

1. Change shared declarations in `design.css`; update this document and the rendered reference in the same change.
2. Use a role, not a new size, for a new heading or caption. Do not add component-specific typography tokens.
3. Check the homepage, Events including Past meetings, PTO Team, and a detail view at desktop and mobile widths.
4. Before production, verify text enlargement, browser zoom/reflow, keyboard order, focus, real link destinations, and screen-reader semantics.

The content migration adds shareable hash event URLs, browser back/forward integration, and heading focus after navigation. The site remains a static single-page application; production accessibility verification is still required. Navigation and event filters use real links, with `aria-current` indicating the selected destination.
# Sponsor motion

The homepage sponsor strip uses the shared heading, metadata, spacing, and control styles. Logos retain their original colors on white and fit within a 172 × 100px area without stretching. A 65-second linear loop moves right to left. Hovering over the logos pauses movement. When sponsor links receive keyboard focus, the strip becomes a static wrapping list so every link stays visible. Reduced-motion preferences replace the animation with a wrapping, static list of every sponsor; duplicate logos are hidden from assistive technology.

## Resource and volunteer directories

Resources and volunteering use simple two-column directories that stack below 720px. Headings and spacing separate groups; avoid section rules, repeated eyebrow labels, and introductory copy that restates a heading. Resources retain all document links, with older reports in a native disclosure. Volunteer entries contain a name, commitment, and one concise description, with signup and contact actions at the top. Use existing type and spacing tokens.
