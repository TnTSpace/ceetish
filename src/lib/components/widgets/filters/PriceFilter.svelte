<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { checkBoxClass, type iFilters } from '$lib';
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
	prices
</div>
