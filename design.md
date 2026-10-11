# Fireside design system

A warm editorial identity for a school community: Newsreader headings, clear DM Sans text, ivory paper, white surfaces, and restrained oxblood actions. The supplied school logo stays unchanged. Keep content direct. Elegance comes from proportion, typography, and consistency, not decorative sections or extra copy.

## Sources of truth

- `design.css`: shared tokens, typography, navigation, controls, and reusable components.
- `site.css`: page layouts, event cards, program links, sponsor strip, and responsive adaptations.
- `design-system.html`: live specimens, complete token inventory, and calculated contrast ratios.
- `design-system.css`: styles specific to the reference page.
- `scripts/update_design_reference.py`: refreshes the reference’s embedded token values after shared CSS changes. Run `python3 scripts/update_design_reference.py`. The website itself needs no build step.

## Foundations

There are 26 shared tokens: nine colors, five complete typography roles, seven layout/shape values, one shared shadow, and four motion values. Do not create typography tokens for individual components.

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
| Title | Newsreader 400 | 40px / 44px; 32px / 36px at ≤720px |
| Heading | Newsreader 400 | 24px / 32px; 22px / 28px at ≤720px |
| Item | Newsreader 500 | 18px / 24px |
| Body | DM Sans 400 | 16px / 1.65 |
| Metadata | DM Sans 400 | 14px / 1.5 |

Page titles use Title; section headings (including spirit wear and sponsors) use Heading; event cards, volunteer cards, fundraising cards, and team names use Item regardless of their HTML heading level. Heading line boxes follow the 4px rhythm.

Sizes assume a 16px root and are expressed in rem. Weight 500 is used for compact actions and both states of segmented controls; selection changes the surface and color, never the text width. Fonts and their SIL Open Font Licenses are in `assets/fonts`; no external font request is needed. Georgia and Arial are fallbacks. Preserve browser text enlargement.

## Layout and shape

The site has a 1200px maximum width including 40px side gutters. Page title rows own a consistent 32px gap before their content, including event and program details. Sections use 56px spacing, major grids use 48px gaps, homepage event cards use 24px gaps, and the Events list uses 16px gaps. At 720px and below, gutters become 24px, section spacing 40px, and major gaps 24px. Body reading width is capped at 62ch. Use the 4px spacing rhythm (4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 72); shared decisions get tokens, every individual gap does not.

Surfaces share a 12px corner radius. Compact navigation/controls use 8px. Arrow affordances are circular. Use the shared soft shadow only for interaction, not on every surface. Avoid repeating horizontal rules where spacing already separates groups.

## Components

- **Page headers:** one page title, with an optional useful action aligned alongside it. No eyebrow labels or introductory copy. Dates and program commitments belong in the page content. All site pages use the shared `pageIntro` renderer.
- **Navigation:** requested order is Events, Volunteer, Fundraising, PTO Team, Resources. Active destination uses a warm surface, oxblood text, and `aria-current`. Text weight stays unchanged so links do not shift when navigating. Donate is a compact solid action. At 960px and below, navigation collapses behind a 44px hamburger button; Donate remains visible beside it, without its arrow. Below 360px, the brand uses the logo alone to leave room for both controls. The menu overlays the page in a white panel anchored beneath the hamburger, up to 320px wide, with the shared shadow and a brief entrance. Opening it does not move the header or content. It scrolls within short viewports and closes on selection, Escape, an outside click, or keyboard focus leaving the header. It also resets when the breakpoint changes. This is a nonmodal navigation disclosure; the button exposes its expanded state to assistive technology and Escape returns focus to it. Without JavaScript, navigation remains visible in the page flow. The public header shows only the Fireside PTO name, without a subtitle.
- **Actions:** use a solid primary control, a quiet outlined secondary button for section actions (All events, Become a sponsor, and Contact the PTO in the footer), and colored links within content. At 720px and below, All events follows the home event cards and Become a sponsor follows the carousel, each separated by 24px. Desktop actions stay beside their headings. Only the appropriate copy is displayed and keyboard-accessible. Secondary buttons share a 44px minimum height, 12px corners, and a soft fill on hover. No link underlines. Standalone controls are at least 44px tall. Visible keyboard focus uses a 2px oxblood outline, offset 4px; links on inverse ink surfaces use the light paper color. Back links also use the shared 44px minimum target height. Links within prose must remain distinguishable by placement and label as well as color.
- **Event cards:** Use the inset-photograph direction: white surfaces, a restrained resting shadow, 16px inner padding, and 8px image corners. Derive the outer radius from the image radius + 16px inset + 1px border (25px), so nested corners are concentric. These two local geometry values are shared with the spirit wear banner. Home shows the next three ongoing/upcoming events in up to three columns, with a 220px minimum and 24px gaps. Upcoming and past events use a single column with 16px gaps. Above 640px, Events places a landscape cover to the left of the text; cover width is 192px through 960px and 224px above that. Every cover keeps the same 2:1 aspect ratio, including Events; never stretch it to match text height. At 640px and below, the image sits above the text. Photos fill the frame; flyers fit without cropping. Missing or failed covers reveal the school logo on a warm surface. Useful sentence-case status labels sit on the cover, so titles align without an empty label row. Omit redundant Meeting tags. Card titles reuse the 18px item style with a 24px line height; metadata uses 14px type with a 20px line height. Keep a 12px gap from title to metadata and 4px between schedule and location. The date has slightly more emphasis than the time and location. Date and time share a line with a middle dot; at a text-column width of 240px or less, they stack with a 4px gap and no dot. Always include minutes, including whole hours (8:00–9:15 am). Missing metadata is omitted. Use the full text width without a redundant arrow or separate action row. One anchor wraps each card, with page-specific title/date IDs. Hover lifts 4px over 180ms and adds the shared shadow. Reduced motion removes movement and transitions.
- **Event pages:** preserve the permanent event URL, inclusive end dates, full cover/flyer images, text descriptions, and attached records. Past meetings remain under Events. Other past events also retain their own pages and documents. Never invent minutes.
- **Spirit wear:** one inverse ink surface shared between Home and Fundraising. Use the same 16px inset and 1px transparent border as event cards. Keep merchandise imagery intact in a compact 144px frame (120px on tablets, 96px on phones), with a light primary shop button without an arrow. Use the same concentric corner geometry as event cards.
- **Volunteer programs:** clickable white cards in two columns with 24px padding, gaps, and corners; one column at 720px and below. Title comes first, then description with an 8px gap, then a bottom-aligned row with commitment information and an outlined Learn more affordance. The whole card is one named link; the outlined affordance is a decorative span, never a nested button. Hover adds a subtle border, shared shadow, and 2px lift; reduced motion removes the lift. Use the secondary button for View open opportunities in both the directory and program pages. Keep complete descriptions and optional photos on detail pages. Avoid repeated section intros and horizontal dividers.
- **Team:** name first, position second. No per-person email addresses. One outlined Contact PTO button above the directory opens an email to the PTO chair. Photos use the existing rounded 4:3 frame with a per-photo focal position. Initial placeholders remain for missing or failed photos. Images are decorative beside each person’s name.
- **Resources:** simple headings and grouped links; no unnecessary panel borders or explanatory filler. Financial archives use native disclosures.
- **Fundraising:** cards for shopping rewards, milk caps, sponsorships, and giving share Volunteer’s 24px padding, corners, gaps, and soft resting shadow. Keep headings and descriptions together with an 8px gap; align outlined secondary actions at the bottom. Cards may have multiple actions, so only their links are interactive; keyboard focus highlights the containing card. Retain setup instructions and verified destinations. Never invent sponsor pricing or benefits.
- **Sponsors:** original full-color logos on white, linked to verified destinations. Use measured artwork bounds to crop excess whitespace in the display without altering source files. Fit artwork within 184 × 88px, with an explicit width exception for very wide wordmarks. Use a 80px artwork-to-artwork gap (48px below 480px) and a 144px strip height. Use “Thank you for supporting Fireside!” with no year label. An 80-second loop continues on hover. Keyboard focus and reduced-motion preferences show a static wrapping list; visual duplicates are hidden from assistive technology and tab order. Record sources and unavailable originals in `assets/sponsors/sources.json`.

## Motion and loading

- `--fr-motion-fast: 180ms`: hover transitions, event filter fades, and late image reveals.
- `--fr-motion-enter: 360ms`: page content entrance.
- `--fr-motion-stagger: 40ms`: delay between visible content groups, capped at three steps (120ms).
- `--fr-motion-ease: cubic-bezier(.22, 1, .36, 1)`: shared settling curve.

`motion.js` progressively enhances the rendered page with an 8px rise and opacity fade. The shared site header stays still. Only visible groups animate; there are no scroll-triggered reveals. Content remains usable immediately and never waits for fonts, images, or animation completion. Returning to a page replays its entrance, switching Events filters fades only content, and an in-page sponsorship anchor does not replay it. The focused heading stays fully visible; subsequent keyboard focus cancels entrance animations. Rapid navigation cancels previous animations. Reduced-motion preferences disable both entrance and image animations, including when changed while an animation is running. Without the Web Animations API, content simply appears.

The two principal font faces are preloaded. The first event cover on each card page loads eagerly, and the illustrative Halloween cover uses an optimized 1200×800 WebP (the PNG original is retained). Existing cover and team-photo frames reserve their space while images load. Use the Motion specimen on `design-system.html` to replay the actual implementation.

## Verification

The reference computes contrast from the actual embedded tokens for primary text, secondary text, and actions. Normal text pairings should remain at least 4.5:1. Decorative gold and rules are not text or focus indicators. This is not a full accessibility audit.

After changing the system: regenerate the reference, run `node --test tests/*.test.cjs`, check desktop and mobile layouts, inspect navigation and event/program routes, and verify focus, reduced-motion behavior, and text overflow. Preserve prior content and functionality unless a change is requested.

Events has two views: Upcoming events and Past events. Upcoming and past events use the same vertically stacked cards with compact side-by-side layouts on larger screens. Dates awaiting confirmation use compact rows. The selected toggle provides the view label, so the content does not repeat it as a heading. Distinct groups such as dates to confirm and older records retain headings. Their toggle sits right-aligned in the Events title row and wraps beneath the title on small screens. Past events combines meetings and other events in reverse date order and retains the school-year records archive. Existing `#meetings` links open the combined past view. Past event detail pages return to `#past-events`.
