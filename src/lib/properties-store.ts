import type { Property } from "@/data/properties";
import { seedProperties } from "@/data/properties";
import { getRedis, isRedisConfigured } from "@/lib/redis";

const PROPERTIES_KEY = "properties:list";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function readAll(): Promise<Property[]> {
  if (!isRedisConfigured()) {
    return [...seedProperties];
  }

  const redis = getRedis();
  const stored = await redis.get<Property[]>(PROPERTIES_KEY);

  if (!stored || !Array.isArray(stored) || stored.length === 0) {
    await redis.set(PROPERTIES_KEY, seedProperties);
    return [...seedProperties];
  }

  return stored;
}

async function writeAll(properties: Property[]) {
  const redis = getRedis();
  await redis.set(PROPERTIES_KEY, properties);
}

export async function listProperties(): Promise<Property[]> {
  return readAll();
}

export async function getPropertyBySlug(
  slug: string
): Promise<Property | undefined> {
  const properties = await readAll();
  return properties.find((property) => property.slug === slug);
}

export async function getFeaturedProperty(): Promise<Property | undefined> {
  const properties = await readAll();
  return properties.find((property) => property.featured) ?? properties[0];
}

export async function createUniqueSlug(address: string, city?: string) {
  const base = slugify([address, city].filter(Boolean).join(" ")) || "property";
  const properties = await readAll();
  const existing = new Set(properties.map((property) => property.slug));

  if (!existing.has(base)) return base;

  let index = 2;
  while (existing.has(`${base}-${index}`)) {
    index += 1;
  }
  return `${base}-${index}`;
}

export type CreatePropertyInput = Omit<Property, "slug"> & { slug?: string };

export async function createProperty(
  input: CreatePropertyInput
): Promise<Property> {
  const properties = await readAll();
  const slug =
    input.slug?.trim() ||
    (await createUniqueSlug(input.address, input.city));

  if (properties.some((property) => property.slug === slug)) {
    throw new Error("A property with this slug already exists.");
  }

  const property: Property = { ...input, slug };

  if (property.featured) {
    for (const item of properties) {
      item.featured = false;
    }
  }

  properties.unshift(property);
  await writeAll(properties);
  return property;
}

export async function deleteProperty(slug: string): Promise<boolean> {
  const properties = await readAll();
  const next = properties.filter((property) => property.slug !== slug);
  if (next.length === properties.length) return false;
  await writeAll(next);
  return true;
}
