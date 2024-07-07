import { SERVICE_ACCOUNT } from "$env/static/private";
import admin, { type ServiceAccount } from "firebase-admin"
import { CollectionReference, getFirestore } from "firebase-admin/firestore"
import { Collection, type TStatus, type iDocument, type iQuery, type iWhere } from "$lib" 
import {  initializeApp, cert, getApps } from "firebase-admin/app";

const serviceAccount = JSON.parse(SERVICE_ACCOUNT) as ServiceAccount

export function getFirebaseAdmin() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    })
  }
  return admin
}

const activeApps = getApps()
const app = activeApps.length === 0 ? initializeApp({
  credential: cert(serviceAccount)
}) : activeApps[0]

const db = getFirestore(app)

export const addData = async (collection: string, data: Record<string, any>) => {
  await db.collection(collection).add(data)
}

export const setData = async (collection: string, data: Record<string, any>) => {
  await db.collection(collection)
}

export const handleResponse = (message: string, status: TStatus, data?: any) => {
  return { message, status, data }
}

export const addDocument = async (document: iDocument) => {
  const { collectionId, data, docId } = document
  const docRef = db.collection(collectionId).doc(docId)

  try {
    await docRef.set(data)
    return handleResponse("successfully added document", "success")
  } catch (error: any) {
    return handleResponse(error.message, "error")
  }
}

export const setDocumentWithMerge = async (document: iDocument) => {
  const { collectionId, data, docId } = document
  const docRef = db.collection(collectionId).doc(docId)
  data.timestamp = Date.now().toString()
  try {
    await docRef.set(data, { merge: true })
    return handleResponse("successfully added document", "success")
  } catch (error: any) {
    return handleResponse(error.message, "error")
  }
}

export const getDocument = async (document: iDocument) => {
  const { collectionId, docId } = document
  const docRef = db.collection(collectionId).doc(docId)

  try {
    const doc = await docRef.get()
    if (doc.exists) {
      return handleResponse("successfully obtained document", "success", doc.data())
    } else {
      return handleResponse("Document does not exist!", "error")
    }
  } catch (error: any) {
    return handleResponse(error.message, "error")
  }
}

export const deleteDocument = async (document: iDocument) => {
  const { collectionId, docId } = document
  const docRef = db.collection(collectionId).doc(docId)

  try {
    await docRef.delete()
    return handleResponse("successfully deleted document", "success")
  } catch (error: any) {
    return handleResponse(error.message, "error")
  }
}

export const getDocumentInCollection = async (document: iQuery) => {
  const { collectionId, where } = document;

  const collectionRef = db.collection(collectionId);

  try {
    let query = collectionRef;
    if (where) {
      query = query.where(where.key, where.op, where.value) as CollectionReference
    }

    const snapshot = await query.limit(1).get();

    if (snapshot.empty) {
      return handleResponse("No matching document found", "error", null);
    }

    const doc = snapshot.docs[0];
    const documentData = { id: doc.id, ...doc.data() };

    return handleResponse("Successfully obtained document", "success", documentData);
  } catch (error: any) {
    return handleResponse(error.message, "error", null);
  }
};


export const getDocumentsInCollection = async (document: iQuery) => {
  const { collectionId, where } = document

  const collectionRef = db.collection(collectionId)
  let documents: Record<string, any>[] = []

  try {
    let snapshot = where 
    ? await collectionRef.where(where.key, where.op, where.value).get()
    : await collectionRef.get();
    snapshot.forEach(doc => documents.push({ id: doc.id, ...doc.data() }))
    return handleResponse("successfully obtained documents", "success", documents)
  } catch (error: any) {
    return handleResponse(error.message, "error")
  }
}

export const deleteDocumentsInCollection = async (document: iDocument) => {
  const { collectionId } = document

  const collectionRef = await db.collection(collectionId)

  try {
    const snapshot = await collectionRef.get()
    snapshot.forEach(doc => doc.ref.delete())
    return handleResponse("successfully deleted documents", "success")
  } catch (error: any) {
    return handleResponse(error.message, "error")
  }
}

export const isRegistered = async (email: string) => {
  const response = await getDocumentsInCollection({ collectionId: Collection.USERS})
  const docs = response.data as unknown as Record<string, any>[] 
  const found = docs.find(doc => doc.email === email)
  return found
}