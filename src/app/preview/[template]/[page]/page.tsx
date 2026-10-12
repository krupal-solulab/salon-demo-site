import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ROUTES, TEMPLATE_IDS, getTemplate } from "@/lib/templates";
import { elkinMack as record } from "@/businesses/elkin-mack";
import * as Atelier from "@/templates/atelier";
import * as Editorial from "@/templates/editorial";

/** Next 15: route params arrive as a Promise and must be awaited. */
type Params = Promise<{ template: string; page: string }>;

const INNER = ROUTES.filter((r) => r.slug);

export function generateStaticParams() {
  return TEMPLATE_IDS.flatMap((template) => INNER.map((r) => ({ template, page: r.slug })));
}

const TITLES: Record<string, { title: string; description: string }> = {
  services: { title: "Services & Prices", description: "Cuts, colour, Kerastase treatments, styling, extensions, makeup and brows, with starting prices and durations." },
  team: { title: "Our Team", description: "The stylists taking appointments at Elkin Mack Hair Studio in Norcross." },
  gallery: { title: "Our Work", description: "Craft photography from the studio. Client portfolio to follow." },
  about: { title: "About the Studio", description: "A hair studio on Jimmy Carter Boulevard in Norcross, Georgia." },
  visit: { title: "Visit & Booking", description: "Address, directions, opening times and how to book at Elkin Mack Hair Studio." },
  policies: { title: "Appointment Policies", description: "How appointments, changes and cancellations are handled." },
  privacy: { title: "Privacy", description: "What this website collects: nothing." },
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { page } = await params;
  const m = TITLES[page];
  if (!m) return {};
  return {
    title: { absolute: `${m.title} | ${record.identity.name.value}` },
    description: m.description,
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { template, page } = await params;
  if (!getTemplate(template) || !TITLES[page]) notFound();
  const fam = template === "atelier" ? Atelier : Editorial;
  const map: Record<string, (p: { record: typeof record }) => React.JSX.Element> = {
    services: fam.Services, team: fam.Team, gallery: fam.Gallery,
    about: fam.About, visit: fam.Visit, policies: fam.Policies, privacy: fam.Privacy,
  };
  const C = map[page];
  return <C record={record} />;
}
