import type { BusinessRecord } from "@/lib/record";

const BOOKSY = "https://booksy.com/en-us/551176_elkin-mack-hair-studio_hair-salon_16409_norcross";
const FB = "https://www.facebook.com/p/elkinmackhairstudio-100059757862090/";
const BIRDEYE = "https://reviews.birdeye.com/elkin-mack-hair-studio-168127296419278";
const APPLE = "https://maps.apple.com/place?place-id=IAE1343507C7516A6";
const AT = "2026-10-12T00:00:00Z";

/**
 * Elkin Mack Hair Studio — first generated business.
 *
 * Every field below was read from a named source on 12 October 2026. Where
 * sources disagreed the conflict is recorded rather than silently resolved.
 * Three facts are deliberately NOT publishable: opening hours, the walk-in
 * policy and the Instagram account. The renderers fall back for those.
 */
export const elkinMack: BusinessRecord = {
  businessId: "elkin-mack-hair-studio-norcross-ga",

  identity: {
    name: {
      value: "Elkin Mack Hair Studio",
      sourceUrl: BOOKSY,
      sourceName: "Booksy",
      retrievedAt: AT,
      confidence: "high",
      approvalStatus: "verified",
      conflicts: [
        {
          value: "Elkin mack (listing 1073016)",
          sourceName: "Booksy",
          sourceUrl: "https://booksy.com/en-us/1073016_elkin-mack_hair-salon_16409_norcross",
          note: "A separate Booksy listing with a similar name exists at the same street. Not merged — may be a stale duplicate or a different trading entity.",
        },
      ],
    },
    locationCount: 1,
    category: "Hair salon",
    area: "Norcross, Georgia",
  },

  contact: {
    phone: {
      value: "470-514-5787",
      sourceUrl: BOOKSY,
      sourceName: "Booksy, Apple Maps, Fresha",
      retrievedAt: AT,
      confidence: "high",
      approvalStatus: "verified",
      conflicts: [
        {
          value: "+1 770-905-4017",
          sourceName: "Facebook",
          sourceUrl: FB,
          note: "A second number listed on the Facebook page. Purpose unknown — not published.",
        },
      ],
    },
    phoneHref: "tel:+14705145787",
    email: {
      value: "elkinmackhairstudio@gmail.com",
      sourceUrl: FB,
      sourceName: "Facebook",
      retrievedAt: AT,
      confidence: "medium",
      approvalStatus: "needs_confirmation",
      provenanceNote: "Published by the business on Facebook. Not confirmed as a monitored inbox.",
    },
    street: {
      value: "6409 Jimmy Carter Blvd, Suite 200",
      sourceUrl: BOOKSY,
      sourceName: "Booksy, Apple Maps, Birdeye",
      retrievedAt: AT,
      confidence: "high",
      approvalStatus: "verified",
    },
    city: "Norcross",
    state: "GA",
    zip: "30071",
    lat: { value: 33.942632, sourceUrl: BOOKSY, sourceName: "Booksy structured data", retrievedAt: AT, confidence: "medium", approvalStatus: "verified" },
    lng: { value: -84.2084952, sourceUrl: BOOKSY, sourceName: "Booksy structured data", retrievedAt: AT, confidence: "medium", approvalStatus: "verified" },
    // A search-query URL, not an invented Place ID. Resolves to the listing.
    mapsUrl:
      "https://maps.google.com/maps?hl=en&q=Elkin%20Mack%20Hair%20Studio%206409%20Jimmy%20Carter%20Blvd%20STE%20200%2C%20Norcross%2C%20GA%2C%2030071",
  },

  booking: {
    platform: "Booksy",
    businessUrl: {
      value: BOOKSY,
      sourceUrl: BOOKSY,
      sourceName: "Booksy",
      retrievedAt: AT,
      confidence: "high",
      approvalStatus: "verified",
    },
    // No per-provider deep links are published: none were verified to preserve
    // the selection. The UI tells people they choose their stylist on Booksy.
    deepLinks: [],
    acceptsWalkIns: {
      value: null,
      sourceUrl: BOOKSY,
      sourceName: "Booksy",
      retrievedAt: AT,
      confidence: "low",
      approvalStatus: "unresolved",
      provenanceNote: "The handoff reports a no-walk-ins rule and colour timing restrictions. Not re-confirmed in this retrieval, so no policy is stated on the site.",
    },
  },

  reviewProof: {
    rating: {
      value: 4.8,
      sourceUrl: BOOKSY,
      sourceName: "Booksy",
      retrievedAt: AT,
      confidence: "medium",
      approvalStatus: "needs_confirmation",
      provenanceNote: "Booksy rating, read 12 October 2026. This value moves.",
      conflicts: [
        { value: "4.9 from 51 reviews", sourceName: "Booksy search listing", sourceUrl: "https://booksy.com/en-us/s/hair-salon/16409_norcross", note: "September 2026 snapshot." },
        { value: "4.4 from 159 reviews", sourceName: "Birdeye", sourceUrl: BIRDEYE, note: "Aggregates several platforms. Different population — not comparable." },
        { value: "69% from 13 ratings", sourceName: "Apple Maps", sourceUrl: APPLE, note: "Different scale entirely." },
      ],
    },
    count: {
      value: 62,
      sourceUrl: BOOKSY,
      sourceName: "Booksy",
      retrievedAt: AT,
      confidence: "medium",
      approvalStatus: "needs_confirmation",
      provenanceNote: "Rose from 51 to 62 between September and October 2026.",
    },
    platform: "Booksy",
    sourceUrl: BOOKSY,
  },

  hours: {
    value: [
      { day: "Monday", open: "9:00 am", close: "7:00 pm" },
      { day: "Tuesday", open: "10:00 am", close: "7:00 pm" },
      { day: "Wednesday", open: "10:00 am", close: "7:00 pm" },
      { day: "Thursday", open: "10:00 am", close: "7:00 pm" },
      { day: "Friday", open: "10:00 am", close: "7:00 pm" },
      { day: "Saturday", open: "10:00 am", close: "5:00 pm" },
      { day: "Sunday", open: "", close: "", closed: true },
    ],
    sourceUrl: BIRDEYE,
    sourceName: "Google listing via Birdeye",
    retrievedAt: AT,
    confidence: "low",
    // Deliberately not publishable: one current third-party source, and an
    // older directory disagreed. The site shows a Booksy fallback instead.
    approvalStatus: "unresolved",
    provenanceNote: "Single third-party source, contradicted by a stale directory showing Mon–Fri 10–6 and Sat 9–5. Needs owner confirmation before any hours are printed.",
    conflicts: [
      { value: "Mon–Fri 10:00–18:00, Sat 09:00–17:00", sourceName: "Wheree", sourceUrl: "https://elkin-mack-hair-studio.wheree.com/", note: "Snapshot roughly 19 months old. Treated as stale." },
    ],
  },

  providers: {
    value: [
      { name: "Elkin Medina", sourceName: "Booksy staff list", approvalStatus: "verified" },
      { name: "Carlos Nava", sourceName: "Handoff brief", approvalStatus: "needs_confirmation" },
      { name: "Omar Espinel", sourceName: "Handoff brief", approvalStatus: "needs_confirmation" },
      { name: "Erick Colina", sourceName: "Handoff brief", approvalStatus: "needs_confirmation" },
      { name: "Jenifer Vidal", sourceName: "Booksy staff list", approvalStatus: "verified" },
    ],
    sourceUrl: BOOKSY,
    sourceName: "Booksy staff list and handoff brief",
    retrievedAt: AT,
    confidence: "medium",
    approvalStatus: "needs_confirmation",
    provenanceNote: "Names only. No biography, credential or specialty is published for any provider, because none is evidenced.",
  },

  /**
   * Prices are the listed standard rates, not the discounted ones. Booksy was
   * showing a "save up to 10%" promotion; promotions expire, so publishing the
   * discounted figure would go stale and mislead. Every figure is a "from".
   */
  services: [
    {
      slug: "haircuts",
      name: "Haircuts",
      summary: "Cuts for every length, finished and styled.",
      items: [
        { name: "Women's Haircut", priceFrom: 45, durationMin: 45, note: "Trim the ends" },
        { name: "Style Women's Haircut", priceFrom: 60, durationMin: 45, note: "Different styles" },
        { name: "Express Mack", priceFrom: 60, durationMin: 30 },
      ],
    },
    {
      slug: "colour",
      name: "Colour",
      summary: "All-over colour and corrective work. Longer services are quoted after a look at your hair.",
      items: [
        { name: "All Over Color", priceFrom: 140, durationMin: 105 },
        { name: "Color Extraction", priceFrom: 280, durationMin: 150 },
      ],
    },
    {
      slug: "treatments",
      name: "Treatments & Washing",
      summary: "Kérastase conditioning treatments and wash services.",
      items: [
        { name: "D Luxury Kérastase", priceFrom: 70, durationMin: 30 },
        { name: "D Luxury Dorado Kérastase", priceFrom: 85, durationMin: 30 },
        { name: "Hair Wax Fusio-Dose Kérastase", priceFrom: 90, durationMin: 30 },
        { name: "Classic Hair Wash", priceFrom: 20, durationMin: 30 },
      ],
    },
    {
      slug: "styling",
      name: "Styling",
      summary: "Blow-dry and finishing, on its own or after a service.",
      items: [{ name: "Blow Dry", priceFrom: 50, durationMin: 45 }],
    },
    {
      slug: "extensions",
      name: "Extensions",
      summary: "Priced after a consultation, because length and method change the work.",
      items: [{ name: "Hair Extensions", priceVaries: true, durationMin: 120 }],
    },
    {
      slug: "makeup",
      name: "Makeup",
      summary: "Event makeup, including quinceañera.",
      items: [
        { name: "Glam Makeup", priceFrom: 180, durationMin: 120 },
        { name: "15 Year Makeup", priceFrom: 250, durationMin: 150, note: "Quinceañera" },
      ],
    },
    {
      slug: "brows",
      name: "Brows & Waxing",
      summary: "Brow shaping and waxing.",
      items: [{ name: "Eyebrow Waxing", priceFrom: 20, durationMin: 30 }],
    },
  ],

  servicesEvidence: {
    value: "Booksy service list",
    sourceUrl: BOOKSY,
    sourceName: "Booksy",
    retrievedAt: AT,
    confidence: "medium",
    approvalStatus: "needs_confirmation",
    provenanceNote:
      "The listing also advertises nails, lashes, texture services and conditioning variants that were not fully itemised in this retrieval. The full menu lives on Booksy.",
  },

  social: {
    instagram: {
      value: null,
      sourceUrl: BOOKSY,
      sourceName: "Booksy",
      retrievedAt: AT,
      confidence: "low",
      approvalStatus: "unresolved",
      provenanceNote: "An Instagram presence is referenced but no exact account URL was matched to this business. Not linked — a wrong link would send clients to someone else.",
    },
    facebook: {
      value: FB,
      sourceUrl: FB,
      sourceName: "Facebook",
      retrievedAt: AT,
      confidence: "high",
      approvalStatus: "verified",
      provenanceNote: "Matched on address and telephone number.",
    },
  },

  /**
   * No photograph of this salon, its staff or its work is used anywhere.
   * The Booksy listing has a photo collection, but a public listing is not a
   * licence. Everything below is licensed stock, used decoratively only, and
   * the renderers will not place a `stock` asset in a `work` or `portrait` slot.
   */
  assets: [
    { id: "hero-craft", url: "https://images.unsplash.com/photo-1595475884562-073c30d45670?auto=format&fit=crop&q=70&w=1600&h=1000", kind: "stock", license: "Unsplash Licence — free commercial use", credit: "Adam Winger / Unsplash", permittedUse: "decorative", alt: "Hairdressing shears and brushes on a plain background", focal: "center" },
    { id: "texture-colour", url: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=70&w=1200&h=800", kind: "stock", license: "Unsplash Licence — free commercial use", credit: "Baylee Gramling / Unsplash", permittedUse: "decorative", alt: "Close-up of a curling iron being held", focal: "center" },
    { id: "texture-tools", url: "https://images.unsplash.com/photo-1657105052497-f996284ffff8?auto=format&fit=crop&q=70&w=1200&h=800", kind: "stock", license: "Unsplash Licence — free commercial use", credit: "Gulom Nazarov / Unsplash", permittedUse: "decorative", alt: "Thinning shears resting on a surface", focal: "center" },
    { id: "texture-dryer", url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=70&w=1200&h=800", kind: "stock", license: "Unsplash Licence — free commercial use", credit: "Adam Winger / Unsplash", permittedUse: "decorative", alt: "A round brush and hair dryer held mid-blow-dry", focal: "center" },
  ],

  releaseBlockers: [
    { id: "EM-01", severity: "P0", issue: "No written authorisation from the business to publish a site under its name.", owner: "Agency / client services" },
    { id: "EM-02", severity: "P0", issue: "Opening hours unresolved. One current third-party source, contradicted by a stale directory. Site shows a Booksy fallback until the owner confirms.", owner: "Business owner" },
    { id: "EM-03", severity: "P0", issue: "No cleared photography of the salon, its team or its work. All imagery is decorative licensed stock and is labelled as such.", owner: "Business owner" },
    { id: "EM-04", severity: "P1", issue: "Provider roster is names only. Three of five are single-source. No specialties or biographies published.", owner: "Business owner" },
    { id: "EM-05", severity: "P1", issue: "Instagram account not matched to this business. Not linked.", owner: "Research" },
    { id: "EM-06", severity: "P1", issue: "Walk-in and colour-scheduling policies not re-confirmed. No policy claims published.", owner: "Business owner" },
    { id: "EM-07", severity: "P1", issue: "Prices are standard rates read on 12 Oct 2026; a Booksy promotion was running. Confirm currency before launch.", owner: "Business owner" },
    { id: "EM-08", severity: "P1", issue: "A second similarly named Booksy listing exists at the same street. Confirm which is the live trading listing.", owner: "Research" },
    { id: "EM-09", severity: "P1", issue: "No hero video asset cleared. Both templates ship poster-only; the video slot is wired and empty.", owner: "Agency / client services" },
    { id: "EM-10", severity: "P2", issue: "Second telephone number on Facebook (770-905-4017) unexplained. Not published.", owner: "Business owner" },
  ],
};
