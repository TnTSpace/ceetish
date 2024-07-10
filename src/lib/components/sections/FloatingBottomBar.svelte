<script lang="ts">
	import NavLinkDrawer from './../widgets/NavLinkDrawer.svelte';
	import ModeToggle from '../widgets/ModeToggle.svelte';
	import SearchDialog from '../widgets/SearchDialog.svelte';
	import { page } from '$app/stores';
	import FilterDrawer from '../widgets/FilterDrawer.svelte';
	import { onMount } from 'svelte';
	import Skeleton from '../ui/skeleton/skeleton.svelte';

	$: allFilters = $page.data.allFilters;
	$: actualFilters = $page.data.actualFilters;
	const showFilter = $page.url.pathname.toLowerCase() === '/catalog';

	let mounted = new Promise((resolve, reject) => {
		onMount(() => resolve(true));
	});
</script>

<div class="sticky bottom-0 left-0 z-[2] w-full bg-white dark:bg-secondary md:hidden">
	{#await mounted}
		<div class="flex h-14 items-center justify-between center">
			<Skeleton class="h-10 w-10" />
			<Skeleton class="h-10 w-10" />
			{#if showFilter}
				<Skeleton class="h-10 w-10" />
			{/if}
			<Skeleton class="h-10 w-10" />
		</div>
	{:then value}
		<div class="flex h-14 items-center justify-between center">
			<SearchDialog class="block md:hidden" />
			<ModeToggle />
			{#if showFilter}
				<FilterDrawer {allFilters} {actualFilters} />
			{/if}
			<NavLinkDrawer />
		</div>
	{/await}
</div>
