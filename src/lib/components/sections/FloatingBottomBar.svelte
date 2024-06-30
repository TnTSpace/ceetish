<script lang="ts">
	import type { Content } from '@prismicio/client'; 
	import ModeToggle from '../widgets/ModeToggle.svelte';
	import SearchDialog from '../widgets/SearchDialog.svelte';
	// import FilterDrawer from './widgets/FilterDrawer.svelte';
	// import { filterslice } from '$lib/stores';

  // $: slice = $filterslice as Content.FiltersSlice
</script>

<div class="sticky bottom-0 left-0 w-full md:hidden  bg-white dark:bg-secondary z-[2]">
	<div class="h-14 flex justify-between items-center center">
		<SearchDialog class="block md:hidden" />
		<ModeToggle />
    <!-- {#if slice}
      <FilterDrawer { slice } />
    {/if} -->
  </div>
</div>
