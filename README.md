# Salon site generator — first acceptance case

Takes a business source (Google Maps listing, booking page or website) plus a
template count, and renders that many materially distinct websites from one
verified business record.

First business: **Elkin Mack Hair Studio**, 6409 Jimmy Carter Blvd Suite 200,
Norcross, GA 30071. Booking on Booksy.

Next.js 16 · React 19 · TypeScript · Tailwind 4 · static export.
Requires **Node 20.9 or newer**. `npm audit` reports **0 vulnerabilities**.

```bash
npm install
npm run dev     # console at /, previews at /preview/atelier/ and /preview/editorial/
npm run build   # 20 static pages into ./out
npm run qa      # 42 acceptance checks against the built output
npm audit       # expect: found 0 vulnerabilities
```

`npm run qa` requires `npm run build` first — it inspects the built `out/`
directory, not the source. The gate aborts loudly with exit code 2 if it throws,
so a broken check can never be mistaken for a pass.

## Dependency posture

| Choice | Why |
| --- | --- |
| Next 16 | Next 14 is end-of-life and 15 still carries a high-severity postcss advisory. 16 is the current supported major and the only line that audits clean. |
| Tailwind 4 | Tailwind 3 pulls `micromatch`, `braces`, `chokidar` and `postcss-nested`, all with open build-time advisories and no fix on the 3.x line. Tailwind 4 drops that chain and builds roughly three times faster. |
| Versions pinned exactly | No carets on `next`, `react` or `react-dom`. A fresh clone gets the versions this build was verified against, not whatever shipped since. |
| `jsdom` in devDependencies | The QA gate needs it. It is not shipped to the browser. |

Re-run `npm audit` before any release: new advisories land continuously, and a
clean result today is not a permanent state.

## What is here

| Path | What it is |
| --- | --- |
| `src/lib/record.ts` | Business record types. Every fact carries source, retrieval time, confidence, approval status and conflicts. |
| `src/businesses/elkin-mack.ts` | The verified record. The evidence file. |
| `src/templates/shared.tsx` | Guards. An unverified fact cannot reach a page through these. |
| `src/templates/atelier/` | Template A — Cinematic Atelier. |
| `src/templates/editorial/` | Template B — Modern Editorial Studio. |
| `src/app/page.tsx` | Generator intake console. |
| `qa.js` | Acceptance gate, keyed to the brief's requirement IDs. |

## The rule that shapes everything

A fact is published only if its `approvalStatus` is not `unresolved`. Three
things on this record are unresolved, so three things do not appear:

- **Opening hours.** One current third-party source, contradicted by a stale
  directory. Both templates show a Booksy/phone fallback instead.
- **Instagram.** No account matched to this business. Not linked — a wrong link
  sends clients to a stranger.
- **Walk-in and colour policies.** Not re-confirmed. No policy is asserted.

Flip any of these to `verified` in the record and both templates print it.
Nothing else changes.

## Adding a template family

Add an entry to `TEMPLATES` in `src/lib/templates.ts` and a folder under
`src/templates/` exporting `Home, Services, Team, Gallery, About, Visit,
Policies, Privacy`. Routes, params and QA pick it up automatically. The intake
form caps the requested count at the number of real families rather than
shipping the same design twice.

## Deploying a preview

`netlify.toml` sets `X-Robots-Tag: noindex, nofollow` at the edge, in addition
to per-page robots meta. Build and drag `out/` to Netlify, or connect the repo.

Previews must stay noindex. Indexing is switched on only for the selected
template, on the client's own domain, after written authorisation.
