<script lang="ts">
	import Mobile from './Mobile.svelte';
	import Desktop from './Desktop.svelte';
	import type { Content } from '@prismicio/client';
	import { onMount } from 'svelte';

	export let slice: Content.HeroSlice;

	$: isMobile = false;
	$: console.log({ isMobile });

	onMount(() => {
		isMobile = window.innerWidth < 768 ? true : false;
		addEventListener('resize', () => {
			isMobile = window.innerWidth < 768 ? true : false;
		});
	});
</script>

{#if isMobile}
	<Mobile {slice} class="block md:hidden" />
{:else}
	<Desktop {slice} class="hidden md:block" />
{/if}
