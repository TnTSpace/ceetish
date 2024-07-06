<script lang="ts">
	import type { SelectField } from '@prismicio/client';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { filterstore } from '$lib/stores';
	import { isActive, serializeParams, updateUrlWithQueryParams } from '$lib/common';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import type { iFilters } from '$lib';

	let className: string = '';
	export { className as class };
	export let allFilters: iFilters;
	export let actualFilters: iFilters;


	const updateCategory = (category: any) => {
		const stringCategory = category as string;
		$filterstore.category = stringCategory.toLowerCase();
		$filterstore = $filterstore;
		const json = serializeParams(filterstore);
		updateUrlWithQueryParams(json);
	};

	const numProducts = (category: string) => {
		return actualFilters.categories.filter(
			(actualCat) => actualCat.toLowerCase() === category.toLowerCase()
		).length;
	};
</script>

<div class={cn(className)}>
	<Button
		on:click={() => updateCategory('')}
		variant={isActive('', 'category') ? 'outline' : 'ghost'}
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
			variant={isActive(category, 'category') ? 'outline' : 'ghost'}
			class={cn(
				'item-center flex w-full justify-between text-base font-normal capitalize',
				!isActive(category, 'category') && 'text-muted-foreground'
			)}
		>
			<span>{category}</span>
			<Badge>{numProducts(category)}</Badge>
		</Button>
	{/each}
</div>
