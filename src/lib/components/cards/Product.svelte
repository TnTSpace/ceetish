<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { cn } from '$lib/utils';
	import DesktopProduct from './DesktopProduct.svelte';
	import MobileProduct from './MobileProduct.svelte';

	export let product: Content.ProductDocument;

	let className: string = '';
	export { className as class };
</script>

<div>
	<DesktopProduct {product} class={cn('hidden md:flex', className)} />
	<MobileProduct {product} class={cn('flex md:hidden', className)} />
</div>
