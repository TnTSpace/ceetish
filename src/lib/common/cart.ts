import { Constants } from "$lib/constants"
import type { iCart, iCartValue, iStatus } from "$lib/interfaces"
import { userstore } from "$lib/stores"
import type { Content } from "@prismicio/client"
import toast from "svelte-french-toast"
import { get, type Writable } from "svelte/store"

export const getCart = async (email: string, cartstore: Writable<iCart>) => {
  const response = await fetch('/api/get-cart', {
    method: 'post',
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({ email })
  })

  const result = await response.json() as iStatus

  if (result.status === "success") {
    delete result?.data?.timestamp
    cartstore.update(value => (result.data as iCart))
  }
}

export const setCart = async (email: string, data: iCart) => {
  const response = await fetch('/api/set-cart', {
    method: 'post',
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({ email, data })
  })

  const result = await response.json() as iStatus

  if (result.status === "success") {
    console.log("setCart was successful", result.message)
  } else {
    console.log("setCart wasn't successful", result.message)
  }
}

export const checkout = async (product: Content.ProductDocument) => {
  const cartValue: iCartValue[] = [{ count: 1, document: product }];

  const response = await fetch('/api/checkout', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cartValue)
  });
  const result = (await response.json()) as iStatus;

  if (result.status === 'success') {
    localStorage.removeItem(Constants.CART);

    const user = get(userstore)

    if (user) { 
      await setCart(user.emailAddresses[0].emailAddress, {});
    }
    toast.success(result.message)
    location.href = result?.data?.url
  } else {
    toast.error(result.message)
  }
};