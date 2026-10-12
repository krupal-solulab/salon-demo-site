import Link from "next/link";
import { TEMPLATES } from "@/lib/templates";
import { elkinMack } from "@/businesses/elkin-mack";
import { GeneratorForm } from "@/components/GeneratorForm";

const card = "rounded-xl border border-app-line bg-app-panel p-6";
const label = "text-[12px] font-semibold uppercase tracking-[.12em] text-app-soft";

export default function Console() {
  const r = elkinMack;
  const blockers = r.releaseBlockers;
  const p0 = blockers.filter((b) => b.severity === "P0");

  return (
    <div className="min-h-screen bg-app-bg font-app text-app-ink">
      <header className="border-b border-app-line px-6 py-5 lg:px-10">
        <div className="mx-auto flex max-w-site flex-wrap items-center gap-4">
          <h1 className="text-[17px] font-bold">Salon site generator</h1>
          <span className="rounded-full border border-app-line px-3 py-1 text-[12px] text-app-soft">v0.1 · internal</span>
        </div>
      </header>

      <main className="mx-auto max-w-site px-6 py-10 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,420px)_1fr]">
          {/* ------------------------------ intake ------------------------------ */}
          <section>
            <h2 className="text-[26px] font-bold tracking-[-.02em]">New generation job</h2>
            <p className="mt-2 max-w-[48ch] text-[15px] leading-relaxed text-app-soft">
              Give at least one source for the business and choose how many templates you want. A booking link alone is
              enough, so businesses with no website of their own are not excluded.
            </p>
            <GeneratorForm maxTemplates={TEMPLATES.length} />
          </section>

          {/* ------------------------------ output ------------------------------ */}
          <section className="space-y-6">
            <div className={card}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className={label}>Completed job</p>
                  <h3 className="mt-2 text-[22px] font-bold">{r.identity.name.value}</h3>
                  <p className="mt-1 text-[14px] text-app-soft">
                    {r.contact.street.value}, {r.contact.city}, {r.contact.state} {r.contact.zip} ·{" "}
                    {r.identity.locationCount} location · {r.providers.value.length} providers
                  </p>
                </div>
                <span className="rounded-full bg-amber-400/15 px-3 py-1 text-[12px] font-semibold text-amber-300">
                  Needs review
                </span>
              </div>
              <p className="mt-4 text-[14px] leading-relaxed text-app-soft">
                Both variants are complete and testable. The status is <strong className="text-app-ink">Needs review</strong>,
                not Production ready, because {p0.length} P0 items are open — listed below. Marking this green while
                those stand would be the dishonest move.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {TEMPLATES.map((t) => (
                <article key={t.id} className={card}>
                  <p className={label}>Template {t.id === "atelier" ? "A" : "B"}</p>
                  <h4 className="mt-2 text-[19px] font-bold">{t.name}</h4>
                  <p className="mt-2 text-[14px] leading-relaxed text-app-soft">{t.impression}</p>
                  <dl className="mt-4 space-y-2 text-[13px]">
                    <div><dt className="inline text-app-soft">Palette: </dt><dd className="inline">{t.palette}</dd></div>
                    <div><dt className="inline text-app-soft">Type: </dt><dd className="inline">{t.typography}</dd></div>
                    <div><dt className="inline text-app-soft">Hero: </dt><dd className="inline">{t.hero}</dd></div>
                  </dl>
                  <Link
                    href={`/preview/${t.id}/`}
                    className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center rounded-lg bg-app-accent px-5 text-[14px] font-semibold text-white hover:bg-white hover:text-app-bg"
                  >
                    Open preview
                  </Link>
                  <p className="mt-3 text-[12px] text-app-soft">8 routes · noindex</p>
                </article>
              ))}
            </div>

            <div className={card}>
              <p className={label}>Open blockers</p>
              <ul className="mt-4 space-y-3">
                {blockers.map((b) => (
                  <li key={b.id} className="flex gap-3 text-[14px] leading-relaxed">
                    <span
                      className={`mt-[2px] h-fit rounded px-[6px] py-[1px] text-[11px] font-bold ${
                        b.severity === "P0" ? "bg-red-500/20 text-red-300" : b.severity === "P1" ? "bg-amber-400/15 text-amber-300" : "bg-app-line text-app-soft"
                      }`}
                    >
                      {b.severity}
                    </span>
                    <span>
                      <span className="text-app-soft">{b.id}</span> {b.issue}{" "}
                      <span className="text-app-soft">— {b.owner}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={card}>
              <p className={label}>What runs server-side</p>
              <p className="mt-3 text-[14px] leading-relaxed text-app-soft">
                Retrieval, identity resolution and asset licensing cannot run in the browser: they need API credentials,
                SSRF-guarded URL fetching, per-business isolation and rate limits. This console is the intake and review
                surface. The research step for the job above was run and its evidence is committed at{" "}
                <code className="rounded bg-app-bg px-1.5 py-0.5 text-[13px]">src/businesses/elkin-mack.ts</code>, with a
                source, retrieval time, confidence and conflict list on every field.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
