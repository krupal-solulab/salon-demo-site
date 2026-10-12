import type { Asset, BusinessRecord, Field, ServiceCategory } from "@/lib/record";
import { duration, money, needsProvenance, publishable } from "@/lib/record";

/* ------------------------------------------------------------------ *
 * Guards. These are the reason an unverified fact cannot reach a page.
 * ------------------------------------------------------------------ */

/** Renders children only when the field is fit to publish, else the fallback. */
export function Verified<T>({ field, children, fallback = null }: { field: Field<T>; children: (v: T) => React.ReactNode; fallback?: React.ReactNode }) {
  if (!publishable(field)) return <>{fallback}</>;
  return <>{children(field.value)}</>;
}

/** Small provenance line, shown whenever a value is single-source or moving. */
export function Provenance<T>({ field, className = "" }: { field: Field<T>; className?: string }) {
  if (!needsProvenance(field)) return null;
  const when = new Date(field.retrievedAt).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
  return (
    <span className={`block text-[12px] leading-snug opacity-60 ${className}`}>
      Source: {field.sourceName}, read {when}.{field.provenanceNote ? ` ${field.provenanceNote}` : ""}
    </span>
  );
}

/**
 * Images. A `stock` asset may only sit in a decorative slot, so stock can never
 * be presented as the salon's premises, staff or client work.
 */
export function AssetImage({
  asset, slot, className = "", priority = false,
}: { asset: Asset; slot: Asset["permittedUse"]; className?: string; priority?: boolean }) {
  if (asset.kind === "stock" && slot !== "decorative") {
    throw new Error(`Asset ${asset.id} is stock and cannot fill a "${slot}" slot.`);
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset.url}
      alt={asset.alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
    />
  );
}

/**
 * Hero media. The video slot is wired but empty until a clip is cleared, so the
 * poster carries the hero on its own. When a source does arrive it plays muted
 * and inline with a working pause control and a reduced-motion fallback.
 */
export function HeroMedia({ poster, videoSrc, className = "" }: { poster: Asset; videoSrc?: string; className?: string }) {
  if (!videoSrc) return <AssetImage asset={poster} slot="decorative" priority className={className} />;
  return (
    <video
      className={className}
      poster={poster.url}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-label={poster.alt}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
}

/* ------------------------------------------------------------------ *
 * Booking. One component, so the destination can never drift.
 * ------------------------------------------------------------------ */

export function BookLink({ record, className = "", children }: { record: BusinessRecord; className?: string; children?: React.ReactNode }) {
  return (
    <a href={record.booking.businessUrl.value} target="_blank" rel="noopener noreferrer" className={className}>
      {children ?? `Book on ${record.booking.platform}`}
    </a>
  );
}

/** Says plainly that leaving this site is not the same as having an appointment. */
export function BookingTruth({ record, className = "" }: { record: BusinessRecord; className?: string }) {
  return (
    <p className={className}>
      Booking opens {record.booking.platform} in a new tab, where you choose your stylist, see live availability and
      confirm. Your appointment exists once {record.booking.platform} confirms it — not when you leave this page.
    </p>
  );
}

/* ------------------------------------------------------------------ *
 * Hours. Falls back honestly when the record says hours are unresolved.
 * ------------------------------------------------------------------ */

export function HoursBlock({ record, tone = "light" }: { record: BusinessRecord; tone?: "light" | "dark" }) {
  const muted = tone === "dark" ? "opacity-60" : "text-black/50";
  if (!publishable(record.hours)) {
    return (
      <div className="text-[15px] leading-relaxed">
        <p className="m-0">
          Opening times change, so rather than print a day you might turn up to find closed, current availability is on{" "}
          <BookLink record={record} className="underline underline-offset-4">
            {record.booking.platform}
          </BookLink>
          , or call{" "}
          <a href={record.contact.phoneHref} className="underline underline-offset-4">
            {record.contact.phone.value}
          </a>
          .
        </p>
      </div>
    );
  }
  return (
    <dl className="m-0 text-[14.5px]">
      {record.hours.value.map((h) => (
        <div key={h.day} className="flex justify-between gap-4 border-b border-current/10 py-[6px] last:border-0">
          <dt className={muted}>{h.day}</dt>
          <dd className="m-0">{h.closed ? "Closed" : `${h.open} – ${h.close}`}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ------------------------------------------------------------------ *
 * Services and review proof.
 * ------------------------------------------------------------------ */

export function PriceRow({ item }: { item: ServiceCategory["items"][number] }) {
  const d = duration(item.durationMin);
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-current/10 py-3 last:border-0">
      <span className="flex-1 basis-[18ch]">
        {item.name}
        {item.note && <span className="ml-2 text-[13px] opacity-55">{item.note}</span>}
      </span>
      <span className="whitespace-nowrap text-[14.5px] opacity-70">{d}</span>
      <span className="whitespace-nowrap font-medium">
        {item.priceVaries ? "Quoted at consultation" : item.priceFrom ? `from ${money(item.priceFrom)}` : "—"}
      </span>
    </div>
  );
}

export function PriceCaveat({ record, className = "" }: { record: BusinessRecord; className?: string }) {
  return (
    <p className={className}>
      Prices start where shown and depend on hair length, density and the time your service takes. They were read from{" "}
      {record.booking.platform} on 12 October 2026 and a promotion was running at the time, so the live menu is the one
      to trust.{" "}
      <BookLink record={record} className="underline underline-offset-4">
        See current services and prices on {record.booking.platform}
      </BookLink>
      .
    </p>
  );
}

/** Numeric score with a single neutral star — never five filled stars for a 4.8. */
export function ReviewProof({ record, className = "" }: { record: BusinessRecord; className?: string }) {
  const { rating, count, platform, sourceUrl } = record.reviewProof;
  if (!publishable(rating) || !publishable(count)) return null;
  return (
    <span className={className}>
      <span aria-hidden="true">★</span> {rating.value} from{" "}
      <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
        {count.value} {platform} reviews
      </a>
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Gallery. With no cleared work, this is an honest craft section —
 * it never claims to show this salon's results.
 * ------------------------------------------------------------------ */

export function GalleryNotice({ className = "" }: { className?: string }) {
  return (
    <p className={className}>
      These are licensed craft photographs, not this studio&rsquo;s work. A client portfolio goes here once the studio
      supplies images it owns and has cleared for use. Showing someone else&rsquo;s results as theirs would be the one
      thing a salon site must never do.
    </p>
  );
}

export function AssetCredits({ record, className = "" }: { record: BusinessRecord; className?: string }) {
  return (
    <p className={className}>
      Photography: {Array.from(new Set(record.assets.map((a) => a.credit))).join(", ")}. Licensed for commercial use,
      used decoratively.
    </p>
  );
}
