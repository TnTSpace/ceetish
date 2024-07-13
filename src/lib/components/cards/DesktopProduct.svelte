<script lang="ts">
	import SK_DesktopProduct from './../skeletons/SK_DesktopProduct.svelte';
	import type { Content } from '@prismicio/client';
	import { onMount } from 'svelte';
	import DesktopProductContent from './DesktopProductContent.svelte';

	export let product: Content.ProductDocument;

	let className: string = '';
	export { className as class };

	let mounted = new Promise((resolve, reject) => {
		onMount(() => {
			console.log('desktop products');
			resolve(true);
		});
	});
</script>

{#await mounted}
	<SK_DesktopProduct class={className} />
{:then value}
	<DesktopProductContent class={className} {product} />
{/await}
