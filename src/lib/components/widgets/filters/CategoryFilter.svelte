<script lang="ts">
	import type { SelectField } from '@prismicio/client';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import { filterstore } from '$lib/stores';
	import { updateUrlWithQueryParams } from '$lib/common';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';


	let className: string = '';
	export { className as class };
	export let categories: any[];


	const isActive = (category: string) => {
  	const url = $page.url.searchParams
		const categoryUrl = url.get("category")
		return category.toLowerCase() === categoryUrl?.toLowerCase()
	}

  const updateCategory = (category: any) => {
    const stringCategory = category as string
    $filterstore.category = stringCategory.toLowerCase()
		const json = { ...$filterstore, ages: $filterstore.ages.join('--') };
		updateUrlWithQueryParams(json)
  }

 
</script>

<div class={cn(className)}>
	<Button
		on:click={() => updateCategory("")}
		variant={isActive("") ? "outline" : "ghost"}
		class={cn("item-center flex w-full justify-start text-base font-normal capitalize", !isActive("") && "text-muted-foreground")}
		>
		all
		</Button
	>
	{#each categories as category, i}
		<Button
      on:click={() => updateCategory(category)}
			variant={isActive(category) ? "outline" : "ghost"}
			class={cn("item-center flex w-full justify-start text-base font-normal capitalize", !isActive(category) && "text-muted-foreground")}
			>
      {category}
      </Button
		>
	{/each}
</div>
