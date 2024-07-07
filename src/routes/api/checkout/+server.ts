import type { RequestHandler } from './$types';
import { stripe } from '$lib/server/stripe';

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json()
  return new Response();
};