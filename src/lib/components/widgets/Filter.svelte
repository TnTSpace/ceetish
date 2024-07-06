<script lang="ts">
	import CategoryFilter from './filters/CategoryFilter.svelte';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import Select from '$lib/components/widgets/Select.svelte';
	import { cn } from '$lib/utils';
	import type { Content } from '@prismicio/client';
	import AgeFilter from './filters/AgeFilter.svelte';
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

<div class={cn("flex-col gap-4 hidden md:flex", className)}>
  {#if categories.length}
  <div>
    <h3 class="font-semibold capitalize">
      Categories
    </h3>
    <CategoryFilter { allFilters } { actualFilters } />
  </div>
  {/if}
  {#if maxPrice}
    <div>
      <h3 class="font-semibold capitalize">
        Price Range
      </h3>
      <PriceFilter { allFilters } { actualFilters } />
    </div>
  {/if}
  {#if sizes.length}
    <div>
      <h3 class="font-semibold capitalize">
        Sizes
      </h3>
      <SizeFilter { allFilters } { actualFilters } />
    </div>
  {/if}
  {#if colors.length}
    <div>
      <h3 class="font-semibold capitalize">
        Colors
      </h3>
      <ColorFilter { allFilters } { actualFilters } />
    </div>
  {/if}
</div>
