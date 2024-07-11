import type { iCart, iStatus } from "$lib/interfaces"
import type { Writable } from "svelte/store"

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