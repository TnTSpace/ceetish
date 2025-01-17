import type { Content } from "@prismicio/client";
import type { User } from "@clerk/backend";

export interface iSKU {
  uid: string;
  name: string;
  description: string;
  categories: string[];
  price: string;
  discount: string;
  image: string;
  url: string;
  color: string;
}

export interface iGlobal {
  identifier: string,
  name: string
}

export interface iPrice {
  discount: string;
  oldPrice: string;
  oldPriceEuro: string;
  price: string;
  priceEuro: string;
  rawPrice: string;
  taxEuro: string;
}

export interface iRating {
  average: number;
  totalRatings: number;
}
export interface iSimple {
  sku: string;
  loginUrl: string;
  isBuyable: boolean;
  name: string;
  prices: iPrice
}

export interface iMain {
  name: string;
  identifier: string;
  url: string;
}

export interface iCampaign {
  name: string;
  identifier: string;
  image: string;
  url: string;
  bgColor: string;
  txtColor: string;
}

export type TFilter = "category" | "sizes" | "price" | "colors"

export interface iFilter {
  category: string;
  price: string;
  colors: string[];
  sizes: string[]
}

export interface iFilters {
  categories: string[];
  maxPrice: number;
  colors: string[];
  sizes: string[]
}

export interface iSession {
  userId: string;
  claims: {
    azp: string;
    exp: number;
    iat: number
    iss: string;
    nbf: number
    sid: string
    sub: string
  }
}

export type TStatus = "success" | "error"

export type TAction = "add" | "remove"

export interface iStatus {
  message: string;
  status: TStatus;
  data?: Record<string, any>;
}

export interface iDocument {
  collectionId: string;
  docId: string;
  data: Record<string, any>
}

export interface iQuery {
  collectionId: string;
  where?: iWhere
}

export interface iWhere {
  key: string;
  op: "<" | "<=" | "==" | ">" | ">=" | "!=" | "array-contains" | "array-contains-any" | "in" | "not-in"
  value: string
}

export interface iCategoryLink {
  href: string;
  name: string;
}

export interface iCartValue { count: number, document: Content.ProductDocument }

export interface iCart {
  [key: string]: iCartValue
}

export interface iUser extends User {
  fullName: string;
}

export interface iPayload {
  amount: string;
  email: string;
  fullName: string;
  products: iCartValue[]
}

export interface iPrice {
  lowerLimit: string;
  upperLimit: string;
}