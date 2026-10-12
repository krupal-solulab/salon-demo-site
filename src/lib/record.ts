/**
 * Business record types.
 *
 * Every published fact carries its own evidence: where it came from, when it
 * was read, how confident we are, whether the owner has approved it, and any
 * conflicting values seen elsewhere. The renderers read `approvalStatus` and
 * refuse to print anything that is not fit to publish, so an unverified value
 * cannot reach a page by accident.
 */

export type Confidence = "high" | "medium" | "low";

export type ApprovalStatus =
  /** Corroborated by two or more independent sources. Safe to publish. */
  | "verified"
  /** Single source, or sources disagree. Publish only with visible provenance. */
  | "needs_confirmation"
  /** Known to exist but not established. Never published; triggers a fallback. */
  | "unresolved";

export type Field<T> = {
  value: T;
  sourceUrl: string;
  sourceName: string;
  retrievedAt: string;
  confidence: Confidence;
  approvalStatus: ApprovalStatus;
  /** Values seen elsewhere that disagree. Kept so a reviewer can adjudicate. */
  conflicts?: { value: string; sourceName: string; sourceUrl: string; note?: string }[];
  /** Shown beside the value in the UI when status is `needs_confirmation`. */
  provenanceNote?: string;
};

export type Provider = {
  name: string;
  /** Only ever a role we can evidence. Never inferred from a person's name. */
  role?: string;
  sourceName: string;
  approvalStatus: ApprovalStatus;
};

export type ServiceItem = {
  name: string;
  /** Lowest listed price. Always rendered with a "from" qualifier. */
  priceFrom?: number;
  priceVaries?: boolean;
  durationMin?: number;
  note?: string;
};

export type ServiceCategory = {
  slug: string;
  name: string;
  summary: string;
  items: ServiceItem[];
};

export type DayHours = { day: string; open: string; close: string; closed?: boolean };

export type Asset = {
  id: string;
  url: string;
  /** `actual` = the business's own work or premises. `stock` = licensed, decorative. */
  kind: "actual" | "stock";
  license: string;
  credit: string;
  /** What the asset may be presented as. Enforced by the renderers. */
  permittedUse: "decorative" | "premises" | "work" | "portrait";
  alt: string;
  focal?: string;
};

export type BusinessRecord = {
  businessId: string;
  identity: {
    name: Field<string>;
    locationCount: number;
    category: string;
    area: string;
  };
  contact: {
    phone: Field<string>;
    phoneHref: string;
    email: Field<string>;
    street: Field<string>;
    city: string;
    state: string;
    zip: string;
    lat: Field<number>;
    lng: Field<number>;
    mapsUrl: string;
  };
  booking: {
    platform: string;
    businessUrl: Field<string>;
    /** Per-provider or per-service links, only when verified to work. */
    deepLinks: { label: string; url: string }[];
    acceptsWalkIns: Field<boolean | null>;
  };
  reviewProof: {
    rating: Field<number>;
    count: Field<number>;
    platform: string;
    sourceUrl: string;
  };
  hours: Field<DayHours[]>;
  providers: Field<Provider[]>;
  services: ServiceCategory[];
  servicesEvidence: Field<string>;
  social: { instagram: Field<string | null>; facebook: Field<string | null> };
  assets: Asset[];
  /** Anything that must be resolved before this record can go live. */
  releaseBlockers: { id: string; severity: "P0" | "P1" | "P2"; issue: string; owner: string }[];
};

/** A value is publishable unless it is unresolved. */
export function publishable<T>(f: Field<T>): boolean {
  return f.approvalStatus !== "unresolved";
}

/** True when the value needs its provenance shown alongside it. */
export function needsProvenance<T>(f: Field<T>): boolean {
  return f.approvalStatus === "needs_confirmation";
}

export function money(n: number): string {
  return `$${n % 1 === 0 ? n.toFixed(0) : n.toFixed(2)}`;
}

export function duration(min?: number): string | null {
  if (!min) return null;
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}
