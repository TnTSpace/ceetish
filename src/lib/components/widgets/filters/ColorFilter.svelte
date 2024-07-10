<script lang="ts">
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

	let firstPageEntry = true;

	const { colors } = allFilters;

	onMount(() => {
		firstPageEntry = false;
	});

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
		console.log(colorList);
	});

	const act = (list: string[], str: string, action: 'remove' | 'add') => {
		switch (action) {
			case 'remove':
				let set = new Set(list);
				set.delete(str);
				list = Array.from(set);
				break;
			case 'add':
				list.push(str);
				list = list;
				break;
		}
		return list;
	};

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
		<Button class="flex justify-start !p-0" variant="ghost">
			<label class="item-center flex w-full cursor-pointer justify-between gap-2 px-4 py-2">
				<div class="flex items-center gap-1">
					{#if $filterstore && $filterstore.colors}
						<!-- <div class="h-6 w-6 rounded" style={`background-color:${color}`}></div> -->
						<input
							on:input={onInput}
							class={checkBoxClass}
							type="checkbox"
							bind:group={colorList}
							value={color}
						/>
					{/if}
					<span>{capitalize(color)}</span>
				</div>
				<Badge>{numProducts(color)}</Badge>
			</label>
		</Button>
	{/each}
</div>
