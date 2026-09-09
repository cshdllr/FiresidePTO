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
