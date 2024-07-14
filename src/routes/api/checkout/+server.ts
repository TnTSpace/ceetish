import type { RequestHandler } from './$types';
import { stripe } from '$lib/server/stripe';
import { getPrice, type iPayload } from '$lib';
import { BASE } from '$env/static/private';
import { handleResponse } from '$lib/firebase/server';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json() as iPayload


  try {

    const lineItems = data.products.map(item => {
      const images = item.document.data.images.map(field => (field.image.url as string))
      const name = item.document.data.name as string
      return {
        price_data: {
          currency: "GBP",
          product_data: { name, images },
          unit_amount: getPrice(item) * 100
        },
        quantity: item.count
      }
    })

    // Create a Session with Stripe
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      shipping_address_collection: {
        
      },
      mode: "payment",
      success_url: `${BASE}/success`,
      cancel_url: `${BASE}/cancel`,
      phone_number_collection: {
        enabled: true
      }
    })

    const result = handleResponse("Successful checkout url", "success", { url: session.url })
    return json(result)
  } catch (error: any) {
    const result = handleResponse(error.message, "error")
    return json(result)
  }
};