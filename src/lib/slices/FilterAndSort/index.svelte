<script lang="ts"> 
	import { page } from '$app/stores';
	import { capitalize } from '$lib'; 
	import Bounded from '$lib/components/widgets/Bounded.svelte';
	import Filter from '$lib/components/widgets/Filter.svelte'; 
	import Select from '$lib/components/widgets/Select.svelte';
	import { filterslice, filterstore, initialFilters } from '$lib/stores';
	import type { Content } from '@prismicio/client';
	import { PrismicText } from '@prismicio/svelte';
	import type { Selected } from 'bits-ui';
	import type { ProductDocument } from '../../../prismicio-types';
	import Product from '$lib/components/cards/Product.svelte';
	import { onDestroy } from 'svelte';

	export let slice: Content.FilterAndSortSlice;

	const list: Selected<unknown>[] = slice.primary.sort_by.map((sortBy) => ({
		label: capitalize(sortBy.field as string),
		value: sortBy.field as string
	}));

	$filterslice = slice

	let products = $page.data.products as ProductDocument<string>[]

		
	onDestroy(() => {
		console.log("on destroy from filters")
		$filterstore = initialFilters
	})
</script>

<Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-[240px_1fr]">
		<Filter { slice } class="w-[240px]" />
		<div class="flex flex-col gap-4">
			<div class="flex items-center justify-between">
				<PrismicText field={slice.primary.title} />

				<Select {list} label="Sort By" class="w-fit" />
			</div>
			<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
				{#each products as product, i}
					<Product { product } />
				{/each}
			</div>
		</div>
	</div>
</Bounded>
