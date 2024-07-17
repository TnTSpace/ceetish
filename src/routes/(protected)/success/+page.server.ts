import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
  const sessionId = url.searchParams.get('session_id');
  
  if (!sessionId) {
    return { status: 400, body: { error: 'Session ID missing' } };
  }

  const res = await fetch('/api/verify-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionId })
  });

  const data = await res.json();

  if (!res.ok) {
    return { status: res.status, body: { error: data.error } };
  }

  return { status: 200, body: { session: data.session } };
}) satisfies PageServerLoad;