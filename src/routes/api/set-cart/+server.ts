import { deleteDocument, setDocumentWithMerge } from '$lib/firebase/server';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Collection } from '$lib';

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json()
  const docId = body.email
  const data = body.data
  console.log({ msg: "inside setCart", body })
  await deleteDocument({
    docId,
    collectionId: Collection.CART,
    data: {}
  })
  const result = await setDocumentWithMerge({
    docId,
    collectionId: Collection.CART,
    data
  })
  return json(result)
};