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
	import { cn } from '$lib/utils';

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
		colorList = colorString.split('--').map((color) => color.toLowerCase())
		.filter(Boolean)

		colorList.forEach((color) => {
			const el = document.querySelector(`div[data-color="${color}"]`) as HTMLDivElement;
			if (el) {
				el.classList.add('border-[3px]');
				el.classList.add('border-white');
				el.classList.add('dark:border-primary/10')
				el.setAttribute('style', `background-color:${el.style.backgroundColor};outline: 3px solid ${color}`);
			}
		});
		console.log({ from: 'onMount', colorList });
	});

	const onInput = (evt: Event) => {
		const target = evt.target as HTMLInputElement;
		const newVal = target.value.toLowerCase();
		const exists = colorList.includes(newVal);

		colorList = exists ? act(colorList, newVal, 'remove') : act(colorList, newVal, 'add');

		let value = colorList.join('--');

		value = value.startsWith('--') ? value.substring(2) : value;

		value === ''
			? $page.url.searchParams.delete(eFilters.COLORS)
			: $page.url.searchParams.set(eFilters.COLORS, value);

		location.href = $page.url.toString();
	};
</script>

<div class="mt-2 grid grid-cols-6 gap-2">
	{#each colors as color, i}
		<label class="item-center flex w-full cursor-pointer">
			<div class="h-6 w-6 rounded-full" data-color={color} style="background-color:{color}">
				<input
					on:input={onInput}
					class={cn(checkBoxClass, 'hidden')}
					type="checkbox"
					bind:group={colorList}
					value={color}
				/>
			</div>
		</label>
	{/each}
</div>
