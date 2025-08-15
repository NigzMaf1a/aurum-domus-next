const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const fullUrl = `${BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
  const res = await fetch(fullUrl, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {})
    },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
