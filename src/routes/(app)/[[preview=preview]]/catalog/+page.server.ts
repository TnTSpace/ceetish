import { Client, filter } from '@prismicio/client';

import { createClient } from '$lib/prismicio';
import type { iFilters } from '$lib';
import type { AllDocumentTypes, CatalogDocument } from '../../../../prismicio-types';

const checkFilters = ['sizes', 'colors']

const getFilters = (key: string, entries: Record<string, any>) => {
	const value = entries[key].toLowerCase()
	
	if (checkFilters.includes(key)) {
		const values = value.split("--")
		
		const filterKey = `my.product.${key.toLowerCase()}`
		return filter.any(filterKey, values)
	} else {
		const filterKey = `my.product.${key.toLowerCase()}`
		return filter.at(filterKey, value)
	}
}

const fetchProducts = async (url: URL, client: Client<AllDocumentTypes>) => {
	const entries = Object.fromEntries(url.searchParams.entries())
	const filters = Object.keys(entries).map(key => getFilters(key, entries))
	const products = await client.getAllByType('product', { filters })
	return products
}

const getAllFilters = (page: CatalogDocument<string>): iFilters => {
	const categories = page.data.categories.map(field => field.category as string)
	const colors = page.data.colors.map(field => field.color as string)
	const sizes = page.data.sizes.map(field => field.size as string)
	const maxPrice = page.data.maxprice as number
	return { categories, maxPrice, colors, sizes }
}

export async function load({ url, fetch, cookies }) {
	const client = createClient({ fetch, cookies });

	const page = await client.getSingle('catalog')
	const allFilters = getAllFilters(page)

	// const categories = filtersPage.data.categories.map(field => field.category as string)
	// const colors = filtersPage.data.colors.map(field => field.color as string)
	// const sizes = filtersPage.data.sizes.map(field => field.size as string)
	// const maxPrice = filtersPage.data.maxprice as number

	// const entries = Object.fromEntries(url.searchParams.entries())
	// const filters = Object.keys(entries).map(key => getFilters(key, entries))
	// const products = await client.getAllByType('product', { filters })
	const products = await fetchProducts(url, client)

	const categoryMap: string[] = []
	const priceMap: number[] = []
	const colorMap: string[] = []
	const sizesMap: string[] = []
	
	products.forEach(product => {
		categoryMap.push(product.data.category as string)
		priceMap.push(product.data.price as number)
		product.data.colors.map(field => colorMap.push(field.color as string))
		product.data.sizes.map(field => sizesMap.push(field.size as string))
	})

	// const filtersObject: iFilters = { categories, maxPrice, colors, sizes }
	const actualObject: iFilters = {
		categories: categoryMap.filter(Boolean),
		maxPrice: Math.max(...Array.from(new Set(priceMap))),
		colors: colorMap.filter(Boolean),
		sizes: sizesMap.filter(Boolean)
	}

	return {
		products,
		allFilters,
		actualObject,
		page,
		title: page.data.meta_title,
		meta_description: page.data.meta_description,
		meta_title: page.data.meta_title,
		meta_image: page.data.meta_image.url
	};
}
