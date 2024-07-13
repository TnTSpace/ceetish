import { browser } from "$app/environment";
import type { iFilter, iCart, iUser, iCategoryLink } from "$lib/interfaces";
import { writable } from "svelte/store";

export const initialFilters = {
  category: "",
  price: "",
  colors: [],
  sizes: []
}

enum Constants {
  FILTERS = "filters",
  CART = "cart",
  CATEGORIES = "categories"
}


const getLocalStorage = (key: string, initialValue: any) => {
  if (browser) {
    console.log("to get cart from localstorage")
    const storedValue = localStorage.getItem(key) 
    return storedValue ? JSON.parse(storedValue) : initialValue
  }
}


const setLocalStorage = (key: string, value: any) => {
  if (browser) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

const filterstore = writable<iFilter>(initialFilters)
const cartstore = writable<iCart>(getLocalStorage(Constants.CART, {}))
const categorystore = writable<iCategoryLink[]>(getLocalStorage(Constants.CATEGORIES, []))
const userstore = writable<iUser | null>(null);

filterstore.subscribe(value => setLocalStorage(Constants.FILTERS, value))
cartstore.subscribe(value => setLocalStorage(Constants.CART, value))

categorystore.subscribe(value => setLocalStorage(Constants.CATEGORIES, value))

export { userstore, cartstore, filterstore, categorystore }

