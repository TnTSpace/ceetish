import { filter } from '@prismicio/client';

import { createClient } from '$lib/prismicio';
import type { iFilters } from '$lib';

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

export async function load({ url, fetch, cookies }) {
	const client = createClient({ fetch, cookies });

	const page = await client.getSingle('catalog')
	let categoryPage = await client.getSingle('categories')

	const categories = categoryPage.data.categories.map(field => field.category as string)

	const entries = Object.fromEntries(url.searchParams.entries())

	const filters = Object.keys(entries).map(key => getFilters(key, entries))

	const products = await client.getAllByType('product', { filters })

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

	// const categories = Array.from(new Set(categoryMap)).filter(Boolean)
	const maxPrice = Math.max(...Array.from(new Set(priceMap)))
	const colors = Array.from(new Set(colorMap)).filter(Boolean)
	const sizes = Array.from(new Set(sizesMap)).filter(Boolean)

	const filtersObject: iFilters = { categories, maxPrice, colors, sizes }

	return {
		products,
		filtersObject,
		page,
		title: page.data.meta_title,
		meta_description: page.data.meta_description,
		meta_title: page.data.meta_title,
		meta_image: page.data.meta_image.url
	};
}
