# Salon site generator — project context

## What this is

A generator that takes a business source (Google Maps listing, booking page, or
website) plus a template count, and renders that many **materially distinct**
websites from one verified business record.

Built for an agency. The acceptance case is **Elkin Mack Hair Studio**, a
one-location, multi-provider hair salon in Norcross, GA that books through
Booksy. Two templates are required.

Stack: Next.js 16 · React 19 · TypeScript · Tailwind 4 · static export.
Node 20.9+. Versions are pinned exactly on purpose — do not add carets.

## Commands

```bash
npm install
npm run dev       # console at /, previews at /preview/atelier/ and /preview/editorial/
npm run build     # 19 static pages into ./out
npm run qa        # 42 acceptance checks — REQUIRES npm run build first
npm audit         # must stay at: found 0 vulnerabilities
```

## Layout

| Path | What it is |
| --- | --- |
| `src/lib/record.ts` | Business record types. Every fact carries source, retrieval time, confidence, approval status, conflicts. |
| `src/businesses/elkin-mack.ts` | The verified record. **This is the evidence file.** |
| `src/lib/templates.ts` | Template registry and route list. |
| `src/templates/shared.tsx` | Guards. Unverified facts cannot reach a page through these. |
| `src/templates/atelier/` | Template A — Cinematic Atelier (charcoal / ivory / champagne, display serif). |
| `src/templates/editorial/` | Template B — Modern Editorial Studio (porcelain / ink / plum, editorial sans). |
| `src/app/page.tsx` | Generator intake console. |
| `src/components/GeneratorForm.tsx` | Intake form with URL validation and SSRF-shaped-input rejection. |
| `qa.js` | Acceptance gate, keyed to the client brief's requirement IDs. |

## The one rule everything depends on

**A fact is published only if its `approvalStatus` is not `unresolved`.**

The renderers enforce this through `Verified`, `publishable()` and
`needsProvenance()` in `src/templates/shared.tsx`. Single-source or moving
values render with a visible `Provenance` line showing source and retrieval
date. This is not decoration — the client rejected two earlier builds for
presenting unverified content as fact.

Three things on the current record are `unresolved`, so three things do not
appear anywhere:

| Withheld | Why |
| --- | --- |
| **Opening hours** | One current third-party source, contradicted by a ~19-month-old directory. Both templates show a Booksy/phone fallback. |
| **Instagram** | No account matched to this business. A wrong link sends clients to a stranger. |
| **Walk-in and colour policies** | Not re-confirmed. No policy is asserted anywhere. |

Flip any of these to `verified` in `src/businesses/elkin-mack.ts` and both
templates print it automatically. Nothing else needs to change.

## Verified business facts (read 12 October 2026)

- Elkin Mack Hair Studio, 6409 Jimmy Carter Blvd Suite 200, Norcross, GA 30071
- Phone `470-514-5787` → `tel:+14705145787`
- Booking: Booksy, listing `551176`. **One location, five providers.** Never
  convert providers into locations.
- Rating: 4.8 from 62 **Booksy** reviews. It moves (51 → 56 → 62 over two
  months). Always attributed to Booksy, never called a Google rating.
- Prices are **standard** rates, not the "save up to 10%" promotional ones.
  Promotions expire; a stale discount is worse than no price. Always "from".
- Providers: Elkin Medina, Jenifer Vidal (Booksy staff list); Carlos Nava,
  Omar Espinel, Erick Colina (brief, single-source). Names only — **no invented
  biographies, credentials or specialties.**

## Hard constraints — breaking any of these fails acceptance

1. **No reference-business contamination.** An earlier demo was built for Van
   Michael Salon. QA scans every built page for "van michael", "aveda",
   "zenoti", "buckhead", "peachtree", "new talents" and similar. Zero hits.
2. **No invented facts.** No hours, policies, awards, founding dates, review
   text, specialties or biographies without a source in the record.
3. **No stock photo presented as the salon's work, staff or premises.**
   `AssetImage` throws if a `stock` asset is placed in a `work`, `portrait` or
   `premises` slot. All current imagery is licensed Unsplash, decorative only,
   credited on every route.
4. **No photograph pulled from the business's own listings.** A public Booksy
   or Google listing is not a licence. QA blocks `googleusercontent`,
   `cdninstagram`, `scontent`, `booksy-cdn`.
5. **Previews stay `noindex, nofollow`** — per-page metadata plus an
   `X-Robots-Tag` header in `netlify.toml`. The business has not authorised
   publication. No sitemap, no canonical to a production domain.
6. **No forms in the salon templates.** A form that silently fails is a release
   blocker. Phone and Booksy only, until a monitored inbox exists.
7. **Never imply this site made an appointment.** Booking hands off to Booksy;
   both Visit pages say the appointment exists when Booksy confirms it.
8. **No five filled stars for a 4.8.** Numeric score, one neutral star, linked
   to the source.
9. **Templates must differ structurally**, not by palette. QA measures colour,
   font and corner tokens: currently 6% shared (one pill radius). It also prints
   the raw 48% including spacing, because any two Tailwind designs share `mt-6`.

## QA discipline

`npm run qa` inspects `out/`, not source — **build first**. The gate installs an
`uncaughtException` handler that prints `QA ABORTED` and exits 2.

**Read the full output, never just the tail.** A previous session reported
"42/42 passing" from a truncated tail while the gate was actually crashing at
line 168. If you report a pass, you must have seen the summary line with
`FAILED 0` from a run that completed.

When a check fails, work out whether the check or the code is wrong **before**
changing either, and say which. If you change a threshold, print both the old
and new measurement so nothing is hidden.

## Open blockers

| ID | Sev | Issue | Owner |
| --- | --- | --- | --- |
| EM-01 | P0 | No written authorisation to publish under this business's name. **The only true blocker.** | Client services |
| EM-02 | P0 | Opening hours unresolved. | Business owner |
| EM-03 | P0 | No cleared photography of the salon, team or work. | Business owner |
| EM-04 | P1 | Provider roster is names only; three of five are single-source. | Business owner |
| EM-05 | P1 | Instagram account not matched. | Research |
| EM-06 | P1 | Walk-in and colour policies not re-confirmed. | Business owner |
| EM-07 | P1 | Prices read 12 Oct 2026 during a promotion. Confirm currency. | Business owner |
| EM-08 | P1 | A second similarly named Booksy listing exists at the same street. | Research |
| EM-09 | P1 | No hero video cleared. Slot is wired and empty; poster-only. | Client services |
| EM-10 | P2 | Unexplained second phone number on Facebook. Not published. | Business owner |

Status is **Needs review**, not Production ready, while P0s are open. Do not
mark it green.

## Not yet done

- **The research worker.** Intake, validation and renderers ship. Retrieval,
  identity resolution and asset licensing need a server: API credentials,
  SSRF-guarded fetching, per-business isolation, rate limits. The Elkin Mack
  record was produced by running that pipeline by hand.
- **Real-browser testing.** QA runs in jsdom. No iOS Safari / Android Chrome
  certification, no Lighthouse numbers. Do not claim either.
- **Hero video.** `HeroMedia` supports muted/inline/poster/reduced-motion; no
  licensed clip exists.

## Next tasks, in order

1. Per-provider Booksy deep links — **only if verified** to preserve the
   stylist selection. Add to `booking.deepLinks`; the team pages already adapt.
2. Stand up the research worker behind the intake form.
3. Add a third template family: register it in `TEMPLATES` and add a folder
   under `src/templates/` exporting `Home, Services, Team, Gallery, About,
   Visit, Policies, Privacy`. Routes, params and QA pick it up automatically.
4. Real-device and Lighthouse testing once a preview is hosted.

## Working style the client expects

Verify before claiming. Say what is unverified. Never present a guess as a
finding. Three builds were rejected for the opposite, and the last feedback was
"review this thoroughly yourself — you are just treating me as your QA."
