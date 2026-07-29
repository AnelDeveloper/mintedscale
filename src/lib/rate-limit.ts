/**
 * Best-effort in-memory rate limit. Enough to stop a form flood from one
 * address on a single instance. Swap the Map for Upstash/Redis if you deploy
 * across several regions.
 */

type Bucket = { hits: number[]; };

const buckets = new Map<string, Bucket>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 6;

export function rateLimit(key: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const bucket = buckets.get(key) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((t) => now - t < WINDOW_MS);

  if (bucket.hits.length >= MAX_HITS) {
    buckets.set(key, bucket);
    const oldest = bucket.hits[0];
    return { allowed: false, retryAfterSeconds: Math.ceil((WINDOW_MS - (now - oldest)) / 1000) };
  }

  bucket.hits.push(now);
  buckets.set(key, bucket);

  // Opportunistic sweep so the map cannot grow forever.
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (v.hits.every((t) => now - t >= WINDOW_MS)) buckets.delete(k);
    }
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  return ip;
}
