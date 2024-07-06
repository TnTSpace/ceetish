<script>
	import { PrismicText, SliceZone } from '@prismicio/svelte';

	import { components } from '$lib/slices';
	import Product from '$lib/components/cards/Product.svelte';
	import Filter from "$lib/components/widgets/Filter.svelte"

	export let data;

	$: products = data.products
	$: title = data.page.data.title
	$: allFilters = data.allFilters
	$: actualFilters = data.actualFilters

</script>

<section>
	<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-[240px_1fr] center py-4">
		<Filter { allFilters } { actualFilters } class="w-[240px]" />
		<div class="flex flex-col gap-4">
			<div class="flex items-center justify-between">
				<!-- <h2>{}</h2> -->
				<PrismicText field={title} />
	
				<!-- <Select {list} label="Sort By" class="w-fit" /> -->
			</div>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{#each products as product, i}
					<Product { product } />
				{/each}
			</div>
		</div>
	</div>
</section>
<!-- <SliceZone slices={data.page.data.slices} {components} /> -->
