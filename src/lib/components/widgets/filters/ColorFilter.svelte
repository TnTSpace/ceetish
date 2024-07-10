<script lang="ts">
	import { act } from '$lib';
	import { page } from '$app/stores';
	import type { iFilters } from '$lib';
	import { capitalize } from '$lib/common';
	import { Badge } from '$lib/components/ui/badge';
	import { filterstore } from '$lib/stores';
	import { onMount } from 'svelte';
	import { checkBoxClass, eFilters } from '$lib';
	import Button from '$lib/components/ui/button/button.svelte';

	export let allFilters: iFilters;
	export let actualFilters: iFilters;

	const { colors } = allFilters;

	let colorList: string[] = [];

	$: colorList = colorList;

	const numProducts = (color: string) => {
		return actualFilters.colors.filter(
			(actualColor) => actualColor.toLowerCase() === color.toLowerCase()
		).length;
	};

	onMount(() => {
		const colorParams = $page.url.searchParams.get(eFilters.COLORS);
		const colorString = colorParams ? (colorParams as string) : '';
		colorList = colorString.split('--').map((color) => color.toLowerCase());
	});

	const onInput = (evt: Event) => {
		const target = evt.target as HTMLInputElement;
		const newVal = target.value.toLowerCase();
		const exists = colorList.includes(newVal);

		colorList = exists ? act(colorList, newVal, 'remove') : act(colorList, newVal, 'add');

		const value = colorList.join('--');

		value === ''
			? $page.url.searchParams.delete(eFilters.COLORS)
			: $page.url.searchParams.set(eFilters.COLORS, value);

		location.href = $page.url.toString();
	};
</script>

<div class="mt-2 flex flex-col">
	{#each colors as color, i}
		{#if numProducts(color)}
		<Button class="flex justify-start !p-0" variant="ghost">
			<label class="item-center flex w-full cursor-pointer justify-between gap-2 px-4 py-2">
				<div class="flex items-center gap-1">
					<!-- <div class="h-6 w-6 rounded" style={`background-color:${color}`}></div> -->
					<input
						on:input={onInput}
						class={checkBoxClass}
						type="checkbox"
						bind:group={colorList}
						value={color}
					/>
					<span>{capitalize(color)}</span>
				</div>
				<Badge>{numProducts(color)}</Badge>
			</label>
		</Button>
		{/if}
	{/each}
</div>
