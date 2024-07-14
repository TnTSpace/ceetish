import { Collection } from '$lib';
import { setDocumentWithMerge } from '$lib/firebase/server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json()
  const docId = body.email
  const data = { email: body.email, timestamp: +new Date() }
  const result = await setDocumentWithMerge({
    docId,
    collectionId: Collection.NEWSLETTER,
    data
  })
  return json(result)
};