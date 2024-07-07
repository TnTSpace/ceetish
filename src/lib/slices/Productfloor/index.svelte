<script lang="ts">
	import { page } from '$app/stores';
	import Product from '$lib/components/cards/Product.svelte';
import { sublineClass } from '$lib/constants';
	import type { Content } from '@prismicio/client';
	import { PrismicLink, PrismicRichText, PrismicText } from '@prismicio/svelte';

	export let slice: Content.ProductfloorSlice;

	const getProduct = ($p: any) => $p as Content.ProductDocument

	console.log({ products: slice.primary.products, page: $page.data })
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="center">
		<div class="flex justify-between items-center">
			<div class="flex flex-col gap-1">
				<h2 class={sublineClass}><PrismicText field={slice.primary.title} /></h2>
				<p class="text-sm"><PrismicText field={slice.primary.usp} /></p>
			</div>
			<PrismicLink field={slice.primary.cta}>See all</PrismicLink>
		</div>
		<div class="grid grid-flow-col gap-4">
			{#each slice.primary.products as item, i}
				<!-- <Product product={ getProduct(item.product) } /> -->
			{/each}
		</div>
	</div>
</section>
