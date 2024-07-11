<script lang="ts">
	import SearchFilter from './filters/SearchFilter.svelte';
	import CategoryFilter from './filters/CategoryFilter.svelte'; 
	import { cn } from '$lib/utils'; 
	import type { iFilters } from '$lib/interfaces';
	import SizeFilter from './filters/SizeFilter.svelte';
	import ColorFilter from './filters/ColorFilter.svelte';
	import PriceFilter from './filters/PriceFilter.svelte';

  export let allFilters: iFilters
  export let actualFilters: iFilters
  let className: string = ""
  export { className as class }

  const { categories, maxPrice, colors, sizes } = allFilters

</script>

<div class={cn("flex-col gap-4 hidden md:flex bg-white dark:bg-primary/10 p-4 rounded-lg", className)}>
  <SearchFilter />
  {#if categories.length}
  <div>
    <h3 class="font-semibold capitalize">
      Categories
    </h3>
    <CategoryFilter { allFilters } { actualFilters } />
  </div>
  {/if}
	<hr class="dark:border-primary/20" />
  {#if maxPrice}
    <div>
      <h3 class="font-semibold capitalize">
        Price Range
      </h3>
      <PriceFilter { allFilters } />
    </div>
  {/if}
	<hr class="dark:border-primary/20" />
  {#if sizes.length}
    <div>
      <h3 class="font-semibold capitalize">
        Sizes
      </h3>
      <SizeFilter { allFilters } { actualFilters } />
    </div>
  {/if}
	<hr class="dark:border-primary/20" />
  {#if colors.length}
    <div>
      <h3 class="font-semibold capitalize">
        Colors
      </h3>
      <ColorFilter { allFilters } { actualFilters } />
    </div>
  {/if}
</div>
