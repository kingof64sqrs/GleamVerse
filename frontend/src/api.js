const envBase = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) ? String(import.meta.env.VITE_API_BASE_URL) : '';
// Always use server IP for deployed environment
export const API_BASE = envBase?.trim() || 'http://140.238.227.29:8000';
console.log('API_BASE configured as:', API_BASE);

export const asApiUrl = (u) => {
  if (!u) return u;
  if (/^https?:\/\//i.test(u)) return u;
  return `${API_BASE}${u}`;
};

export async function getClerkToken() {
  try {
    if (!window.Clerk || !Clerk.load) return '';
    await Clerk.load();
    const s = Clerk.session; if (!s) return '';
    return await s.getToken();
  } catch { return ''; }
}

