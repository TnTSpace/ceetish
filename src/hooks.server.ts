import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { handleClerk } from 'clerk-sveltekit/server';
import { CLERK_SECRET_KEY } from '$env/static/private';

export const redirectHandler: Handle = async ({ event, resolve }) => {
  const url = new URL(event.request.url);

  const redirects: Record<string, string> = {
    '/about': '/educational/about'
  };

  if (redirects[url.pathname]) {
    const redirectUrl = new URL(redirects[url.pathname], url.origin); // Use the same origin
    return Response.redirect(redirectUrl.toString(), 302);
  }

  const response = await resolve(event);
  return response;
}

export const handle: Handle = sequence(
  handleClerk(CLERK_SECRET_KEY, {
    debug: true,
    // protectedPaths: ['/cart', '/success', '/cancel', '/orders'],
    protectedPaths: [],
    signInUrl: '/sign-in',
  }),
  redirectHandler
);
