export type TemplateId = "atelier" | "editorial";

export type TemplateMeta = {
  id: TemplateId;
  name: string;
  impression: string;
  palette: string;
  typography: string;
  hero: string;
  /** Google Fonts stylesheet for this family only. */
  fonts: string;
};

/**
 * The renderer families. A generation job may request at most this many
 * distinct templates — asking for more reports honestly rather than shipping
 * the same DOM twice.
 */
export const TEMPLATES: TemplateMeta[] = [
  {
    id: "atelier",
    name: "Cinematic Atelier",
    impression: "Intimate, dramatic, craft-led.",
    palette: "Charcoal, warm ivory, restrained champagne",
    typography: "High-contrast display serif over a compact neutral sans",
    hero: "Full-bleed media, controlled dark overlay, left-aligned outcome copy",
    fonts: "https://fonts.googleapis.com/css2?family=Prata&family=Public+Sans:wght@400;500;600;700&display=swap",
  },
  {
    id: "editorial",
    name: "Modern Editorial Studio",
    impression: "Bright, contemporary, expressive and approachable.",
    palette: "Porcelain, ink, plum accent",
    typography: "Strong editorial sans headings with restrained serif accents",
    hero: "Split screen: copy and booking panel beside a large media pane",
    fonts: "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,400..800&family=Newsreader:ital,opsz,wght@0,6..72,300;1,6..72,300&display=swap",
  },
];

export const TEMPLATE_IDS = TEMPLATES.map((t) => t.id);
export const getTemplate = (id: string) => TEMPLATES.find((t) => t.id === id);

export const ROUTES = [
  { slug: "", label: "Home" },
  { slug: "services", label: "Services" },
  { slug: "team", label: "Our Team" },
  { slug: "gallery", label: "Our Work" },
  { slug: "about", label: "About" },
  { slug: "visit", label: "Visit" },
  { slug: "policies", label: "Policies" },
  { slug: "privacy", label: "Privacy" },
] as const;
