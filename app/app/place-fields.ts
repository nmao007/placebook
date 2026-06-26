export const categories = [
  "City",
  "Region",
  "Landmark",
  "Beach",
  "National Park",
  "Other",
] as const;

export const statuses = ["Saved", "Visited"] as const;

export type Category = (typeof categories)[number];
export type Status = (typeof statuses)[number];

export function normalizeCategory(category: string | null): Category {
  return categories.includes(category as Category)
    ? (category as Category)
    : "Other";
}

export function normalizeStatus(status: string | null): Status {
  return status?.toLowerCase() === "visited" ? "Visited" : "Saved";
}
