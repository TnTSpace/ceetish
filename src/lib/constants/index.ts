export const cart = "ceetishcart"
export enum Constants {
  FILTERS = "filters",
  CART = cart,
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
export enum EducationalPageTypes {
  ABOUT = "About",
  CATEGORIES = "Categories",
  RESOURCES = "Resources",
  LEGAL = "Legal",
}

export const educationalTypes = [
  EducationalPageTypes.CATEGORIES,
  EducationalPageTypes.RESOURCES,
  EducationalPageTypes.LEGAL
]


export const checkBoxClass = "flex h-6 w-6 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"

export const sublineClass = "sm:text-lg font-semibold leading-normal tracking-tight"

export const productGrid = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-hidden gap-4"

export const priceClass = "font-bold text-lg w-fit rounded-lg flex items-center justify-center"

export const btnClasses = "relative amazonchip dark:border-none dark:bg-primary/10"

export const sublineClasses = "text-xl md:text-3xl font-medium text-center"

export const highlightClasses = "p-4 bg-primary/50 py-4 border-l-primary border-l-4 flex flex-col gap-4"

export const highlightBlueClasses = "p-4 bg-blue-500/50 py-4 border-l-blue-500 border-l-4 flex flex-col gap-4"
export const highlightGreenClasses = "p-4 bg-green-500/50 py-4 border-l-green-500 border-l-4 flex flex-col gap-4"
export const highlightYellowClasses = "p-4 bg-yellow-500/50 py-4 border-l-yellow-500 border-l-4 flex flex-col gap-4"
export const highlightPurpleClasses = "p-4 bg-purple-500/50 py-4 border-l-purple-500 border-l-4 flex flex-col gap-4"

export const badgeClasses = "w-fit h-fit overflow-hidden text-ellipsis whitespace-nowrap rounded-full text-xs font-medium capitalize"

export const badgeLinkClasses = "!p-0 !m-0 flex justify-start text-start w-fit"

export const calloutBtnClasses = "bg-white text-font py-2 px-4 w-full text-center md:w-fit rounded-lg" 

export enum Collection {
  USERS = 'users',
  CART = cart,
  CHECKOUT = 'checkout',
  NEWSLETTER = 'newsletter',
  CONTACT = 'contact'
}

export enum Actions {
  ADD = "add",
  REMOVE = "remove"
}
