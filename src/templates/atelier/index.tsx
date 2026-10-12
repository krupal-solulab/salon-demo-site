import type { BusinessRecord } from "@/lib/record";
import { publishable } from "@/lib/record";
import { ROUTES } from "@/lib/templates";
import {
  AssetCredits, AssetImage, BookLink, BookingTruth, GalleryNotice, HeroMedia,
  HoursBlock, PriceCaveat, PriceRow, Provenance, ReviewProof,
} from "@/templates/shared";

/* Cinematic Atelier — charcoal ground, ivory type, champagne hairlines.
   Image-led chapters, generous vertical rhythm, one idea per screen. */

const base = "/preview/atelier";
const href = (slug: string) => (slug ? `${base}/${slug}/` : `${base}/`);

const btn = "inline-flex min-h-[52px] items-center justify-center px-8 text-[14px] font-semibold uppercase tracking-[.12em] transition-colors";
const btnGold = `${btn} bg-atelier-champagne text-atelier-deep hover:bg-atelier-ink`;
const btnLine = `${btn} border border-atelier-soft/40 text-atelier-ink hover:border-atelier-ink`;
const rule = "border-t border-atelier-champagne/25";
const kicker = "mb-5 text-[11px] font-semibold uppercase tracking-[.22em] text-atelier-champagne";

function Shell({ children, record }: { children: React.ReactNode; record: BusinessRecord }) {
  return (
    <div className="min-h-screen bg-atelier-bg font-atelier-body text-atelier-ink">
      <a href="#main" className="absolute left-[-9999px] top-0 z-[200] bg-atelier-champagne px-5 py-3 text-atelier-deep focus:left-0">Skip to content</a>
      <header className="sticky top-0 z-50 border-b border-atelier-champagne/15 bg-atelier-bg/92 backdrop-blur">
        <div className="mx-auto flex max-w-site items-center gap-5 px-5 py-4 lg:px-10">
          <a href={href("")} className="font-atelier-display text-[18px] leading-none tracking-[.06em]">
            Elkin Mack<span className="block pt-1 font-atelier-body text-[9px] uppercase tracking-[.3em] text-atelier-soft">Hair Studio · Norcross</span>
          </a>
          <nav aria-label="Main" className="ml-auto hidden items-center gap-7 xl:flex">
            {ROUTES.filter((r) => !["policies", "privacy"].includes(r.slug)).map((r) => (
              <a key={r.slug} href={href(r.slug)} className="text-[12px] uppercase tracking-[.16em] text-atelier-soft hover:text-atelier-ink">{r.label}</a>
            ))}
          </nav>
          <BookLink record={record} className={`${btnGold} ml-auto !min-h-[42px] !px-5 !text-[11px] xl:ml-0`}>Book</BookLink>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className={`${rule} mt-0 bg-atelier-deep px-5 py-14 lg:px-10`}>
        <div className="mx-auto grid max-w-site gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-atelier-display text-[20px]">Elkin Mack Hair Studio</p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-atelier-soft">
              {record.contact.street.value}<br />{record.contact.city}, {record.contact.state} {record.contact.zip}
            </p>
            <p className="mt-2 text-[14.5px]"><a href={record.contact.phoneHref} className="hover:text-atelier-champagne">{record.contact.phone.value}</a></p>
          </div>
          <nav aria-label="Pages"><ul className="m-0 list-none p-0">
            {ROUTES.map((r) => (
              <li key={r.slug} className="mb-[10px] text-[14px] text-atelier-soft"><a href={href(r.slug)} className="hover:text-atelier-ink">{r.label}</a></li>
            ))}
          </ul></nav>
          <div>
            <ul className="m-0 list-none p-0">
              <li className="mb-[10px] text-[14px] text-atelier-soft"><BookLink record={record} className="hover:text-atelier-ink" /></li>
              {publishable(record.social.facebook) && record.social.facebook.value && (
                <li className="mb-[10px] text-[14px] text-atelier-soft"><a href={record.social.facebook.value} target="_blank" rel="noopener noreferrer" className="hover:text-atelier-ink">Facebook</a></li>
              )}
              <li className="mb-[10px] text-[14px] text-atelier-soft"><a href={record.contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-atelier-ink">Directions</a></li>
            </ul>
            <AssetCredits record={record} className="mt-6 text-[12px] leading-relaxed text-atelier-soft/70" />
          </div>
        </div>
      </footer>
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-atelier-champagne/20 bg-atelier-deep/95 p-3 backdrop-blur xl:hidden">
        <a href={record.contact.phoneHref} className={`${btnLine} !min-h-[44px] flex-1 !px-3 !text-[11px]`}>Call</a>
        <BookLink record={record} className={`${btnGold} !min-h-[44px] flex-1 !px-3 !text-[11px]`}>Book</BookLink>
      </div>
      <div className="h-[68px] xl:hidden" />
    </div>
  );
}

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`px-5 py-16 lg:px-10 lg:py-24 ${className}`}><div className="mx-auto max-w-site">{children}</div></section>
);
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-atelier-display text-[clamp(28px,4vw,46px)] leading-[1.1]">{children}</h2>
);

/* ------------------------------ pages ------------------------------ */

export function Home({ record }: { record: BusinessRecord }) {
  const [hero, a2, a3, a4] = record.assets;
  const top = record.services.slice(0, 4);
  return (
    <Shell record={record}>
      <section className="relative flex min-h-[78vh] items-end overflow-hidden">
        <HeroMedia poster={hero} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,9,.72)_0%,rgba(12,10,9,.42)_40%,rgba(12,10,9,.94)_100%)]" />
        <div className="relative mx-auto w-full max-w-site px-5 pb-16 pt-28 lg:px-10">
          <p className={kicker}>Norcross, Georgia</p>
          <h1 className="max-w-[13ch] font-atelier-display text-[clamp(44px,8vw,96px)] leading-[0.98]">Your next look starts here.</h1>
          <p className="mt-7 max-w-[46ch] text-[17px] leading-relaxed text-atelier-soft">
            Cuts, colour and styling by a small team on Jimmy Carter Boulevard. Choose your stylist and your time on{" "}
            {record.booking.platform}.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <BookLink record={record} className={btnGold} />
            <a href={href("gallery")} className={btnLine}>Explore our work</a>
          </div>
          <p className="mt-7 text-[13.5px] text-atelier-soft">
            <ReviewProof record={record} />
            <Provenance field={record.reviewProof.rating} className="mt-1 max-w-[52ch]" />
          </p>
        </div>
      </section>

      <Section className={rule}>
        <p className={kicker}>The work</p>
        <H2>Craft, close up.</H2>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[a2, a3, a4].map((a) => (
            <figure key={a.id} className="m-0 overflow-hidden bg-atelier-raise">
              <AssetImage asset={a} slot="decorative" className="aspect-[4/5] w-full object-cover" />
            </figure>
          ))}
        </div>
        <GalleryNotice className="mt-7 max-w-[62ch] text-[14px] leading-relaxed text-atelier-soft" />
        <p className="mt-6"><a href={href("gallery")} className="border-b border-atelier-champagne pb-1 text-[14px] uppercase tracking-[.14em] text-atelier-champagne">See the full set</a></p>
      </Section>

      <Section className={`${rule} bg-atelier-deep`}>
        <p className={kicker}>Signature services</p>
        <H2>What we do, and what it costs.</H2>
        <div className="mt-10 grid gap-x-14 gap-y-10 md:grid-cols-2">
          {top.map((c) => (
            <div key={c.slug}>
              <h3 className="font-atelier-display text-[23px]">{c.name}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-atelier-soft">{c.summary}</p>
              <div className="mt-4">{c.items.map((i) => <PriceRow key={i.name} item={i} />)}</div>
            </div>
          ))}
        </div>
        <PriceCaveat record={record} className="mt-10 max-w-[68ch] text-[14px] leading-relaxed text-atelier-soft" />
        <p className="mt-6"><a href={href("services")} className={btnLine}>The full menu</a></p>
      </Section>

      <Section className={rule}>
        <p className={kicker}>The team</p>
        <H2>Five pairs of hands.</H2>
        <p className="mt-5 max-w-[56ch] text-[15px] leading-relaxed text-atelier-soft">
          You pick your stylist when you book. We are not publishing biographies or specialities for anyone until the
          studio confirms them, so the list below is names only.
        </p>
        <ul className="mt-10 grid list-none gap-px bg-atelier-champagne/20 p-0 sm:grid-cols-2 lg:grid-cols-5">
          {record.providers.value.map((p) => (
            <li key={p.name} className="bg-atelier-bg px-5 py-8 text-center">
              <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-atelier-champagne/40 font-atelier-display text-[20px] text-atelier-champagne">
                {p.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </span>
              <span className="block font-atelier-display text-[17px]">{p.name}</span>
            </li>
          ))}
        </ul>
        <Provenance field={record.providers} className="mt-6 max-w-[62ch] text-atelier-soft" />
      </Section>

      <Section className={`${rule} bg-atelier-deep`}>
        <p className={kicker}>Visit</p>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <H2>{record.contact.street.value}</H2>
            <p className="mt-4 text-[16px] text-atelier-soft">{record.contact.city}, {record.contact.state} {record.contact.zip}</p>
            <p className="mt-2 text-[16px]"><a href={record.contact.phoneHref} className="border-b border-atelier-champagne pb-1">{record.contact.phone.value}</a></p>
            <div className="mt-8 flex flex-wrap gap-3">
              <BookLink record={record} className={btnGold} />
              <a href={record.contact.mapsUrl} target="_blank" rel="noopener noreferrer" className={btnLine}>Directions</a>
            </div>
          </div>
          <div className="border border-atelier-champagne/25 p-7">
            <h3 className="mb-4 font-atelier-display text-[20px]">Opening times</h3>
            <HoursBlock record={record} tone="dark" />
          </div>
        </div>
        <BookingTruth record={record} className="mt-12 max-w-[66ch] text-[14px] leading-relaxed text-atelier-soft" />
      </Section>
    </Shell>
  );
}

export function Services({ record }: { record: BusinessRecord }) {
  return (
    <Shell record={record}>
      <Section>
        <p className={kicker}>Services</p>
        <h1 className="max-w-[16ch] font-atelier-display text-[clamp(36px,6vw,68px)] leading-[1.02]">The menu, in full.</h1>
        <PriceCaveat record={record} className="mt-7 max-w-[66ch] text-[15px] leading-relaxed text-atelier-soft" />
      </Section>
      {record.services.map((c, i) => (
        <Section key={c.slug} className={`${rule} ${i % 2 ? "bg-atelier-deep" : ""}`}>
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <H2>{c.name}</H2>
              <p className="mt-4 max-w-[40ch] text-[15px] leading-relaxed text-atelier-soft">{c.summary}</p>
              <BookLink record={record} className={`${btnLine} mt-7`}>Book {c.name.toLowerCase()}</BookLink>
            </div>
            <div className="pt-2">{c.items.map((it) => <PriceRow key={it.name} item={it} />)}</div>
          </div>
        </Section>
      ))}
      <Section className={rule}>
        <H2>Not sure which service?</H2>
        <p className="mt-4 max-w-[58ch] text-[15px] leading-relaxed text-atelier-soft">
          Extensions and corrective colour are quoted after someone looks at your hair, because length, density and
          what has been on it before all change the work. Book the nearest service and say what you are after in the
          notes, or call.
        </p>
        <Provenance field={record.servicesEvidence} className="mt-6 max-w-[64ch] text-atelier-soft" />
        <div className="mt-8 flex flex-wrap gap-3">
          <BookLink record={record} className={btnGold} />
          <a href={record.contact.phoneHref} className={btnLine}>{record.contact.phone.value}</a>
        </div>
      </Section>
    </Shell>
  );
}

export function Team({ record }: { record: BusinessRecord }) {
  return (
    <Shell record={record}>
      <Section>
        <p className={kicker}>Our team</p>
        <h1 className="max-w-[16ch] font-atelier-display text-[clamp(36px,6vw,68px)] leading-[1.02]">The people behind the chair.</h1>
        <p className="mt-7 max-w-[60ch] text-[16px] leading-relaxed text-atelier-soft">
          Choose a stylist as you book on {record.booking.platform}. Portraits and specialities will appear here once
          the studio supplies them — we would rather show a name we can stand behind than invent a biography.
        </p>
      </Section>
      <Section className={rule}>
        <div className="grid gap-px bg-atelier-champagne/20 sm:grid-cols-2 lg:grid-cols-3">
          {record.providers.value.map((p) => (
            <article key={p.name} className="bg-atelier-bg p-10">
              <span className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-atelier-champagne/40 font-atelier-display text-[24px] text-atelier-champagne">
                {p.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </span>
              <h2 className="font-atelier-display text-[24px]">{p.name}</h2>
              <p className="mt-2 text-[13px] uppercase tracking-[.14em] text-atelier-soft">
                {p.approvalStatus === "verified" ? "Listed on " + record.booking.platform : "Roster pending confirmation"}
              </p>
              <BookLink record={record} className={`${btnLine} mt-7 !min-h-[44px] !px-5 !text-[11px]`}>Book with {p.name.split(" ")[0]}</BookLink>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-[64ch] text-[14px] leading-relaxed text-atelier-soft">
          {record.booking.deepLinks.length === 0 &&
            `Each button opens the studio's ${record.booking.platform} page, where you choose the stylist. We have not published per-stylist links because none was verified to carry the selection across.`}
        </p>
        <Provenance field={record.providers} className="mt-4 max-w-[64ch] text-atelier-soft" />
      </Section>
    </Shell>
  );
}

export function Gallery({ record }: { record: BusinessRecord }) {
  return (
    <Shell record={record}>
      <Section>
        <p className={kicker}>Our work</p>
        <h1 className="max-w-[14ch] font-atelier-display text-[clamp(36px,6vw,68px)] leading-[1.02]">A portfolio, honestly labelled.</h1>
        <GalleryNotice className="mt-7 max-w-[66ch] text-[16px] leading-relaxed text-atelier-soft" />
      </Section>
      <Section className={rule}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {record.assets.map((a, i) => (
            <figure key={a.id} className={`m-0 overflow-hidden bg-atelier-raise ${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}>
              <AssetImage asset={a} slot="decorative" className={`w-full object-cover ${i === 0 ? "aspect-square" : "aspect-[4/5]"}`} />
              <figcaption className="px-4 py-3 text-[12.5px] text-atelier-soft">{a.alt} · {a.credit}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <BookLink record={record} className={btnGold} />
          {publishable(record.social.facebook) && record.social.facebook.value && (
            <a href={record.social.facebook.value} target="_blank" rel="noopener noreferrer" className={btnLine}>Recent posts on Facebook</a>
          )}
        </div>
      </Section>
    </Shell>
  );
}

export function About({ record }: { record: BusinessRecord }) {
  return (
    <Shell record={record}>
      <Section>
        <p className={kicker}>About</p>
        <h1 className="max-w-[15ch] font-atelier-display text-[clamp(36px,6vw,68px)] leading-[1.02]">A hair studio on Jimmy Carter Boulevard.</h1>
        <div className="mt-9 grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
          <div className="max-w-[60ch] text-[16px] leading-relaxed text-atelier-soft">
            <p>
              Elkin Mack Hair Studio works out of Suite 200 at {record.contact.street.value.split(",")[0]}, in Norcross.
              The team takes appointments through {record.booking.platform}, where every stylist keeps their own diary.
            </p>
            <p>
              That is the whole story as it can presently be evidenced. No founding date, no awards and no origin
              narrative appear on this page, because none has been confirmed by the studio. A fuller story goes here
              when the owner supplies it.
            </p>
            <p className="text-atelier-ink">
              <ReviewProof record={record} />
            </p>
            <Provenance field={record.reviewProof.rating} className="!text-[12px]" />
          </div>
          <figure className="m-0 overflow-hidden bg-atelier-raise">
            <AssetImage asset={record.assets[1]} slot="decorative" className="aspect-[4/5] w-full object-cover" />
          </figure>
        </div>
      </Section>
    </Shell>
  );
}

export function Visit({ record }: { record: BusinessRecord }) {
  return (
    <Shell record={record}>
      <Section>
        <p className={kicker}>Visit</p>
        <h1 className="max-w-[14ch] font-atelier-display text-[clamp(36px,6vw,68px)] leading-[1.02]">Finding us, and booking.</h1>
        <div className="mt-10 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-atelier-display text-[24px]">Address</h2>
            <p className="mt-3 text-[16px] leading-relaxed text-atelier-soft">
              {record.contact.street.value}<br />{record.contact.city}, {record.contact.state} {record.contact.zip}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={record.contact.mapsUrl} target="_blank" rel="noopener noreferrer" className={btnLine}>Directions</a>
              <a href={record.contact.phoneHref} className={btnLine}>{record.contact.phone.value}</a>
            </div>
            <h2 className="mt-12 font-atelier-display text-[24px]">Opening times</h2>
            <div className="mt-4 text-atelier-soft"><HoursBlock record={record} tone="dark" /></div>
          </div>
          <div className="border border-atelier-champagne/25 p-8">
            <h2 className="font-atelier-display text-[24px]">Booking</h2>
            <BookingTruth record={record} className="mt-4 text-[15px] leading-relaxed text-atelier-soft" />
            <p className="mt-5 text-[15px] leading-relaxed text-atelier-soft">
              There is no contact form on this site. A form that does not deliver is worse than no form, so until a
              monitored inbox is wired up, the telephone and {record.booking.platform} are the two ways through.
            </p>
            <BookLink record={record} className={`${btnGold} mt-7 w-full`} />
          </div>
        </div>
      </Section>
    </Shell>
  );
}

export function Policies({ record }: { record: BusinessRecord }) {
  return (
    <Shell record={record}>
      <Section>
        <p className={kicker}>Policies</p>
        <h1 className="font-atelier-display text-[clamp(36px,6vw,68px)] leading-[1.02]">Appointment policies.</h1>
        <div className="mt-8 max-w-[66ch] text-[16px] leading-relaxed text-atelier-soft">
          <p>
            Cancellation terms, deposits, lateness and walk-in rules are set by the studio, and none has been confirmed
            for publication. Rather than invent them, this page states plainly that the terms shown at the moment you
            book on {record.booking.platform} are the ones that apply.
          </p>
          <p>Anything you need to check before your appointment: call {record.contact.phone.value}.</p>
          <p className="text-atelier-ink">This page is filled in once the studio approves its wording.</p>
        </div>
        <BookLink record={record} className={`${btnGold} mt-8`} />
      </Section>
    </Shell>
  );
}

export function Privacy({ record }: { record: BusinessRecord }) {
  return (
    <Shell record={record}>
      <Section>
        <p className={kicker}>Privacy</p>
        <h1 className="font-atelier-display text-[clamp(36px,6vw,68px)] leading-[1.02]">What this site collects.</h1>
        <div className="mt-8 max-w-[66ch] text-[16px] leading-relaxed text-atelier-soft">
          <p className="text-atelier-ink">Nothing.</p>
          <p>
            There is no contact form, no account, no newsletter and no analytics or advertising script on these pages.
            No cookie is set by this site and no personal information is collected, stored or shared by it.
          </p>
          <p>
            Booking happens on {record.booking.platform}, and calling reaches the studio directly. Both handle your
            information under their own terms, which are worth reading on their sites.
          </p>
          <p>Questions about information the studio itself holds: {record.contact.phone.value}.</p>
        </div>
      </Section>
    </Shell>
  );
}
