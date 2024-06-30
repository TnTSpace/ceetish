<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { slugify, updateUrlWithQueryParams } from '$lib/common';
	import { filterstore } from '$lib/stores';
	import { onMount } from 'svelte';

	export let ages: any[] = [];

	let firstPageEntry = true

	filterstore.subscribe((value) => {
		if (browser && !firstPageEntry) {
			const json = { ...value, ages: value.ages.join('--') };
      console.log(json)
			updateUrlWithQueryParams(json);
		}
	});

	onMount(() => {
		firstPageEntry = false
	})
</script>

<div class="mt-2 flex flex-col">
	{#each ages as age, i}
		<label class="item-center flex gap-2 px-4 py-2">
			{#if $filterstore && $filterstore.ages}
				<input type="checkbox" bind:group={$filterstore.ages} value={age} />
			{/if}
			<span>{age}</span>
		</label>
	{/each}
</div>
