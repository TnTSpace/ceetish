export enum Constants {
  FILTERS = "filters",
  CART = "ceetishcart",
  CATEGORIES = "categories",
  ACTION = "action"
}

export enum eFilters {
  CATEGORY = "category",
  SIZES = "sizes",
  COLORS = "colors",
  PRICE = "price",
  SEARCH = "search"
}


export const checkBoxClass = "flex h-6 w-6 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"

export const sublineClass = "sm:text-lg font-semibold leading-normal tracking-tight"

export const productGrid = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-hidden gap-4"

export const priceClass = "font-bold text-lg w-fit rounded-lg flex items-center justify-center"

export const btnClasses = "relative amazonchip dark:border-none dark:bg-primary/10"

export enum Collection {
  USERS = 'users',
  CART = 'cart'
}

export enum Actions {
  ADD = "add",
  REMOVE = "remove"
}