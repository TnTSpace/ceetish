import type { iCart, iCartValue, iFilters } from "$lib/interfaces"
import { filter, Client } from "@prismicio/client"
import { pluralToSingular, upperAndLowerLimit } from "."
import type { AllDocumentTypes, CatalogDocument, ProductDocument } from "../../prismicio-types"
import { eFilters } from "$lib/constants"

const checkFilters = ['sizes', 'colors', 'uids']

export const getFilters = (key: string, entries: Record<string, any>) => {
	const value = entries[key].toLowerCase()
	const plural = key.toLowerCase()
	const singular = pluralToSingular(key)

	if (key.includes(eFilters.PRICE)) {
		const filterKey = `my.product.price`
		const { lowerLimit, upperLimit } = upperAndLowerLimit(value)
		return filter.numberInRange(filterKey, lowerLimit, upperLimit)
	}

	if (key.includes(eFilters.SEARCH)) {
		const filterKey = `my.product.search_metadata` 
		return filter.fulltext(filterKey, value)
	}
	
	if (checkFilters.includes(key)) {
		const values = value.split("--")
		const filterKey = plural === "uids" ? `my.product.${singular}` : `my.product.${plural}.${singular}`
		return filter.any(filterKey, values)
	} else {
		const filterKey = `my.product.${plural}`
		return filter.any(filterKey, [value])
	}
}

export const fetchProducts = async (params: Record<string, any>, client: Client<AllDocumentTypes>) => {
	const filters = Object.keys(params).map(key => getFilters(key, params))
	const products = await client.getAllByType('product', { filters })
	return products
}

export const getAllFilters = (page: CatalogDocument<string>): iFilters => {
	const categories = page.data.categories.map(field => field.category as string)
	const colors = page.data.colors.map(field => field.color as string)
	const sizes = page.data.sizes.map(field => field.size as string)
	const maxPrice = page.data.maxprice as number
	return { categories, maxPrice, colors, sizes }
}

export const getActualFilters = (allProducts: ProductDocument<string>[]): iFilters => {
	const categoryMap: string[] = []
	const priceMap: number[] = []
	const colorMap: string[] = []
	const sizesMap: string[] = []
	
	allProducts.forEach(product => {
		categoryMap.push(product.data.category as string)
		priceMap.push(product.data.price as number)
		product.data.colors.map(field => colorMap.push(field.color as string))
		product.data.sizes.map(field => sizesMap.push(field.size as string))
	})

	return {
		categories: categoryMap.filter(Boolean),
		maxPrice: Math.max(...Array.from(new Set(priceMap))),
		colors: colorMap.filter(Boolean),
		sizes: sizesMap.filter(Boolean)
	}
}

export const getTotalCartItems = (cart: iCart) => {
	return Object.keys(cart).reduce((acc, cur) => {
		const cartCount = cart[cur].count
		acc += cartCount
		return acc
	}, 0)
}

export const getPrice = (cartValue: iCartValue) => {
	const count = cartValue.count
	const price = cartValue.document.data.price as number
	return count * price
}

export const getTotalCartPrice = (cart: iCart) => {
	const price = Object.keys(cart).reduce((acc, cur) => {
		const cartPrice = getPrice(cart[cur])
		acc += cartPrice
		return acc
	}, 0)
	return price
}