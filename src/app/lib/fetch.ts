export async function serverFetch<T>(
  url: string,
  revalidateSeconds = 3600,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(url, {
    ...init,
    // Cache on the Next side; works correctly in RSC and route handlers
    next: { revalidate: revalidateSeconds },
  });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  return res.json();
}
