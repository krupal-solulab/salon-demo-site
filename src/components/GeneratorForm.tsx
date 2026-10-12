"use client";
import { useState } from "react";

type Errors = Partial<Record<"sources" | "website" | "maps" | "booking" | "count", string>>;

const HTTPS = /^https:\/\/[^\s<>"']+$/i;
/** Blocks SSRF-shaped input at the edge. The server repeats this check. */
const PRIVATE = /^https:\/\/(localhost|127\.|10\.|192\.168\.|169\.254\.|\[?::1|0\.0\.0\.0|.*\.internal\b|.*\.local\b)/i;

function checkUrl(v: string, label: string): string | undefined {
  if (!v.trim()) return undefined;
  if (!HTTPS.test(v.trim())) return `${label} must be a full https:// address.`;
  if (PRIVATE.test(v.trim())) return `${label} points at a private address and will not be fetched.`;
  return undefined;
}

const field = "w-full rounded-lg border border-app-line bg-app-bg px-4 py-3 text-[15px] text-app-ink placeholder:text-app-soft/60 focus:border-app-accent focus:outline-none";
const lbl = "mb-2 block text-[13px] font-medium text-app-ink";
const hint = "mt-1 block text-[12.5px] leading-snug text-app-soft";
const err = "mt-1 block text-[12.5px] text-red-300";

export function GeneratorForm({ maxTemplates }: { maxTemplates: number }) {
  const [website, setWebsite] = useState("");
  const [maps, setMaps] = useState("");
  const [booking, setBooking] = useState("");
  const [count, setCount] = useState(2);
  const [more, setMore] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "queued">("idle");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: Errors = {};
    next.website = checkUrl(website, "Website URL");
    next.maps = checkUrl(maps, "Google Maps URL");
    next.booking = checkUrl(booking, "Booking URL");
    if (![website, maps, booking].some((v) => v.trim())) {
      next.sources = "Give at least one source: a website, a Google Maps listing or a booking page.";
    }
    if (count < 1) next.count = "Ask for at least one template.";
    if (count > maxTemplates) {
      next.count = `Only ${maxTemplates} genuinely distinct template families exist. Asking for ${count} would mean shipping the same design twice, so the job is capped rather than padded.`;
    }
    const clean = Object.fromEntries(Object.entries(next).filter(([, v]) => v)) as Errors;
    setErrors(clean);
    setState(Object.keys(clean).length ? "idle" : "queued");
  }

  return (
    <form onSubmit={submit} noValidate className="mt-7 space-y-5">
      <div>
        <label className={lbl} htmlFor="maps">Google Maps or Places listing</label>
        <input id="maps" className={field} value={maps} onChange={(e) => setMaps(e.target.value)}
               placeholder="https://maps.google.com/..." inputMode="url"
               aria-invalid={!!errors.maps} aria-describedby="maps-hint" />
        <span className={hint} id="maps-hint">Optional. Best single source for address, hours and ratings.</span>
        {errors.maps && <span className={err}>{errors.maps}</span>}
      </div>

      <div>
        <label className={lbl} htmlFor="booking">Booking page</label>
        <input id="booking" className={field} value={booking} onChange={(e) => setBooking(e.target.value)}
               placeholder="https://booksy.com/..." inputMode="url"
               aria-invalid={!!errors.booking} aria-describedby="booking-hint" />
        <span className={hint} id="booking-hint">Booksy, Fresha, Square, Vagaro. Enough on its own — a salon with no website still qualifies.</span>
        {errors.booking && <span className={err}>{errors.booking}</span>}
      </div>

      <div>
        <label className={lbl} htmlFor="count">How many templates</label>
        <input id="count" type="number" min={1} max={maxTemplates} value={count}
               onChange={(e) => setCount(Number(e.target.value))} className={`${field} max-w-[120px]`}
               aria-invalid={!!errors.count} aria-describedby="count-hint" />
        <span className={hint} id="count-hint">{maxTemplates} distinct families available today. Default 2.</span>
        {errors.count && <span className={err}>{errors.count}</span>}
      </div>

      <div>
        <button type="button" onClick={() => setMore(!more)}
                className="text-[14px] font-medium text-app-accent underline underline-offset-4" aria-expanded={more}>
          {more ? "Hide" : "Show"} optional fields
        </button>
        {more && (
          <div className="mt-4 space-y-5 border-l border-app-line pl-4">
            <div>
              <label className={lbl} htmlFor="website">Existing website</label>
              <input id="website" className={field} value={website} onChange={(e) => setWebsite(e.target.value)}
                     placeholder="https://example.com" inputMode="url" aria-invalid={!!errors.website} />
              {errors.website && <span className={err}>{errors.website}</span>}
            </div>
            <div>
              <label className={lbl} htmlFor="social">Social profiles</label>
              <input id="social" className={field} placeholder="https://instagram.com/..." inputMode="url" />
              <span className={hint}>Only used when the account is matched to the business on address or phone.</span>
            </div>
            <div>
              <label className={lbl} htmlFor="override">Name and address override</label>
              <input id="override" className={field} placeholder="Owner-confirmed values take priority" />
              <span className={hint}>Owner-confirmed facts are never overwritten by a directory.</span>
            </div>
          </div>
        )}
      </div>

      {errors.sources && (
        <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-[14px] text-red-200">
          {errors.sources}
        </p>
      )}

      <button type="submit" className="min-h-[48px] w-full rounded-lg bg-app-accent px-6 text-[15px] font-semibold text-white hover:bg-white hover:text-app-bg">
        Start generation
      </button>

      {state === "queued" && (
        <div role="status" className="rounded-lg border border-app-line bg-app-bg px-4 py-4 text-[14px] leading-relaxed text-app-soft">
          <p className="m-0 font-semibold text-app-ink">Validated. Queued for the research worker.</p>
          <p className="mt-2">
            Retrieval, identity resolution, asset licensing and rendering run server-side — they need API credentials,
            SSRF-guarded fetching and rate limits that cannot live in a browser. This build ships the intake, the
            validation and the renderers; the worker is the next piece to stand up.
          </p>
          <p className="mt-2">
            The Elkin Mack job on the right was run through that pipeline by hand, so you can see exactly what it
            produces end to end.
          </p>
        </div>
      )}
    </form>
  );
}
