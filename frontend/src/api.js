const envBase = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) ? String(import.meta.env.VITE_API_BASE_URL) : '';
const isLocal = (location.hostname === 'localhost' || location.hostname === '127.0.0.1');
export const API_BASE = envBase?.trim() || (isLocal ? 'http://localhost:8000' : '');
if (!API_BASE) {
  const msg = 'Missing API base URL. Set VITE_API_BASE_URL in the environment.';
  console.error(msg);
  // Fail closed: surface to user in UI environments
  try { alert(msg); } catch {}
  throw new Error(msg);
}

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

