<script lang="ts">
	import CategoryFilter from './filters/CategoryFilter.svelte';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import Select from '$lib/components/widgets/Select.svelte';
	import { cn } from '$lib/utils';
	import type { Content } from '@prismicio/client';
	import AgeFilter from './filters/AgeFilter.svelte';

	export let slice: Content.FiltersSlice;
  let className: string = ""
  export { className as class }


	$: categories = slice.primary.categories.map(item => item.category)
	$: maximumPrice = slice.primary.maximum_price
	$: ages = slice.primary.ages.map(item => item.age)

</script>

<div class={cn("flex-col gap-4 hidden md:flex", className)}>
  <div>
    <h3 class="font-semibold capitalize">
      Categories
    </h3>
    <CategoryFilter { categories } />
  </div>
  <div>
    <h3 class="font-semibold capitalize">
      Ages
    </h3>
    <AgeFilter { ages } />
  </div>
</div>
