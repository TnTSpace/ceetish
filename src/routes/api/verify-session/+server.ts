import { stripe } from '$lib/server/stripe';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
  const { sessionId } = await request.json();

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === 'paid') {
      return json({ session });
    } else {
      return json({ error: 'Payment not completed' }, { status: 400 });
    }
  } catch (err: any) {
    return json({ error: err.message }, { status: 400 });
  }
};
