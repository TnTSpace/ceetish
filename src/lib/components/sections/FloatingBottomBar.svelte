<script lang="ts">
	import NavLinkDrawer from './../widgets/NavLinkDrawer.svelte';
	import ModeToggle from '../widgets/ModeToggle.svelte';
	import SearchDialog from '../widgets/SearchDialog.svelte';
	import { page } from '$app/stores';
	import FilterDrawer from '../widgets/FilterDrawer.svelte';
	import { onMount } from 'svelte';
	import Skeleton from '../ui/skeleton/skeleton.svelte';

	$: allFilters = $page.data.allFilters
	$: actualFilters = $page.data.actualFilters
	const showFilter = $page.url.pathname.toLowerCase() === "/catalog"

	let mounted = new Promise((resolve, reject) => {
		onMount(() => {
			resolve(true);
		});
	});
</script>

<div class="sticky bottom-0 left-0 w-full md:hidden  bg-white dark:bg-secondary z-[2]">
	{#await mounted}
	<div class="h-14 flex justify-between items-center center">
		<Skeleton class="w-10 h-10" />
		<Skeleton class="w-10 h-10" />
		<Skeleton class="w-10 h-10" />
		<Skeleton class="w-10 h-10" />
  </div>
	{:then value}
	<div class="h-14 flex justify-between items-center center">
		<SearchDialog class="block md:hidden" />
		<ModeToggle />
		{#if showFilter}
			<FilterDrawer { allFilters } { actualFilters }/>
		{/if}
		<NavLinkDrawer />
  </div>
	{/await}
</div>
