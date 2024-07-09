<script lang="ts">
	import type { SelectField } from '@prismicio/client';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { filterstore } from '$lib/stores';
	import { serializeParams, updateUrlWithQueryParams } from '$lib/common';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import { eFilters, type iFilters } from '$lib';
	import { onMount } from 'svelte';

	let className: string = '';
	export { className as class };
	export let allFilters: iFilters;
	export let actualFilters: iFilters;


	const updateCategory = (category: string) => {
		$page.url.searchParams.set(eFilters.CATEGORY, category.toLowerCase())
		if (category === '') {
			$page.url.searchParams.delete(eFilters.CATEGORY)
		} 
		
		location.href = $page.url.toString()
	};

	const numProducts = (category: string) => {
		return actualFilters.categories.filter(
			(actualCat) => actualCat.toLowerCase() === category.toLowerCase()
		).length;
	};

	const isActive = (filtername: string, reference: string) => {
		const searchParams = $page.url.searchParams
		const queryValue = searchParams.get(filtername) as string
		const value = queryValue ? queryValue as string : '';
		const valueList = value.split("--")
		return valueList.includes(reference.toLowerCase())
	}
</script>

<div class={cn(className)}>
	<Button
		on:click={() => updateCategory('')}
		variant={isActive(eFilters.CATEGORY, '') ? 'outline' : 'ghost'}
		class={cn(
			'item-center flex w-full justify-start text-base font-normal capitalize',
			!isActive('', 'category') && 'text-muted-foreground'
		)}
	>
		all
	</Button>
	{#each allFilters.categories as category, i}
		<Button
			on:click={() => updateCategory(category)}
			variant={isActive(eFilters.CATEGORY, category) ? 'outline' : 'ghost'}
			class={cn(
				'item-center flex w-full justify-between text-base font-normal capitalize',
				!isActive(eFilters.CATEGORY, category) && 'text-muted-foreground'
			)}
		>
			<span>{category}</span>
			<Badge>{numProducts(category)}</Badge>
		</Button>
	{/each}
</div>
