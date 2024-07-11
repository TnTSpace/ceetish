<script lang="ts">
	import { page } from '$app/stores';
	import { checkBoxClass, eFilters, type iFilters } from '$lib';
	import { act, capitalize } from '$lib/common';
	import { Badge } from '$lib/components/ui/badge';
	import { filterstore } from '$lib/stores';
	import { onMount } from 'svelte';

	export let allFilters: iFilters;
	export let actualFilters: iFilters;

	const { sizes } = allFilters;

	let sizeList: string[] = [];

	$: sizeList = sizeList;

	const numProducts = (size: string) => {
		return actualFilters.sizes.filter(
			(actualSize) => actualSize.toLowerCase() === size.toLowerCase()
		).length;
	};

	onMount(() => {
		const sizeParams = $page.url.searchParams.get(eFilters.SIZES);
		const sizeString = sizeParams ? (sizeParams as string) : '';
		sizeList = sizeString.split('--').map((size) => size.toLowerCase());
	});

	const onInput = (evt: Event) => {
		const target = evt.target as HTMLInputElement;
		const newVal = target.value.toLowerCase();
		const exists = sizeList.includes(newVal);

		sizeList = exists ? act(sizeList, newVal, 'remove') : act(sizeList, newVal, 'add');

		let value = sizeList.join('--');
		value = value.startsWith("--") ? value.substring(2) : value

		value == ''
			? $page.url.searchParams.delete(eFilters.SIZES)
			: $page.url.searchParams.set(eFilters.SIZES, value);

		location.href = $page.url.toString();
	};
</script>

<div class="mt-2 flex flex-col">
	{#each sizes as size, i}
		{#if numProducts(size)}
			<label class="item-center flex cursor-pointer justify-between gap-2 px-4 py-2">
				<div class="flex items-center justify-start gap-1">
					<input
						on:input={onInput}
						type="checkbox"
						class={checkBoxClass}
						bind:group={sizeList}
						value={size}
					/>
					<span>{capitalize(size)}</span>
				</div>
				<Badge>{numProducts(size)}</Badge>
			</label>
		{/if}
	{/each}
</div>
