import { newLocations } from './new_locations';
import { newNeighborhoods } from './new_neighborhoods';
import { LocationData } from '@/types/locations';

export interface LocationEntry extends LocationData {
  slug: string;
  city: string;
  state: string;
  zipCodes?: string[];
  attractions?: { name: string; description?: string; url?: string }[];
  monuments?: { name: string; description?: string; url?: string }[];
}

const slugify = (parts: string[]) =>
  parts
    .filter(Boolean)
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const parseNameToCityState = (name: string, primaryCity?: string): { city: string; state: string } => {
  if (name.includes(',')) {
    const [cityPart, statePart] = name.split(',').map(s => s.trim());
    return { city: cityPart, state: statePart };
  }
  // Neighborhood: use primaryCity state as IN by default if unavailable
  return { city: name, state: 'IN' };
};

const enrich = (data: LocationData[], defaultPrimaryCity?: string): LocationEntry[] => {
  return data.map(d => {
    const { city, state } = parseNameToCityState(d.name, d.primaryCity || defaultPrimaryCity);
    const slug = slugify([city, state]);
    return {
      ...d,
      city,
      state,
      slug,
      attractions: [],
      monuments: [],
    };
  });
};

// Build the unified list
const baseLocations: LocationEntry[] = [
  ...enrich(newLocations),
  ...enrich(newNeighborhoods),
];

// Deduplicate by slug (prefer first occurrence)
const seen = new Set<string>();
export const allLocations: LocationEntry[] = baseLocations.filter(loc => {
  if (seen.has(loc.slug)) return false;
  seen.add(loc.slug);
  return true;
});

// Helper lookups
export const cityToSlug: Record<string, string> = allLocations.reduce((acc, loc) => {
  acc[loc.city.toLowerCase()] = loc.slug;
  return acc;
}, {} as Record<string, string>);

export const findLocationBySlug = (slug: string): LocationEntry | undefined =>
  allLocations.find(l => l.slug === slug);

export const topLocationLinks = (limit = 8) =>
  allLocations.slice(0, limit).map(l => ({ name: `${l.city}, ${l.state}`, path: `/locations/${l.slug}` }));