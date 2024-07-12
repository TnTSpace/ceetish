import { createClient } from '$lib/prismicio';
import { fetchProducts, getActualFilters, getAllFilters } from '$lib';

export async function load({ url, fetch, cookies }) {
	const searchParams = Object.fromEntries(url.searchParams.entries())
	const client = createClient({ fetch, cookies });
	const products = await fetchProducts(searchParams, client)
	// const allProducts = await fetchProducts({}, client)

	const page = await client.getSingle('catalog')
	console.log({ data: page.data })
	const allFilters = getAllFilters(page)
	const actualFilters = getActualFilters(products)

	console.log({ allFilters })

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
