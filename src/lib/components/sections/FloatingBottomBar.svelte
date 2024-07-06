<script lang="ts">
	import type { Content } from '@prismicio/client'; 
	import ModeToggle from '../widgets/ModeToggle.svelte';
	import SearchDialog from '../widgets/SearchDialog.svelte';
	import { page } from '$app/stores';
	import FilterDrawer from '../widgets/FilterDrawer.svelte';

	$: console.log({ page: $page.data, from: "catalog" })
	$: allFilters = $page.data.allFilters
	$: actualFilters = $page.data.actualFilters
</script>

<div class="sticky bottom-0 left-0 w-full md:hidden  bg-white dark:bg-secondary z-[2]">
	<div class="h-14 flex justify-between items-center center">
		<SearchDialog class="block md:hidden" />
		<ModeToggle />
		<FilterDrawer { allFilters } { actualFilters }/>
  </div>
</div>
