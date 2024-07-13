<script lang="ts">
	import SK_Carousel from './../../skeletons/SK_Carousel.svelte';
	import './css/base.css';
	import './css/sandbox.css';
	import './css/embla.css';
	import type { Content } from '@prismicio/client';
	import { onMount } from 'svelte';
	import Carousel from './Carousel.svelte';

	export let slice: Content.ReviewsSlice;

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
	<SK_Carousel />
{:then _}
	<Carousel {slice} />
{/await}
