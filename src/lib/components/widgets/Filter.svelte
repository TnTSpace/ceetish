<script lang="ts">
	import CategoryFilter from './filters/CategoryFilter.svelte';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import Select from '$lib/components/widgets/Select.svelte';
	import { cn } from '$lib/utils';
	import type { Content } from '@prismicio/client';
	import AgeFilter from './filters/AgeFilter.svelte';
	import type { iFilters } from '$lib/interfaces';

  export let allFilters: iFilters
  export let actualObject: iFilters
  let className: string = ""
  export { className as class }

  const { categories, maxPrice, colors, sizes } = allFilters

	// $: categories = slice.primary.categories.map(item => item.category)
	// $: maximumPrice = slice.primary.maximum_price
	// $: ages = slice.primary.ages.map(item => item.age)

</script>

<div class={cn("flex-col gap-4 hidden md:flex", className)}>
  {#if categories.length}
  <div>
    <h3 class="font-semibold capitalize">
      Categories
    </h3>
    <CategoryFilter { allFilters } { actualObject } />
  </div>
  {/if}
  {#if maxPrice}
    <div>
      <h3 class="font-semibold capitalize">
        Price
      </h3>
      <!-- <AgeFilter { ages } /> -->
    </div>
  {/if}
  {#if colors.length}
    <div>
      <h3 class="font-semibold capitalize">
        Colors
      </h3>
      <!-- <AgeFilter { ages } /> -->
    </div>
  {/if}
  {#if sizes.length}
    <div>
      <h3 class="font-semibold capitalize">
        Sizes
      </h3>
      <!-- <AgeFilter { ages } /> -->
    </div>
  {/if}
</div>
