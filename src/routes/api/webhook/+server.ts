import { STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { Collection } from '$lib';
import { setDocumentWithMerge } from '$lib/firebase/server.js';
import { stripe } from '$lib/server/stripe';
import { json } from '@sveltejs/kit';
import type Stripe from 'stripe';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  
  return json({ message: 'Endpoint' })
};

export const POST = async ({ request }) => {
  const payload = await request.text();
  const sig = request.headers.get('stripe-signature') as string
  const endpointSecret = STRIPE_WEBHOOK_SECRET;

  let event;
  let session: Stripe.Checkout.Session

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    session = event.data.object as Stripe.Checkout.Session
  } catch (err: any) {
    return json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      // Fulfill the purchase, e.g., update your database, send email to customer via google sheet appscript api
      console.log(`Payment was successful for user: ${session.id}`);
      console.log(`session is: ${JSON.stringify(session)}`)
      await setDocumentWithMerge({
        collectionId: Collection.CHECKOUT,
        docId: session.customer_details?.email as string,
        data: event.data
      })
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return json({ received: true, session }, { status: 200 });
};
