# Fireside design system

A warm editorial identity for a school community: Newsreader headings, clear DM Sans text, ivory paper, white surfaces, and restrained oxblood actions. The supplied school logo stays unchanged. Keep content direct. Elegance comes from proportion, typography, and consistency, not decorative sections or extra copy.

## Sources of truth

- `design.css`: shared tokens, typography, navigation, controls, and reusable components.
- `site.css`: page layouts, event cards, program links, sponsor strip, and responsive adaptations.
- `design-system.html`: live specimens, complete token inventory, and calculated contrast ratios.
- `design-system.css`: styles specific to the reference page.
- `scripts/update_design_reference.py`: refreshes the reference’s embedded token values after shared CSS changes. Run `python3 scripts/update_design_reference.py`. The website itself needs no build step.

## Foundations

There are 22 shared tokens: nine colors, five complete typography roles, seven layout/shape values, and one shared shadow. Do not create typography tokens for individual components.

| Role | Value | Purpose |
| --- | --- | --- |
| Paper | `#faf8f4` | Main background |
| Surface | `#ffffff` | Cards and sponsor artwork |
| Wash | `#f0ece5` | Quiet surfaces and default covers |
| Text | `#282624` | Primary text; inverse feature background |
| Muted | `#6d655e` | Supporting information |
| Line | `#e3ddd4` | Subtle boundaries |
| Solid | `#75372f` | Actions and keyboard focus |
| Solid text | `#ffffff` | Text on solid actions |
| Gold | `#ac8b4f` | Decorative arcs and hover borders; not body text |

| Type role | Font | Size / line height |
| --- | --- | --- |
| Title | Newsreader 400 | 40–64px fluid / 1.08 |
| Heading | Newsreader 400 | 32px / 1.15 |
| Item | Newsreader 500 | 22px / 1.25 |
| Body | DM Sans 400 | 16px / 1.65 |
| Metadata | DM Sans 400 | 14px / 1.5 |

Sizes assume a 16px root and are expressed in rem. Weight 500 is used for compact actions and selection. Fonts and their SIL Open Font Licenses are in `assets/fonts`; no external font request is needed. Georgia and Arial are fallbacks. Preserve browser text enlargement.

## Layout and shape

The site has a 1200px maximum width including 40px side gutters. Sections use 56px spacing, major grids use 48px gaps, and event cards use 24px gaps. At 720px and below, gutters become 24px, section spacing 40px, and major gaps 24px. Body reading width is capped at 62ch. Use the 4px spacing rhythm (4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 72); shared decisions get tokens, every individual gap does not.

Surfaces share a 12px corner radius. Compact navigation/controls use 8px. Arrow affordances are circular. Use the shared soft shadow only for interaction, not on every surface. Avoid repeating horizontal rules where spacing already separates groups.

## Components

- **Page headers:** one page title, with an optional useful action aligned alongside it. No eyebrow labels or introductory copy. Dates and program commitments belong in the page content. All site pages use the shared `pageIntro` renderer.
- **Navigation:** requested order is Events, Volunteer, Fundraising, PTO Team, Resources. Active destination uses a warm surface, oxblood text, and `aria-current`. Text weight stays unchanged so links do not shift when navigating. Donate is a compact solid action. At 960px and below, navigation collapses behind a 44px hamburger button; Donate remains visible beside it, without its arrow. Below 360px, the brand uses the logo alone to leave room for both controls. The menu opens in the page flow, closes on selection or Escape, and resets when the breakpoint changes. The button exposes its expanded state to assistive technology; Escape returns focus to it. Without JavaScript, navigation remains visible. The brand subtitle hides below 480px to keep the header compact.
- **Actions:** use a solid primary control and colored secondary links. No link underlines. Standalone controls are at least 44px tall. Visible keyboard focus uses a 2px oxblood outline, offset 4px. Links within prose must remain distinguishable by placement and label as well as color.
- **Event cards:** only the next three ongoing/upcoming events appear on Home. Cards fit the available content width with a 220px minimum and 24px gaps, showing up to three columns. Columns reduce only when the cards no longer fit; a single card can shrink below 220px on very narrow screens. One anchor wraps each entire card, with a clear accessible name. Covers use a compact 2:1 frame. Photos fill the frame; flyers fit without cropping. Missing covers reveal a branded default. White card surfaces use 20px inner padding; the action stays aligned at the bottom. Hover lifts 4px over 180ms, adds the shared shadow, and fills the circular arrow. Reduced motion removes movement and transitions.
- **Event pages:** preserve the permanent event URL, inclusive end dates, full cover/flyer images, text descriptions, and attached records. Past meetings remain under Events. Other past events also retain their own pages and documents. Never invent minutes.
- **Spirit wear:** one inverse ink surface shared between Home and Fundraising. Keep merchandise imagery intact and the store link clear.
- **Volunteer programs:** clickable white surfaces, concise directory descriptions, complete descriptions and optional photos on detail pages. Avoid repeated section intros and horizontal dividers.
- **Team:** name first, position second. No per-person email addresses. One visible, copyable chair email above the directory. Photos use the existing rounded 4:3 frame with a per-photo focal position. Initial placeholders remain for missing or failed photos. Images are decorative beside each person’s name.
- **Resources:** simple headings and grouped links; no unnecessary panel borders or explanatory filler. Financial archives use native disclosures.
- **Fundraising:** consistent sections for shopping rewards, milk caps, sponsorships, and giving. Never invent sponsor pricing or benefits.
- **Sponsors:** original full-color logos on white, linked to verified destinations. Use “Thank you for supporting Fireside!” with no year label. A 65-second loop continues on hover. Keyboard focus and reduced-motion preferences show a static wrapping list; visual duplicates are hidden from assistive technology and tab order.

## Verification

The reference computes contrast from the actual embedded tokens for primary text, secondary text, and actions. Normal text pairings should remain at least 4.5:1. Decorative gold and rules are not text or focus indicators. This is not a full accessibility audit.

After changing the system: regenerate the reference, run `node --test tests/site.test.cjs`, check desktop and mobile layouts, inspect navigation and event/program routes, and verify focus, reduced-motion behavior, and text overflow. Preserve prior content and functionality unless a change is requested.

Events has two views: Upcoming events and Past events. Their toggle sits right-aligned in the Events title row and wraps beneath the title on small screens. Past events combines meetings and other events in reverse date order and retains the school-year records archive. Existing `#meetings` links open the combined past view. Past event detail pages return to `#past-events`.
