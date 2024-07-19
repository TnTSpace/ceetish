import type { RequestHandler } from './$types';
import { stripe } from '$lib/server/stripe';
import { getPrice, type iCartValue, type iPayload } from '$lib';
import { BASE } from '$env/static/private';
import { handleResponse } from '$lib/firebase/server';
import { json } from '@sveltejs/kit';

interface iProduct {
  name: string,
  quantity: number;
  price: number
}

export const POST: RequestHandler = async ({ request }) => {
  // const data = await request.json() as iPayload
  const data = await request.json() as iCartValue[]

  try {

    const products: iProduct[] = []

    const lineItems = data.map(item => {
      const images = item.document.data.images.map(field => (field.image.url as string))
      const name = item.document.data.name as string
      const description = `
      ${
        item.document.data.selected_size 
        ? `${item.document.data.selected_size }`
        : ''
      }
      `
      products.push({ name, quantity: item.count, price: item.document.data.price as number })
      return {
        price_data: {
          currency: "GBP",
          product_data: { name, images, description },
          unit_amount: (item.document.data.price as number) * 100
        },
        quantity: item.count
      }
    })
    
    // Create a Session with Stripe
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: [
          "AL", "AD", "AM", "AT", "AZ", "BY",
          "BE", "BA", "BG", "HR", "CY", "CZ",
          "DK", "EE", "FI", "FR", "GE", "DE",
          "GR", "HU", "IS", "IE", "IT", "KZ",
          "XK", "LV", "LI", "LT", "LU", "MT",
          "MD", "MC", "ME", "NL", "MK", "NO",
          "PL", "PT", "RO", "RU", "SM", "RS",
          "SK", "SI", "ES", "SE", "CH", "TR",
          "UA", "GB", "VA"
        ]
      },
      mode: "payment",
      success_url: `${BASE}/success`,
      cancel_url: `${BASE}/cancel`,
      phone_number_collection: {
        enabled: true
      },
      metadata: {
        date: new Date().toLocaleString(),
        products: JSON.stringify(products)
      }
    })

    const result = handleResponse("Successful checkout url", "success", {
      url: session.url,
      sessionId: session.id,
      paymentStatus: session.payment_status,
      customerId: session.customer,
      paymentIntent: session.payment_intent
    })
    return json(result)
  } catch (error: any) {
    const result = handleResponse(error.message, "error")
    return json(result)
  }
};