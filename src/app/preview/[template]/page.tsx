import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TEMPLATE_IDS, getTemplate } from "@/lib/templates";
import { elkinMack } from "@/businesses/elkin-mack";
import * as Atelier from "@/templates/atelier";
import * as Editorial from "@/templates/editorial";

/** Next 15: route params arrive as a Promise and must be awaited. */
type Params = Promise<{ template: string }>;

export function generateStaticParams() {
  return TEMPLATE_IDS.map((template) => ({ template }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { template } = await params;
  const t = getTemplate(template);
  return {
    title: { absolute: `Hair Salon in Norcross, GA | ${elkinMack.identity.name.value}` },
    description: `${elkinMack.identity.name.value}, ${elkinMack.contact.street.value}, ${elkinMack.contact.city}. Cuts, colour, treatments and styling. Book on ${elkinMack.booking.platform}.`,
    robots: { index: false, follow: false },
    other: { "x-template": t?.name ?? "" },
  };
}

export default async function Page({ params }: { params: Params }) {
  const { template } = await params;
  if (!getTemplate(template)) notFound();
  const Home = template === "atelier" ? Atelier.Home : Editorial.Home;
  return <Home record={elkinMack} />;
}
