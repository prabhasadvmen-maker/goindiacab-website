// API client — ready for future Node.js + Express backend integration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function fetchData<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
