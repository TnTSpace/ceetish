import { getDocument } from '$lib/firebase/server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Collection } from '$lib';

export const POST: RequestHandler = async ({ request, locals }) => {

  const body = await request.json()
  const docId = body.email
  const result = await getDocument({
    docId,
    collectionId: Collection.CART,
    data: {}
  })
  return json(result)
};