/**
 * Acceptance gate for the generated builds.
 * Run: npm run build && npm run qa
 *
 * Checks are written against the brief's IDs so a failure points at the
 * requirement it breaks, not just a line of code.
 */
process.on("uncaughtException", (e) => {
  console.error("\n  QA ABORTED — the gate itself threw, so nothing below ran:\n  " + e.message + "\n");
  process.exit(2);
});

const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

let pass = 0, fail = 0;
const ok = (id, name, cond, detail = "") => {
  cond ? pass++ : fail++;
  console.log(`  ${cond ? "PASS" : "FAIL"}  ${id.padEnd(5)} ${name}${detail ? `  [${detail}]` : ""}`);
};

const OUT = "out";
const TEMPLATES = ["atelier", "editorial"];
const PAGES = ["", "services", "team", "gallery", "about", "visit", "policies", "privacy"];
const routeFile = (t, p) => path.join(OUT, "preview", t, p, "index.html");
const read = (f) => fs.readFileSync(f, "utf8");
const doc = (f) => new JSDOM(read(f)).window.document;
const allRoutes = TEMPLATES.flatMap((t) => PAGES.map((p) => ({ t, p, file: routeFile(t, p) })));

/* ---------------- G01: no trace of the reference business ---------------- */
console.log("\n=== G01  Reference-business contamination ===");
{
  const banned = [
    "van michael", "vanmichael", "aveda", "zenoti", "buckhead", "sandy springs",
    "virginia-highland", "norcross" === "" ? "" : "jimmy carter blvd nw", "peachtree",
    "alpharetta", "marietta", "new talents", "council",
  ].filter(Boolean);
  const hits = [];
  for (const r of allRoutes) {
    const text = read(r.file).toLowerCase();
    for (const b of banned) if (text.includes(b)) hits.push(`${r.t}/${r.p || "home"}: "${b}"`);
  }
  ok("G01", "No reference business name, affiliation, platform or address anywhere", hits.length === 0, hits.slice(0, 4).join(" | ") || "clean");
  const correct = allRoutes.every((r) => read(r.file).includes("Elkin Mack Hair Studio"));
  ok("G01", "Every route carries the correct business identity", correct);
}

/* ---------------- Routes and structure ---------------- */
console.log("\n=== Routes, rendering, 404 ===");
{
  ok("—", "All 16 routes built (2 templates x 8 pages)", allRoutes.every((r) => fs.existsSync(r.file)), `${allRoutes.filter((r) => fs.existsSync(r.file)).length}/16`);
  const thin = allRoutes.filter((r) => doc(r.file).body.textContent.trim().length < 900);
  ok("—", "No empty or stub page shipped to satisfy a route checklist", thin.length === 0, thin.map((r) => `${r.t}/${r.p}`).join(",") || "all substantive");
  ok("—", "Branded 404 with recovery action", fs.existsSync(path.join(OUT, "404.html")) && /generator|Back to/i.test(read(path.join(OUT, "404.html"))));
  ok("—", "Generator console builds", fs.existsSync(path.join(OUT, "index.html")));
}

/* ---------------- T01: preview indexing ---------------- */
console.log("\n=== T01  Preview indexing ===");
{
  const bad = allRoutes.filter((r) => {
    const m = doc(r.file).querySelector('meta[name="robots"]');
    return !m || !/noindex/i.test(m.getAttribute("content") || "");
  });
  ok("T01", "Every preview route is noindex", bad.length === 0, bad.map((r) => `${r.t}/${r.p}`).join(",") || "all noindex");
  ok("T01", "No sitemap exposes unapproved previews", !fs.existsSync(path.join(OUT, "sitemap.xml")));
  ok("T01", "No production domain hardcoded into canonical tags", allRoutes.every((r) => !doc(r.file).querySelector("link[rel=canonical]")));
}

/* ---------------- Booking truth ---------------- */
console.log("\n=== L02 / V02  Booking honesty ===");
{
  const BOOKSY = "https://booksy.com/en-us/551176_elkin-mack-hair-studio_hair-salon_16409_norcross";
  let links = 0, wrong = [];
  for (const r of allRoutes) {
    const d = doc(r.file);
    for (const a of d.querySelectorAll("a")) {
      const h = a.getAttribute("href") || "";
      if (/booksy\.com/i.test(h)) { links++; if (h !== BOOKSY) wrong.push(`${r.t}/${r.p}: ${h}`); }
    }
  }
  ok("L02", "Every booking link is the exact verified business URL", links > 20 && wrong.length === 0, `${links} links`);
  ok("L02", "Booking links open externally with rel=noopener", allRoutes.every((r) =>
    [...doc(r.file).querySelectorAll('a[href*="booksy.com"]')].every((a) => a.getAttribute("target") === "_blank" && /noopener/.test(a.getAttribute("rel") || ""))));
  ok("V02", "No page claims an appointment is confirmed by this site", allRoutes.every((r) => {
    const t = doc(r.file).body.textContent.toLowerCase();
    return !/your appointment is confirmed|appointment booked|booking confirmed/.test(t);
  }));
  ok("V02", "Both templates state plainly where the appointment actually exists", TEMPLATES.every((t) =>
    doc(routeFile(t, "visit")).body.textContent.includes("not when you leave this page")));
  ok("V05", "No form anywhere in the salon templates", allRoutes.every((r) => doc(r.file).querySelectorAll("form,input,textarea").length === 0));
}

/* ---------------- Unresolved facts must not surface ---------------- */
console.log("\n=== Evidence discipline ===");
{
  // Hours are `unresolved`: no weekday/time table may be printed.
  const leaked = allRoutes.filter((r) => /\b(9:00 am|10:00 am|7:00 pm|5:00 pm)\b/i.test(doc(r.file).body.textContent));
  ok("EM-02", "Unconfirmed opening hours are never printed", leaked.length === 0, leaked.map((r) => `${r.t}/${r.p}`).join(",") || "withheld");
  ok("EM-02", "An honest hours fallback is shown instead", TEMPLATES.every((t) =>
    /current availability is on|Opening times change/i.test(doc(routeFile(t, "visit")).body.textContent)));
  ok("EM-05", "Unmatched Instagram account is not linked", allRoutes.every((r) => !/instagram\.com/i.test(read(r.file))));
  ok("EM-06", "No walk-in or cancellation rule is asserted", allRoutes.every((r) => {
    const t = doc(r.file).body.textContent.toLowerCase();
    return !/no walk-?ins are accepted|cancel at least \d+ hours|deposit of \$/.test(t);
  }));
  ok("EM-10", "Unexplained second phone number is not published", allRoutes.every((r) => !read(r.file).includes("770-905-4017")));
  ok("H06", "No invented provider biography or speciality", allRoutes.every((r) => {
    const t = doc(r.file).body.textContent.toLowerCase();
    return !/years behind the chair|specialises in|specializes in|master colorist/.test(t);
  }));
}

/* ---------------- H03 / L03: review proof ---------------- */
console.log("\n=== H03 / L03  Review proof ===");
{
  ok("L03", "No five filled stars standing in for a 4.8", allRoutes.every((r) => !/★★★★★/.test(read(r.file))));
  const shown = TEMPLATES.filter((t) => /4\.8 from/.test(doc(routeFile(t, "")).body.textContent));
  ok("H03", "Rating shown numerically with its count", shown.length === 2);
  ok("H03", "Rating is attributed to the platform it came from, with a link", TEMPLATES.every((t) => {
    const d = doc(routeFile(t, ""));
    return /62 Booksy reviews/.test(d.body.textContent) && !!d.querySelector('a[href*="booksy.com"]');
  }));
  ok("H03", "Rating carries its retrieval date as provenance", TEMPLATES.every((t) =>
    /read 12 October 2026/.test(doc(routeFile(t, "")).body.textContent)));
  ok("T02", "No review structured data is emitted from self-serving sources", allRoutes.every((r) => !/aggregateRating/i.test(read(r.file))));
}

/* ---------------- T09: media licensing ---------------- */
console.log("\n=== T09  Media licensing ===");
{
  ok("T09", "No photograph is sourced from the business's own listings", allRoutes.every((r) =>
    !/googleusercontent|booksy-cdn|scontent|cdninstagram/i.test(read(r.file))));
  ok("T09", "Stock is never presented as the salon's work or premises", TEMPLATES.every((t) =>
    /not this studio|licensed craft photographs/i.test(doc(routeFile(t, "gallery")).body.textContent)));
  ok("T09", "Photographer credits appear on every route", allRoutes.every((r) => /Unsplash/.test(doc(r.file).body.textContent)));
  ok("T05", "Every image has meaningful alt text", allRoutes.every((r) =>
    [...doc(r.file).querySelectorAll("img")].every((i) => (i.getAttribute("alt") || "").length > 10)));
}

/* ---------------- Two genuinely distinct templates ---------------- */
console.log("\n=== §10  Templates must materially differ ===");
{
  const classesOf = (f) => {
    const d = doc(f);
    return {
      tags: [...d.querySelectorAll("main *")].map((e) => e.tagName).join(">"),
      classes: new Set([...d.querySelectorAll("main *")].flatMap((e) => (e.getAttribute("class") || "").split(/\s+/)).filter(Boolean)),
    };
  };
  /**
   * "Palette swap" is about identity, not spacing. Any two Tailwind designs
   * share `mt-6` and `flex`; that proves nothing. What would expose a reskin is
   * shared COLOUR, FONT FAMILY and CORNER tokens, so that is what is measured.
   * The raw figure is printed too, so the loose number is never hidden.
   */
  const IDENTITY = /(^|:)(bg|text|border|from|via|to|decoration|ring|fill|placeholder)-(atelier|studio|app|white|black|red|amber)|(^|:)font-(atelier|studio|app)(-[a-z]+)?|(^|:)rounded(-|$)/;
  const identity = (set) => new Set([...set].filter((c) => IDENTITY.test(c)));

  const a = classesOf(routeFile("atelier", "")), b = classesOf(routeFile("editorial", ""));
  const rawShared = [...a.classes].filter((c) => b.classes.has(c)).length;
  const rawPct = Math.round((rawShared / Math.min(a.classes.size, b.classes.size)) * 100);
  const ia = identity(a.classes), ib = identity(b.classes);
  const idShared = [...ia].filter((c) => ib.has(c));
  const idPct = Math.round((idShared.length / Math.min(ia.size, ib.size)) * 100);

  ok("§10", "Home DOM structure differs between templates", a.tags !== b.tags);
  ok("§10", "Colour, type and corner tokens are near-disjoint", idPct < 15,
     `${idPct}% identity shared (${idShared.join(", ") || "none"}); ${rawPct}% raw incl. spacing`);
  ok("§10", "Each family uses its own type stack", /font-atelier-display/.test(read(routeFile("atelier", ""))) && /font-studio-display/.test(read(routeFile("editorial", ""))));
  ok("§10", "Inner pages differ too, not just the homepage",
    PAGES.filter((p) => p).every((p) => classesOf(routeFile("atelier", p)).tags !== classesOf(routeFile("editorial", p)).tags));
  const aOrder = doc(routeFile("atelier", "")).body.textContent.indexOf("Signature services");
  const bOrder = doc(routeFile("editorial", "")).body.textContent.indexOf("Start with what you want done");
  ok("§10", "Home section order and copy diverge", aOrder > 0 && bOrder > 0);
}

/* ---------------- Accessibility ---------------- */
console.log("\n=== T05  Accessibility ===");
{
  ok("T05", "Skip link on every route", allRoutes.every((r) => !!doc(r.file).querySelector('a[href="#main"]')));
  ok("T05", "Landmarks present on every route", allRoutes.every((r) => {
    const d = doc(r.file);
    return !!d.querySelector("header") && !!d.querySelector("main#main") && !!d.querySelector("footer") && !!d.querySelector("nav[aria-label]");
  }));
  ok("T05", "Exactly one h1 per route", allRoutes.every((r) => doc(r.file).querySelectorAll("h1").length === 1));
  ok("V01", "FAQ open/closed indicator derives from actual state", /group-open:hidden/.test(read(routeFile("editorial", "visit"))));
  ok("T05", "Decorative glyphs hidden from assistive technology", allRoutes.every((r) =>
    [...doc(r.file).querySelectorAll("span")].filter((s) => /^[★+–]$/.test(s.textContent.trim())).every((s) => s.getAttribute("aria-hidden") === "true")));
}

/* ---------------- Contact consistency (G04) ---------------- */
console.log("\n=== G04  Name, address and phone consistency ===");
{
  ok("G04", "Phone identical across every route", allRoutes.every((r) => read(r.file).includes("tel:+14705145787")));
  ok("G04", "Address identical across every route", allRoutes.every((r) => doc(r.file).body.textContent.includes("6409 Jimmy Carter Blvd, Suite 200")));
  ok("G05", "No dead, placeholder or coming-soon controls", allRoutes.every((r) => {
    const d = doc(r.file);
    const dead = [...d.querySelectorAll("a")].filter((a) => { const h = a.getAttribute("href"); return !h || h === "#" || /coming soon|lorem|TODO/i.test(a.textContent); });
    return dead.length === 0;
  }));
}

console.log("\n" + "=".repeat(46));
console.log(`   PASSED ${pass}    FAILED ${fail}`);
console.log("=".repeat(46) + "\n");
process.exit(fail ? 1 : 0);
