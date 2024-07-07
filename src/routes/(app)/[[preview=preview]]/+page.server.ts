import { asText, type Content } from '@prismicio/client';

import { createClient } from '$lib/prismicio';
import type { Simplify } from '../../../prismicio-types';
import { fetchProducts } from '$lib/common/products';

export async function load({ fetch, cookies }) {
	const client = createClient({ fetch, cookies });

	const page = await client.getByUID('page', 'homepage');

	const _productfloors = page.data.slices
		.filter(slice => slice.slice_type === "productfloor")

	const searchParams = _productfloors.map(productfloor => {
		const id = productfloor.id
		const primary = productfloor.primary as Simplify<Content.ProductfloorSliceDefaultPrimary>
		// @ts-ignore
		const uids = primary.products.map(product => product.product.uid).join('--')

		return { uids }
	})

	const promises = searchParams.map(sp => fetchProducts({ uids: sp.uids }, client))

	const promised = await Promise.all(promises)

	let productfloorproducts: Content.ProductDocument[] = []
	
	promised.forEach(productfloors => productfloorproducts.push(...productfloors))


	return {
		page,
		productfloorproducts,
		title: asText(page.data.title),
		meta_description: page.data.meta_description,
		meta_title: page.data.meta_title,
		meta_image: page.data.meta_image.url
	};
}

export function entries() {
	return [{}];
}
