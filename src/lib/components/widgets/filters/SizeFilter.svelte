<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import type { iFilters } from '$lib';
	import { serializeParams, slugify, updateUrlWithQueryParams } from '$lib/common';
	import { Badge } from '$lib/components/ui/badge';
	import { filterstore } from '$lib/stores';
	import { onMount } from 'svelte';

	export let allFilters: iFilters;
	export let actualFilters: iFilters;

	let firstPageEntry = true;

	filterstore.subscribe((value) => {
		if (browser && !firstPageEntry) {
		const json = serializeParams(filterstore)
		console.log({ json })
		updateUrlWithQueryParams(json)
			// const json = { ...value, ages: value.ages.join('--') };
			// console.log(json)
			// updateUrlWithQueryParams(json);
		}
	});

	const { sizes } = allFilters;

	onMount(() => {
		firstPageEntry = false;
	});

	const numProducts = (size: string) => {
		return actualFilters.sizes.filter(
			(actualSize) => actualSize.toLowerCase() === size.toLowerCase()
		).length;
	};
</script>

<div class="mt-2 flex flex-col">
	{#each sizes as size, i}
		<label class="item-center flex justify-between gap-2 px-4 py-2 cursor-pointer">
			<div>
				{#if $filterstore && $filterstore.sizes}
					<input type="checkbox" bind:group={$filterstore.sizes} value={size} />
				{/if}
				<span>{size}</span>
			</div>
			<Badge>{numProducts(size)}</Badge>
		</label>
	{/each}
</div>
