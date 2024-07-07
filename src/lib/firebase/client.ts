import { goto } from "$app/navigation"
import { PUBLIC_API_KEY, PUBLIC_APP_ID, PUBLIC_AUTH_DOMAIN, PUBLIC_MEASUREMENT_ID, PUBLIC_MESSAGING_SENDER_ID, PUBLIC_PROJECT_ID, PUBLIC_STORAGE_BUCKET } from "$env/static/public"
import { Alerts, Constants } from "$lib/constants"
import type { iEmailPassword } from "$lib/interfaces"
import { alertstore } from "$lib/stores/utilsstore"
import { utils } from "$lib/utils/index"
// import { sessionstore } from "$lib/stores/sessionstore"
import { initializeApp } from "firebase/app"
import { getAuth, type Persistence, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"

export const getFirebaseClient = () => {
  const persistence: Persistence = { type: "NONE" }

  const firebaseConfig = {
    apiKey: PUBLIC_API_KEY,
    authDomain: PUBLIC_AUTH_DOMAIN,
    projectId: PUBLIC_PROJECT_ID,
    storageBucket: PUBLIC_STORAGE_BUCKET,
    messagingSenderId: PUBLIC_MESSAGING_SENDER_ID,
    appId: PUBLIC_APP_ID,
    measurementId: PUBLIC_MEASUREMENT_ID
  }

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  // auth.setPersistence(persistence)
  // setPersistence(auth, persistence)
  return auth
}


const googleProvider = new GoogleAuthProvider()
const auth = getFirebaseClient()

const sendIdToken = async (idToken: string) => {
  await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken })
  })
}

export const signInWithGoogle = async () => {
  try {
    const user = await signInWithPopup(auth, googleProvider)
    const idToken = await user.user.getIdToken()
    await sendIdToken(idToken)

    navigateToDestination()
    
    const message = 'Successfully logged in'
    utils.setAlert(message, Alerts.SUCCESS, alertstore)
  } catch (error: any) {
    const message = utils.formatErrorMessage(error.message)
    utils.setAlert(message, Alerts.ERROR, alertstore)
  } finally {
    auth.signOut()
  }
}

export const getRedirect = () => {
  const url = new URL (window.location.href)
  return url.searchParams.get(Constants.REDIRECTTO)
}

export const navigateToDestination = () => {
  const redirectTo = getRedirect()
  window.location.href = redirectTo ? redirectTo : "/"
}

export const handleSignInWithEmailAndPassword = async (options: iEmailPassword) => {
  const { email, password } = options
  const user = await signInWithEmailAndPassword(auth, email, password)
  const idToken = await user.user.getIdToken()
  await sendIdToken(idToken)
}

export const handleRegisterWithEmailAndPassword = async (options: iEmailPassword) => {
  const { email, password } = options
  const user = await createUserWithEmailAndPassword(auth, email, password)
  const idToken = await user.user.getIdToken()
  await sendIdToken(idToken)
}

export const logout = async () => {
  try {
    deleteUserSession()
    await fetch("/login", { method: "DELETE" })
    window.location.href = "/login"
    const message = 'Successfully logged out'
    utils.setAlert(message, Alerts.SUCCESS, alertstore)
  } catch(error: any) {
    const message = utils.formatErrorMessage(error.message)
    utils.setAlert(message, Alerts.ERROR, alertstore)
  }
}

const deleteUserSession = () => {
  const sessionCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('userSession='));

  // If the session cookie is found, update its attributes to expire it
  if (sessionCookie) {
    const cookieAttributes = sessionCookie.split(';');
    const updatedCookie = `${cookieAttributes[0]}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

    // Update the document.cookie with the modified cookie
    document.cookie = updatedCookie;

    console.log('Session cookie deleted.');
  } else {
    console.log('No session cookie found.');
  }
}