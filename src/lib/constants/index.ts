export enum Constants {
  FILTERS = "filters",
  CART = "ceetishcart",
  CATEGORIES = "categories",
  ACTION = "action"
}


export const checkBoxClass = "flex h-6 w-6 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"

export const sublineClass = "sm:text-lg font-semibold leading-normal tracking-tight"

export const productGrid = "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 overflow-hidden gap-1"

export const priceClass = "font-bold text-lg w-fit rounded-lg h-9 flex items-center justify-center"

export enum Collection {
  COURSES = "courses",
  SERVICES = "services",
  AFFILIATES = "affiliates",
  SUBSCRIBERS = "subscribers",
  REGISTRATION = "registration",
  FINANCE = "finance",
  REFEREES = "referees",
  SLIDES = "slides",
  BLOG = "blog",
  SCHOOLS = "schools",
  USERS = "users",
  PARTNERS = "partners",
  CONTACT = "contact"
}

export enum Actions {
  ADD = "add",
  REMOVE = "remove"
}