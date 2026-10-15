# Content migration record

Imported September 9, 2026 from public pages and documents linked by the existing Fireside PTO website. `content.js` is the single editable content source. This is a reviewed snapshot, not a live scraper. Changes to the old website do not automatically update this repository.

## Sources and coverage

| Source | Imported information |
| --- | --- |
| [Homepage](https://www.firesidepto.org/) | Current event listings, donation destination, school/community links |
| [Meetings & Minutes](https://www.firesidepto.org/meetingsminutes) | Four confirmed upcoming general-meeting dates, times, location, and hospitality details |
| [2026–27 meeting index](https://docs.google.com/document/d/1ITR581MbFxG0RLNDTQe8dMXvhlLCw5XEtr2dtHO8odc/edit) | July 30 board agenda/minutes; August 21 coffee/chat; current schedule cross-check |
| [2025–26 meeting index](https://docs.google.com/document/d/1vYphmWpMnJl7Dib-D7IvyZfhMQPUhQEvod3hoxYwLaE/edit) | 17 dated meetings: 11 board, five general meetings/reception with records, one coffee/chat without records |
| [Meeting archive](https://docs.google.com/document/d/16iDrdOXmZVlK3X2jXQ81Q5N1UsZRyvEUwSic4-W5Kfc/edit) | 97 original links grouped by school year, extending to 2004–05; labels distinguish meeting records and financial statements |
| [PTO Board](https://www.firesidepto.org/ptoboard) | 11 role holders, including the principal and non-board bookkeeper; published role email addresses |
| [Financials, Policies & Forms](https://www.firesidepto.org/policiesforms) | 15 budget, form, and policy links, excluding ambiguous duplicates |
| [Volunteering](https://www.firesidepto.org/volunteering) | Nine committee summaries and published time commitments |

The live HTML was read directly because search-engine copies of several pages were stale. Google Docs indexes were read with public HTML/text exports to preserve document associations. Raw source dumps, attendance lists, and full minutes are not committed. Documents remain with their original owners; the site stores links and concise editorial summaries.

The five recent general-meeting minutes and July 30, 2026 board minutes were read for summaries. Other record links were preserved from the public index without asserting that every historical document remains publicly accessible. Do not label minutes “approved” unless the approval is verified separately.

## Conflicts and decisions

- **Volunteer appreciation, 2027:** homepage says May 5, meeting page May 8, current index and July planning minutes May 12. Stored without a confirmed date; displayed under “Dates to confirm.”
- **Fun Run, 2026:** homepage says “Friday, Sep 26th.” September 26, 2026 is Saturday. Stored without a confirmed date. The source's published time is labeled for confirmation.
- **Movie night, 2026:** current homepage says October 2, 5:30–8:30 pm; July planning minutes mention October 3. Current homepage date is retained with a visible source-conflict note. Location is not supplied.
- **January 30, April 15, and May 13, 2026 general meetings:** the 2025–26 index gives 2026, but the minutes' headings retain 2025. Dates follow the index, also consistent with the stated weekdays, meeting sequence, and discussion of the 2026–27 board. Detail pages disclose the mismatch.
- **May 13 reception:** index ends at 4:30 pm; minutes end at 4:15 pm. Both are recorded. The minutes give Rocky Mountain Tap & Garden as the location.
- **Principal contact:** Kristen Smetzer's roster link points to `christa.keppler@bvsd.org`. That mismatched address is deliberately not imported. Families can contact the PTO for an introduction.
- **Sivan Kfir contact:** the shared Programs address is used for both Programs Co-Chairs, based on the published role contact and volunteering page; no personal address was invented.
- **Older financial reports:** “2025-2026 Budget vs. Actuals,” “2025-2026 Budget,” and “2024-2025 Budget vs. Actuals” all point to one PDF. These three labels are withheld pending confirmation. Unlabeled PDF anchors are also omitted.
- **Archive gaps:** years listed without linked documents remain visibly incomplete. Unlinked months are not presented as existing records. The source contains some repeated links; original associations are retained rather than guessed corrections.
- **Photos:** the public roster provides a group image, not individually identified portraits. Individual cards retain named placeholders; no people were identified from photographs.

## Maintaining the content

Edit `content.js` to change events, meetings, resources, team members, or committees. Dates use `YYYY-MM-DD`; `null` means unconfirmed and excludes an event from the featured/upcoming chronology. The homepage selects the earliest dated non-board event on or after today's date in America/Denver. Past meetings are selected from meeting records by date. Non-meeting events do not get a minutes section.

Every meeting has an ID, type (`general` or `board`), date, source URL, document links, and optional editorial summary. Do not add attendance lists or sensitive information merely because a document is linked publicly. Keep dates and contacts verifiable, and record future corrections here.

The new hash URLs (for example `#event/2026-04-15-general`) work on GitHub Pages without server routing. Navigation supports browser back/forward and focuses the destination heading after a view change.

## October 7, 2026 expansion

Re-read the live [Volunteering](https://www.firesidepto.org/volunteering) page and preserved the original descriptions for all nine program pages. No identified program photos were available; `photos` is ready for supplied images.

Fundraising content follows the live [Fundraising](https://www.firesidepto.org/fundraising), [King Soopers](https://www.firesidepto.org/grocerystore), [Milk Caps](https://www.firesidepto.org/additionalnocostprograms), [Sponsorships](https://www.firesidepto.org/sponsorships), and [Spirit Wear](https://www.firesidepto.org/spiritwear) pages. King Soopers organization code: NE165. The source states 5¢ per Longmont Dairy cap and lobby collection. Sponsorship inquiries use the published fundraising role address. No sponsorship prices or benefits were invented. The apparel image and shop URL are from the original spirit-wear page.

Sponsor destinations were verified against their official business websites. The existing sponsor artwork remains labeled 2025–2026; no new sponsorship relationship is implied:

- Old Friends — former website link disabled on October 10 after it redirected to unrelated content.
- [E&L Team](https://eandlteam.com/)
- [The Goddard School of Louisville](https://www.goddardschool.com/schools/co/louisville/louisville)
- [Got Game Sports](https://gotgamecamp.com/colorado-programs-birthday-parties-and-events/)
- [MC Homes](https://www.mchomes.co/about)
- [Ascend Orthodontics](https://www.ascend-orthodontics.com/)
- [OptiMindHealth](https://www.optimindhealth.com/)
- [Paul’s Coffee & Tea](https://www.paulscoffeeandtea.com/)
- [The Louisville Underground](https://www.thelouisvilleunderground.com/)
- [Art Major Louisville](https://artmajorstudio.com/louisville-colorado/)
- [The Singing Cook](https://www.singingcookstore.com/)
- [Relish](https://www.visitrelish.com/)

The event schedule and team roster remain the September import; this pass did not reverify dates or role holders. No placeholder seasonal event or invented flyer was added. Date-range and optional-media behavior is covered using test fixtures only.

### Homepage card exploration

Added Halloween costume sale for October 1–31, 2026 at the user’s request. Hours, location, and purchase details are not yet supplied. Its generated illustrative cover is not actual sale inventory; generation method and final prompt are in `assets/halloween-costume-sale.txt`. The prior note about no sample seasonal event describes the earlier import.

## Team photos — October 7, 2026

Eight photos supplied by the user in “PTO Board Profile Pics”, matched by filename to Natalie Drummond, Ashley Masin, Heather Kistler Kinz, Chloe Fitch, Sivan Kfir, Shelly Shacham, Elinor Mayer-Tzang, and Jessica Robinson. Web-sized JPEG copies are stored in `assets/team/`; original files remain unchanged. Leanne Duhon, Kristen Smetzer, and Jon Mortimer retain initials.

The Halloween cover has a 1200×800 WebP derivative for faster page loading. The generated PNG original is retained; the illustration’s content is unchanged.

## Sponsor artwork — October 10, 2026

Replaced eleven screenshot crops with unedited originals from official business websites or their linked business services. Exact source URLs, source dimensions, measured artwork bounds, and verification notes are in [the sponsor source manifest](assets/sponsors/sources.json). E&L Team and Goddard use their current official logo variants. Paul’s uses the sharper green logo supplied on the gift-card page linked from its official site. The roster is unchanged; new artwork does not imply a renewed sponsorship.

Old Friends retains a crop from the sharper original poster on the [PTO Sponsorships page](https://www.firesidepto.org/sponsorships). No separate original was verified. Its former website domain redirects to unrelated gambling content, so the carousel no longer links there. A replacement logo and verified destination can be supplied later.

Excess whitespace is cropped with CSS viewports; downloaded originals remain intact. Sizes and gaps are based on the visible artwork rather than each source file’s canvas.

## Spirit wear product strip — October 15, 2026

Three original merchandise photos from the [PTO spirit wear page](https://www.firesidepto.org/spiritwear) are stored locally, unedited, for the shared Home and Fundraising strip. These are product examples; current stock and pricing remain in the linked shop.

- `assets/spirit-wear/sweatshirt.png`: https://static.wixstatic.com/media/f8a287_3aa3f70af23a429da75fc44ff2c772ce~mv2.png
- `assets/spirit-wear/cap.png`: https://static.wixstatic.com/media/f8a287_8b80783c167d4090b4c1588f94c4f2bc~mv2.png
- `assets/spirit-wear/t-shirt.png`: https://static.wixstatic.com/media/f8a287_ad1c6c1ff00c43a18027a723d2763494~mv2.png

## Event and minutes audit — October 15, 2026

Re-read the live homepage and Meetings & Minutes page, and downloaded fresh public exports of the 2026–27 index, 2025–26 index, and older archive. Compared linked Google document/file IDs against `content.js`.

- All 32 agenda/minutes links for the 16 documented 2025–26 meetings were already imported; that year's coffee/chat has no documents.
- Added September 11 and October 9, 2026 board meetings with their newly linked agendas. Both agendas confirm Fireside Elementary, 8:10–9:45 am. The September agenda's link label says 9.12.26, but its body and index date agree on September 11. Neither index entry links minutes yet. No agenda text is presented as a meeting recap.
- September 16, 2026 general-meeting minutes are still not linked in the source index. The detail page retains its minutes-when-available message. July 30 remains the only 2026–27 entry with linked minutes in this index.
- Added the homepage's Labor Day Parade, September 7, 2026, 8:00–10:30 am. Its location and documents are not published; none were invented. The year follows the homepage's 2026 event context and matching Monday weekday.
- All linked document/file destinations in the older archive are represented by the existing 97 labeled links across 21 school-year sections, reaching 2004–05. The export also contains an unlabeled duplicate of the May 2017–18 financial statement; its labeled occurrence is already preserved. Empty archive years remain empty. Older records stay grouped by school year rather than being assigned invented event dates.
- The site now has 25 dated meeting entries (22 past as of this audit), with minutes attached to 17 and agendas attached to 19. Two dated source community events are past: the parade and movie night. The Fun Run date remains unresolved because the homepage's weekday and calendar date disagree. Existing source conflicts are preserved.

This confirms coverage of the published indexes and homepage listings, not every event ever held at the school. The original site provides no complete historical community-event listing on these pages. Linked minutes remain in their original Google documents; this audit did not copy every document locally or verify access to every legacy file. `eventsVerifiedAt` records this audit separately from the original import date.
