<script lang="ts">
	import { page } from '$app/stores';
	import Product from '$lib/components/cards/Product.svelte';
	import { productGrid, sublineClass } from '$lib/constants';
	import type { Content, ContentRelationshipField } from '@prismicio/client';
	import { PrismicLink, PrismicRichText, PrismicText } from '@prismicio/svelte';

	export let slice: Content.ProductfloorSlice;

	const getProduct = (itemProduct: ContentRelationshipField) => {
		const uid = (itemProduct as unknown as Content.ProductDocument).uid
		const product = productfloorproducts.find(prod => prod.uid === uid) as Content.ProductDocument
		return product
	}

	$: productfloorproducts = $page.data.productfloorproducts as Content.ProductDocument[];

</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class="my-4">
	<div class="center flex flex-col gap-4 bg-primary/10">
		<div class="flex items-center justify-between">
			<div class="flex flex-col">
				<h2 class={sublineClass}><PrismicText field={slice.primary.title} /></h2>
				<p class="text-xs sm:text-sm"><PrismicText field={slice.primary.usp} /></p>
			</div>
			<PrismicLink field={slice.primary.cta}>See all</PrismicLink>
		</div>
		<div class={productGrid}>
			{#each slice.primary.products as item, i}
				<Product product={ getProduct(item.product) } />
			{/each}
		</div>
	</div>
</section>
