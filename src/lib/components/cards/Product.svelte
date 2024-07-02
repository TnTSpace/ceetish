<script lang="ts">
	import { PrismicText, PrismicImage, PrismicRichText, PrismicLink } from '@prismicio/svelte';
	import type { Content } from '@prismicio/client';
	import { cn } from '$lib/utils';
	import { Button } from '../ui/button';
	import { Badge } from '../ui/badge';
	import ProductDialog from '../widgets/ProductDialog.svelte';
	import { cartstore } from '$lib/stores';
	import type { iSKU } from '$lib/interfaces';

	export let product: Content.ProductDocument;

	let className: string = '';
	export { className as class };

	const { data, uid } = product;
	const { name, category, images, price } = data;

	const addToCart = () => {
		const exists = $cartstore[product.uid];
		console.log({ exists, from: 'add to cart' });
		if (!exists) {
			$cartstore[product.uid] = product.data;
			$cartstore = $cartstore;
		}
	};
</script>

<div
	class={cn(
		'grid h-[49vw] max-h-[196px] w-full grid-cols-2  gap-2 overflow-hidden rounded-lg bg-white p-2 shadow-custom dark:bg-secondary sm:h-fit sm:max-h-none sm:grid-cols-1',
		className
	)}
>
	<a class="relative overflow-hidden sm:aspect-square" href={`/product/${product.uid}`}>
		<PrismicImage
			field={images[0]?.image}
			class="absolute left-1/2 top-1/2 aspect-auto h-full -translate-x-1/2 -translate-y-1/2 rounded-md object-cover"
		/>
	</a>
	<div class="flex flex-col justify-between gap-2">
		<div class="flex flex-col gap-2">
			<h3 class="w-full font-medium">
				{name}
			</h3>
			<Badge
				class="w-fit overflow-hidden text-ellipsis whitespace-nowrap rounded-full pt-1 text-xs font-medium capitalize leading-[1]"
				>{category}</Badge
			>
			<p>${price}</p>
			<!-- <PrismicText field={description} /> -->
		</div>
		<div class="flex items-center justify-between gap-2">
			<div>
				<ProductDialog {product} />
			</div>
			<a href={`/product/${product.uid}`}>
				<Button class="hidden w-full md:flex">Details</Button>
				<Button class="md:hidden" size="icon">detail</Button>
			</a>
			<div>
				<Button class="hidden w-full md:flex" on:click={addToCart}>Buy</Button>
				<Button class="md:hidden" size="icon" on:click={addToCart}>cart</Button>
			</div>
		</div>
	</div>
</div>
