import type { BusinessRecord } from "@/lib/record";
import { publishable } from "@/lib/record";
import { ROUTES } from "@/lib/templates";
import {
  AssetCredits, AssetImage, BookLink, BookingTruth, GalleryNotice, HeroMedia,
  HoursBlock, PriceCaveat, PriceRow, Provenance, ReviewProof,
} from "@/templates/shared";

/* Modern Editorial Studio — porcelain ground, ink type, plum accent.
   Split hero with a persistent booking panel, anchor-driven service chooser,
   compact provider grid, asymmetric magazine gallery. */

const base = "/preview/editorial";
const href = (slug: string) => (slug ? `${base}/${slug}/` : `${base}/`);

const btn = "inline-flex min-h-[50px] items-center justify-center rounded-full px-7 text-[15px] font-semibold transition-colors";
const btnPlum = `${btn} bg-studio-plum text-white hover:bg-studio-ink`;
const btnLine = `${btn} border border-studio-ink/20 text-studio-ink hover:border-studio-ink`;
const eyebrow = "mb-4 inline-block rounded-full bg-studio-wash px-3 py-1 text-[12px] font-semibold uppercase tracking-[.1em] text-studio-plum";
const head = "font-studio-display font-extrabold tracking-[-.03em] [font-variation-settings:'wdth'_112]";

function Shell({ children, record }: { children: React.ReactNode; record: BusinessRecord }) {
  return (
    <div className="min-h-screen bg-studio-bg font-studio-display text-studio-ink [font-variation-settings:'wdth'_100]">
      <a href="#main" className="absolute left-[-9999px] top-0 z-[200] bg-studio-plum px-5 py-3 text-white focus:left-0">Skip to content</a>
      <header className="sticky top-0 z-50 border-b border-studio-ink/10 bg-studio-bg/92 backdrop-blur">
        <div className="mx-auto flex max-w-site items-center gap-4 px-5 py-3 lg:px-10">
          <a href={href("")} className={`${head} text-[20px] leading-none`}>
            Elkin Mack
            <span className="block pt-[3px] font-studio-accent text-[12px] font-light italic tracking-normal text-studio-soft">Hair Studio, Norcross</span>
          </a>
          <nav aria-label="Main" className="ml-auto hidden items-center gap-6 lg:flex">
            {ROUTES.filter((r) => !["policies", "privacy"].includes(r.slug)).map((r) => (
              <a key={r.slug} href={href(r.slug)} className="text-[15px] font-medium text-studio-soft hover:text-studio-ink">{r.label}</a>
            ))}
          </nav>
          <BookLink record={record} className={`${btnPlum} ml-auto !min-h-[42px] !px-5 !text-[14px] lg:ml-4`}>Book</BookLink>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="border-t border-studio-ink/10 bg-studio-surface px-5 py-14 lg:px-10">
        <div className="mx-auto grid max-w-site gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className={`${head} text-[22px]`}>Elkin Mack Hair Studio</p>
            <p className="mt-3 text-[15px] leading-relaxed text-studio-soft">
              {record.contact.street.value}<br />{record.contact.city}, {record.contact.state} {record.contact.zip}
            </p>
            <p className="mt-2"><a href={record.contact.phoneHref} className="text-[15px] underline decoration-studio-plum underline-offset-4">{record.contact.phone.value}</a></p>
            <AssetCredits record={record} className="mt-7 max-w-[46ch] text-[12.5px] leading-relaxed text-studio-faint" />
          </div>
          <nav aria-label="Pages"><ul className="m-0 list-none p-0">
            {ROUTES.map((r) => <li key={r.slug} className="mb-[10px]"><a href={href(r.slug)} className="text-[15px] text-studio-soft hover:text-studio-ink">{r.label}</a></li>)}
          </ul></nav>
          <ul className="m-0 list-none p-0">
            <li className="mb-[10px]"><BookLink record={record} className="text-[15px] text-studio-soft hover:text-studio-ink" /></li>
            {publishable(record.social.facebook) && record.social.facebook.value && (
              <li className="mb-[10px]"><a href={record.social.facebook.value} target="_blank" rel="noopener noreferrer" className="text-[15px] text-studio-soft hover:text-studio-ink">Facebook</a></li>
            )}
            <li className="mb-[10px]"><a href={record.contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-[15px] text-studio-soft hover:text-studio-ink">Directions</a></li>
          </ul>
        </div>
      </footer>
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-studio-ink/10 bg-studio-surface/95 p-3 backdrop-blur lg:hidden">
        <a href={record.contact.phoneHref} className={`${btnLine} !min-h-[44px] flex-1 !px-4 !text-[14px]`}>Call</a>
        <BookLink record={record} className={`${btnPlum} !min-h-[44px] flex-1 !px-4 !text-[14px]`}>Book</BookLink>
      </div>
      <div className="h-[68px] lg:hidden" />
    </div>
  );
}

const Wrap = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`px-5 py-14 lg:px-10 lg:py-20 ${className}`}><div className="mx-auto max-w-site">{children}</div></section>
);
const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className={`${head} text-[clamp(28px,4.2vw,46px)] leading-[1.05]`}>{children}</h2>
);

/* ------------------------------ pages ------------------------------ */

export function Home({ record }: { record: BusinessRecord }) {
  const [hero, a2, a3, a4] = record.assets;
  return (
    <Shell record={record}>
      {/* Split hero: copy and a booking panel beside the media pane. */}
      <Wrap className="!pt-10 lg:!pt-14">
        <div className="grid items-stretch gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <div className="flex flex-col justify-center">
            <span className={eyebrow}>Norcross, Georgia</span>
            <h1 className={`${head} max-w-[13ch] text-[clamp(40px,6.6vw,74px)] leading-[0.98]`}>
              Your next look <span className="font-studio-accent font-light italic tracking-normal text-studio-plum">starts here.</span>
            </h1>
            <p className="mt-6 max-w-[46ch] font-studio-accent text-[19px] font-light leading-relaxed text-studio-soft">
              Cuts, colour and styling by a small team on Jimmy Carter Boulevard. Pick your stylist, pick your time.
            </p>
            <div className="mt-7 rounded-2xl border border-studio-ink/10 bg-studio-surface p-6">
              <p className="text-[13px] font-semibold uppercase tracking-[.1em] text-studio-faint">Book in {record.booking.platform}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-studio-soft">
                Live availability for every stylist. You choose who, when and which service before you confirm.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <BookLink record={record} className={btnPlum} />
                <a href={record.contact.phoneHref} className={btnLine}>{record.contact.phone.value}</a>
              </div>
              <p className="mt-4 text-[13.5px] text-studio-soft"><ReviewProof record={record} /></p>
              <Provenance field={record.reviewProof.rating} className="mt-1" />
            </div>
          </div>
          <div className="grid gap-3">
            <figure className="m-0 overflow-hidden rounded-2xl bg-studio-wash">
              <HeroMedia poster={hero} className="aspect-[16/11] w-full object-cover" />
            </figure>
            <div className="grid grid-cols-3 gap-3">
              {[a2, a3, a4].map((a) => (
                <figure key={a.id} className="m-0 overflow-hidden rounded-xl bg-studio-wash">
                  <AssetImage asset={a} slot="decorative" className="aspect-square w-full object-cover" />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </Wrap>

      {/* Service chooser: anchors, so it works with the keyboard and without JS. */}
      <Wrap className="border-t border-studio-ink/10 bg-studio-surface">
        <span className={eyebrow}>Services</span>
        <H2>Start with what you want done.</H2>
        <nav aria-label="Service categories" className="mt-7 flex flex-wrap gap-2">
          {record.services.map((c) => (
            <a key={c.slug} href={`${href("services")}#${c.slug}`} className="rounded-full border border-studio-ink/15 px-4 py-2 text-[14px] font-medium hover:border-studio-plum hover:text-studio-plum">
              {c.name}
            </a>
          ))}
        </nav>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {record.services.slice(0, 6).map((c) => (
            <a key={c.slug} href={`${href("services")}#${c.slug}`} className="flex flex-col gap-2 rounded-2xl border border-studio-ink/10 bg-studio-bg p-6 hover:border-studio-plum">
              <h3 className={`${head} text-[20px]`}>{c.name}</h3>
              <p className="m-0 text-[14.5px] leading-relaxed text-studio-soft">{c.summary}</p>
              <span className="mt-auto pt-3 text-[13.5px] font-semibold text-studio-plum">
                {c.items[0]?.priceVaries ? "Quoted at consultation" : c.items[0]?.priceFrom ? `from $${c.items[0].priceFrom}` : "See menu"}
              </span>
            </a>
          ))}
        </div>
        <PriceCaveat record={record} className="mt-8 max-w-[68ch] text-[14px] leading-relaxed text-studio-soft" />
      </Wrap>

      <Wrap className="border-t border-studio-ink/10">
        <span className={eyebrow}>Our team</span>
        <H2>Choose your stylist.</H2>
        <p className="mt-4 max-w-[56ch] font-studio-accent text-[18px] font-light leading-relaxed text-studio-soft">
          Five stylists take appointments here. Specialities and portraits go up once the studio confirms them.
        </p>
        <ul className="mt-8 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 lg:grid-cols-5">
          {record.providers.value.map((p) => (
            <li key={p.name} className="rounded-2xl border border-studio-ink/10 bg-studio-surface p-5 text-center">
              <span className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-studio-wash text-[17px] font-bold text-studio-plum">
                {p.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </span>
              <span className={`${head} block text-[16px]`}>{p.name}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6"><a href={href("team")} className="text-[15px] font-semibold text-studio-plum underline underline-offset-4">More about the team</a></p>
      </Wrap>

      <Wrap className="border-t border-studio-ink/10 bg-studio-surface">
        <span className={eyebrow}>Our work</span>
        <H2>Craft, in detail.</H2>
        <div className="mt-8 grid gap-4 sm:grid-cols-4">
          {record.assets.map((a, i) => (
            <figure key={a.id} className={`m-0 overflow-hidden rounded-2xl bg-studio-wash ${i === 1 ? "sm:col-span-2 sm:row-span-2" : ""}`}>
              <AssetImage asset={a} slot="decorative" className={`w-full object-cover ${i === 1 ? "aspect-[4/3] sm:aspect-square" : "aspect-[4/3]"}`} />
            </figure>
          ))}
        </div>
        <GalleryNotice className="mt-7 max-w-[66ch] text-[14px] leading-relaxed text-studio-soft" />
      </Wrap>

      <Wrap className="border-t border-studio-ink/10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <span className={eyebrow}>Visit</span>
            <H2>{record.contact.street.value}</H2>
            <p className="mt-3 text-[16px] text-studio-soft">{record.contact.city}, {record.contact.state} {record.contact.zip}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={record.contact.mapsUrl} target="_blank" rel="noopener noreferrer" className={btnLine}>Directions</a>
              <a href={record.contact.phoneHref} className={btnLine}>{record.contact.phone.value}</a>
            </div>
          </div>
          <div className="rounded-2xl border border-studio-ink/10 bg-studio-surface p-7">
            <h3 className={`${head} mb-4 text-[20px]`}>Opening times</h3>
            <HoursBlock record={record} />
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-studio-plum p-8 text-white lg:p-12">
          <H2>Ready when you are.</H2>
          <BookLink record={record} className={`${btn} bg-white text-studio-plum hover:bg-studio-wash`} />
        </div>
        <BookingTruth record={record} className="mt-7 max-w-[66ch] text-[14px] leading-relaxed text-studio-soft" />
      </Wrap>
    </Shell>
  );
}

export function Services({ record }: { record: BusinessRecord }) {
  return (
    <Shell record={record}>
      <Wrap>
        <span className={eyebrow}>Services</span>
        <h1 className={`${head} max-w-[16ch] text-[clamp(36px,6vw,66px)] leading-[1.02]`}>Everything on the menu.</h1>
        <nav aria-label="Jump to a category" className="mt-7 flex flex-wrap gap-2">
          {record.services.map((c) => (
            <a key={c.slug} href={`#${c.slug}`} className="rounded-full border border-studio-ink/15 px-4 py-2 text-[14px] font-medium hover:border-studio-plum hover:text-studio-plum">{c.name}</a>
          ))}
        </nav>
        <PriceCaveat record={record} className="mt-7 max-w-[68ch] text-[14.5px] leading-relaxed text-studio-soft" />
      </Wrap>
      {record.services.map((c, i) => (
        <Wrap key={c.slug} id={c.slug} className={`border-t border-studio-ink/10 ${i % 2 ? "bg-studio-surface" : ""} scroll-mt-24`}>
          <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
            <div>
              <H2>{c.name}</H2>
              <p className="mt-3 max-w-[38ch] font-studio-accent text-[18px] font-light leading-relaxed text-studio-soft">{c.summary}</p>
              <BookLink record={record} className={`${btnPlum} mt-6`}>Book</BookLink>
            </div>
            <div className="rounded-2xl border border-studio-ink/10 bg-studio-bg p-6">
              {c.items.map((it) => <PriceRow key={it.name} item={it} />)}
            </div>
          </div>
        </Wrap>
      ))}
      <Wrap className="border-t border-studio-ink/10">
        <H2>Something not listed?</H2>
        <p className="mt-4 max-w-[58ch] font-studio-accent text-[18px] font-light leading-relaxed text-studio-soft">
          Extensions and colour corrections are priced after someone sees your hair. Book the closest service, add a
          note about what you want, or call and ask.
        </p>
        <Provenance field={record.servicesEvidence} className="mt-5 max-w-[64ch]" />
        <div className="mt-7 flex flex-wrap gap-3">
          <BookLink record={record} className={btnPlum} />
          <a href={record.contact.phoneHref} className={btnLine}>{record.contact.phone.value}</a>
        </div>
      </Wrap>
    </Shell>
  );
}

export function Team({ record }: { record: BusinessRecord }) {
  return (
    <Shell record={record}>
      <Wrap>
        <span className={eyebrow}>Our team</span>
        <h1 className={`${head} max-w-[15ch] text-[clamp(36px,6vw,66px)] leading-[1.02]`}>Five stylists, one studio.</h1>
        <p className="mt-6 max-w-[60ch] font-studio-accent text-[19px] font-light leading-relaxed text-studio-soft">
          You choose who cuts your hair when you book on {record.booking.platform}. Portraits and specialities appear
          here once the studio supplies them — nothing is invented in the meantime.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {record.providers.value.map((p) => (
            <article key={p.name} className="flex items-center gap-5 rounded-2xl border border-studio-ink/10 bg-studio-surface p-6">
              <span className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-studio-wash text-[20px] font-bold text-studio-plum">
                {p.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
              </span>
              <div className="min-w-0">
                <h2 className={`${head} text-[19px]`}>{p.name}</h2>
                <p className="mt-1 text-[13px] text-studio-faint">
                  {p.approvalStatus === "verified" ? `Listed on ${record.booking.platform}` : "Roster pending confirmation"}
                </p>
                <BookLink record={record} className="mt-2 inline-block text-[14px] font-semibold text-studio-plum underline underline-offset-4">
                  Book with {p.name.split(" ")[0]}
                </BookLink>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 max-w-[64ch] text-[14px] leading-relaxed text-studio-soft">
          Each link opens the studio&rsquo;s {record.booking.platform} page, where the stylist is chosen. Per-stylist
          links are not published because none was verified to carry the selection across.
        </p>
        <Provenance field={record.providers} className="mt-3 max-w-[64ch]" />
      </Wrap>
    </Shell>
  );
}

export function Gallery({ record }: { record: BusinessRecord }) {
  return (
    <Shell record={record}>
      <Wrap>
        <span className={eyebrow}>Our work</span>
        <h1 className={`${head} max-w-[14ch] text-[clamp(36px,6vw,66px)] leading-[1.02]`}>An honest gallery.</h1>
        <GalleryNotice className="mt-6 max-w-[66ch] font-studio-accent text-[18px] font-light leading-relaxed text-studio-soft" />
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>figure]:mb-4 [&>figure]:break-inside-avoid">
          {record.assets.map((a) => (
            <figure key={a.id} className="m-0 overflow-hidden rounded-2xl bg-studio-wash">
              <AssetImage asset={a} slot="decorative" className="w-full object-cover" />
              <figcaption className="px-4 py-3 text-[12.5px] text-studio-faint">{a.alt} · {a.credit}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <BookLink record={record} className={btnPlum} />
          {publishable(record.social.facebook) && record.social.facebook.value && (
            <a href={record.social.facebook.value} target="_blank" rel="noopener noreferrer" className={btnLine}>Recent posts on Facebook</a>
          )}
        </div>
      </Wrap>
    </Shell>
  );
}

export function About({ record }: { record: BusinessRecord }) {
  return (
    <Shell record={record}>
      <Wrap>
        <span className={eyebrow}>About</span>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <h1 className={`${head} max-w-[15ch] text-[clamp(34px,5.4vw,60px)] leading-[1.02]`}>A studio on Jimmy Carter Boulevard.</h1>
            <div className="mt-7 max-w-[58ch] space-y-4 font-studio-accent text-[18px] font-light leading-relaxed text-studio-soft">
              <p>
                Elkin Mack Hair Studio works from Suite 200 in Norcross, taking appointments through{" "}
                {record.booking.platform}, where each stylist keeps their own diary.
              </p>
              <p>
                That is the story as far as it can be evidenced today. There is no founding date, award list or origin
                narrative on this page because none has been confirmed by the studio — and a made-up history is the
                easiest thing in the world to catch.
              </p>
            </div>
            <p className="mt-6 text-[15px] text-studio-soft"><ReviewProof record={record} /></p>
            <Provenance field={record.reviewProof.rating} className="mt-1 max-w-[56ch]" />
          </div>
          <figure className="m-0 overflow-hidden rounded-2xl bg-studio-wash">
            <AssetImage asset={record.assets[2]} slot="decorative" className="aspect-[4/5] w-full object-cover" />
          </figure>
        </div>
      </Wrap>
    </Shell>
  );
}

export function Visit({ record }: { record: BusinessRecord }) {
  const faq = [
    { q: "How do I book?", a: `Online through ${record.booking.platform} at any hour, or by calling ${record.contact.phone.value} during opening times. Booking shows live availability for each stylist.` },
    { q: "How much will it cost?", a: "Prices on this site are starting points. Length, density and how long the service takes all change the final figure, which your stylist confirms before beginning." },
    { q: "Can I choose my stylist?", a: `Yes. You pick the stylist inside ${record.booking.platform} as part of choosing your time.` },
    { q: "Do you take walk-ins?", a: "Not confirmed. Call ahead rather than making the trip on the chance of a free chair." },
    { q: "What are your opening hours?", a: `Current availability is shown on ${record.booking.platform}. Opening times have not yet been confirmed by the studio for publication here.` },
  ];
  return (
    <Shell record={record}>
      <Wrap>
        <span className={eyebrow}>Visit</span>
        <h1 className={`${head} max-w-[14ch] text-[clamp(36px,6vw,66px)] leading-[1.02]`}>Getting here and booking.</h1>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_.75fr]">
          <div>
            {faq.map((f, i) => (
              <details key={f.q} open={i === 0} className="group border-b border-studio-ink/10 py-5">
                <summary className={`${head} flex cursor-pointer list-none items-center justify-between gap-4 text-[19px] [&::-webkit-details-marker]:hidden`}>
                  {f.q}
                  <span aria-hidden="true" className="text-[24px] font-normal leading-none text-studio-plum group-open:hidden">+</span>
                  <span aria-hidden="true" className="hidden text-[24px] font-normal leading-none text-studio-plum group-open:inline">–</span>
                </summary>
                <p className="mt-3 max-w-[66ch] text-[15.5px] leading-relaxed text-studio-soft">{f.a}</p>
              </details>
            ))}
            <BookingTruth record={record} className="mt-8 max-w-[66ch] text-[14px] leading-relaxed text-studio-soft" />
          </div>
          <aside className="h-fit rounded-2xl border border-studio-ink/10 bg-studio-surface p-7">
            <h2 className={`${head} text-[20px]`}>Find us</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-studio-soft">
              {record.contact.street.value}<br />{record.contact.city}, {record.contact.state} {record.contact.zip}
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <a href={record.contact.mapsUrl} target="_blank" rel="noopener noreferrer" className={btnLine}>Directions</a>
              <a href={record.contact.phoneHref} className={btnLine}>{record.contact.phone.value}</a>
              <BookLink record={record} className={btnPlum} />
            </div>
            <h3 className={`${head} mt-8 text-[18px]`}>Opening times</h3>
            <div className="mt-3"><HoursBlock record={record} /></div>
            <p className="mt-6 text-[13.5px] leading-relaxed text-studio-faint">
              There is no contact form on this site. A form that quietly fails is worse than none, so the phone and{" "}
              {record.booking.platform} are the two routes until a monitored inbox is connected.
            </p>
          </aside>
        </div>
      </Wrap>
    </Shell>
  );
}

export function Policies({ record }: { record: BusinessRecord }) {
  return (
    <Shell record={record}>
      <Wrap>
        <span className={eyebrow}>Policies</span>
        <h1 className={`${head} text-[clamp(36px,6vw,66px)] leading-[1.02]`}>Appointment policies.</h1>
        <div className="mt-7 max-w-[66ch] space-y-4 text-[16px] leading-relaxed text-studio-soft">
          <p>
            Cancellation terms, deposits, lateness and walk-in rules are the studio&rsquo;s to set, and none has been
            confirmed for publication. The terms shown at the moment you book on {record.booking.platform} are the ones
            that apply.
          </p>
          <p>Anything to check beforehand: call {record.contact.phone.value}.</p>
          <p className="text-studio-ink">This page is completed once the studio approves its wording.</p>
        </div>
        <BookLink record={record} className={`${btnPlum} mt-8`} />
      </Wrap>
    </Shell>
  );
}

export function Privacy({ record }: { record: BusinessRecord }) {
  return (
    <Shell record={record}>
      <Wrap>
        <span className={eyebrow}>Privacy</span>
        <h1 className={`${head} text-[clamp(36px,6vw,66px)] leading-[1.02]`}>What this site collects.</h1>
        <div className="mt-7 max-w-[66ch] space-y-4 text-[16px] leading-relaxed text-studio-soft">
          <p className="text-[20px] text-studio-ink">Nothing at all.</p>
          <p>
            No contact form, no account, no newsletter, no analytics and no advertising scripts. This site sets no
            cookie and collects, stores or shares no personal information.
          </p>
          <p>
            Booking happens on {record.booking.platform} and calling reaches the studio directly. Both handle your
            information under their own terms.
          </p>
          <p>Questions about information the studio itself holds: {record.contact.phone.value}.</p>
        </div>
      </Wrap>
    </Shell>
  );
}
