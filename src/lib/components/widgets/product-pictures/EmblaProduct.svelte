<script lang="ts">
	import './css/base.css';
	import './css/sandbox.css';
	import './css/embla.css';
	import Mobile from './Mobile.svelte';
	import Desktop from './Desktop.svelte';
	import type { Content, ImageFieldImage } from '@prismicio/client';
	import { onMount } from 'svelte';

	export let images: ImageFieldImage[]

	$: isMobile = false;

	onMount(() => {
		isMobile = window.innerWidth < 768 ? true : false;
		addEventListener('resize', () => {
			isMobile = window.innerWidth < 768 ? true : false;
		});
	});
</script>

{#if isMobile}
	<Mobile {images} class="block md:hidden" />
{:else}
	<Desktop {images} class="hidden md:block" />
{/if}
