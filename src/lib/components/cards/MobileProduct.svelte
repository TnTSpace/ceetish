<script lang="ts">
	import SK_MobileProduct from './../skeletons/SK_MobileProduct.svelte';
	import type { Content } from '@prismicio/client';
	import { onMount } from 'svelte';
	import MobileProductContent from './MobileProductContent.svelte';

	export let product: Content.ProductDocument;

	let className: string = '';
	export { className as class };


	let mounted = new Promise((resolve, reject) => {
		onMount(() => resolve(true));
	});
</script>

{#await mounted}
	<SK_MobileProduct class={className} />
{:then _}
	<MobileProductContent class={className} {product} />
{/await}
