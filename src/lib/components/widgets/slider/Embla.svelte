<script lang="ts">
	import SK_HomepageSlider from './../../skeletons/SK_HomepageSlider.svelte';
	import './css/base.css';
	import './css/sandbox.css';
	import './css/embla.css';
	import Mobile from './Mobile.svelte';
	import Desktop from './Desktop.svelte';
	import type { Content } from '@prismicio/client';
	import { onMount } from 'svelte';

	export let slice: Content.HeroSlice;

	$: isMobile = false;

	let mounted = new Promise((resolve, reject) => {
		onMount(() => {
			isMobile = window.innerWidth < 768 ? true : false;
			addEventListener('resize', () => {
				isMobile = window.innerWidth < 768 ? true : false;
			});
			resolve(true);
		});
	});
</script>

{#await mounted}
 <SK_HomepageSlider />
{:then value}
	{#if isMobile}
		<Mobile {slice} class="block md:hidden" />
	{:else}
		<Desktop {slice} class="hidden md:block" />
	{/if}
{/await}
