<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import type { iFilters } from '$lib';
	import { capitalize, serializeParams, slugify, updateUrlWithQueryParams } from '$lib/common';
	import { Badge } from '$lib/components/ui/badge';
	import { filterstore } from '$lib/stores';
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import { checkBoxClass, isActive } from '$lib';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';

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

	const { colors } = allFilters;

	onMount(() => {
		firstPageEntry = false;
	});

	const numProducts = (color: string) => {
		return actualFilters.colors.filter(
			(actualColor) => actualColor.toLowerCase() === color.toLowerCase()
		).length;
	};

</script>

<div class="mt-2 flex flex-col">
	{#each colors as color, i}
	<Button variant={isActive(color, 'colors') ? 'outline' : 'ghost'} class="flex justify-start !p-0">
		<label class="item-center flex justify-between gap-2 px-4 py-2 cursor-pointer w-full">
			<div class="flex items-center gap-1">
				{#if $filterstore && $filterstore.colors}
					<div class="w-6 h-6 rounded" style={`background-color:${color}`}></div>
					<input class={checkBoxClass} type="checkbox" bind:group={$filterstore.colors} value={color} />
					<!-- <Input type="checkbox" /> -->
				{/if}
				<span>{capitalize(color)}</span>
			</div>
			<Badge>{numProducts(color)}</Badge>
		</label>
	</Button>
	{/each}
</div>
