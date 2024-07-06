import { Client, filter } from '@prismicio/client';

import { createClient } from '$lib/prismicio';
import type { iFilter, iFilters } from '$lib';
import type { AllDocumentTypes, CatalogDocument, ProductDocument } from '../../../../prismicio-types';
import { fetchProducts, getActualFilters, getAllFilters, pluralToSingular } from '$lib';

// const checkFilters = ['sizes', 'colors']

// const getFilters = (key: string, entries: Record<string, any>) => {
// 	const value = entries[key].toLowerCase()
// 	const plural = key.toLowerCase()
// 	const singular = pluralToSingular(key)
	
// 	if (checkFilters.includes(key)) {
// 		const values = value.split("--")
// 		const filterKey = `my.product.${plural}.${singular}`
// 		return filter.any(filterKey, values)
// 	} else {
// 		const filterKey = `my.product.${plural}`
// 		return filter.at(filterKey, value)
// 	}
// }

// const fetchProducts = async (params: Record<string, any>, client: Client<AllDocumentTypes>) => {
// 	const filters = Object.keys(params).map(key => getFilters(key, params))
// 	const products = await client.getAllByType('product', { filters })
// 	return products
// }

// const getAllFilters = (page: CatalogDocument<string>): iFilters => {
// 	const categories = page.data.categories.map(field => field.category as string)
// 	const colors = page.data.colors.map(field => field.color as string)
// 	const sizes = page.data.sizes.map(field => field.size as string)
// 	const maxPrice = page.data.maxprice as number
// 	return { categories, maxPrice, colors, sizes }
// }

// const getActualFilters = (allProducts: ProductDocument<string>[]): iFilters => {
// 	const categoryMap: string[] = []
// 	const priceMap: number[] = []
// 	const colorMap: string[] = []
// 	const sizesMap: string[] = []
	
// 	allProducts.forEach(product => {
// 		categoryMap.push(product.data.category as string)
// 		priceMap.push(product.data.price as number)
// 		product.data.colors.map(field => colorMap.push(field.color as string))
// 		product.data.sizes.map(field => sizesMap.push(field.size as string))
// 	})

// 	return {
// 		categories: categoryMap.filter(Boolean),
// 		maxPrice: Math.max(...Array.from(new Set(priceMap))),
// 		colors: colorMap.filter(Boolean),
// 		sizes: sizesMap.filter(Boolean)
// 	}
// }

export async function load({ url, fetch, cookies }) {
	const searchParams = Object.fromEntries(url.searchParams.entries())
	const client = createClient({ fetch, cookies });
	const products = await fetchProducts(searchParams, client) // to remove and replace with js filter here instead of api query
	// const allProducts = await fetchProducts({}, client)

	const page = await client.getSingle('catalog')
	const allFilters = getAllFilters(page)
	const actualFilters = getActualFilters(products)

	return {
		products,
		allFilters,
		actualFilters,
		page,
		title: page.data.meta_title,
		meta_description: page.data.meta_description,
		meta_title: page.data.meta_title,
		meta_image: page.data.meta_image.url
	};
}
