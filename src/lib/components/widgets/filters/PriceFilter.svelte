<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { checkBoxClass, type iFilters } from '$lib';
	import { serializeParams, slugify, updateUrlWithQueryParams } from '$lib/common';
	import { Badge } from '$lib/components/ui/badge';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { filterstore } from '$lib/stores';
	import { onMount } from 'svelte';

	export let allFilters: iFilters;
	export let actualFilters: iFilters;

	let firstPageEntry = true;

	filterstore.subscribe((value) => {
		if (browser && !firstPageEntry) {
		const json = serializeParams(filterstore)
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

<div class="flex flex-col gap-2">
	<div class="mt-2 flex justify-between items-center gap-4">
		<div>
			<p>Min. (£)</p>
			<Input value={0} />
		</div>
		<div>
			<p class="opacity-0">to</p>
			<span>to</span>
		</div>
		<div>
			<p>Max. (£)</p>
			<Input value={999} />
		</div>
	</div>
	<Button>Apply</Button>
</div>
