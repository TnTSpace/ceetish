import { browser } from "$app/environment";
// import { Constants } from "$lib";
import type { iSKU, iFilter, iCategoryLink } from "$lib/interfaces";
import type { Content } from "@prismicio/client";
import { writable } from "svelte/store";
import type { User } from "@clerk/backend";

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

export interface iCart {
  [key: string]: any
}

const getLocalStorage = (key: string, initialValue: any) => {
  if (browser) {
    const storedValue = localStorage.getItem(key) 
    return storedValue ? JSON.parse(storedValue) : initialValue
  }
}

const setLocalStorage = (key: string, value: any) => {
  if (browser) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

const filterstore = writable<iFilter>(getLocalStorage(Constants.FILTERS, initialFilters))
const cartstore = writable<iCart>(getLocalStorage(Constants.CART, {}))
const categorystore = writable<iCategoryLink[]>(getLocalStorage(Constants.CATEGORIES, []))

filterstore.subscribe(value => setLocalStorage(Constants.FILTERS, value))
cartstore.subscribe(value => setLocalStorage(Constants.CART, value))
categorystore.subscribe(value => setLocalStorage(Constants.CATEGORIES, value))

const userstore = writable<User | null>(null);

export { userstore, cartstore, filterstore, categorystore }

