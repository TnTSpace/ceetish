<script lang="ts">
	import { PrismicText, PrismicImage, PrismicRichText, PrismicLink } from '@prismicio/svelte';
	import type { Content } from '@prismicio/client';
	import { cn } from '$lib/utils';
	import { Button } from '../ui/button';
	import { Badge } from '../ui/badge';
	import ProductDialog from '../widgets/ProductDialog.svelte';
	import { cartstore } from '$lib/stores';
	import type { iSKU } from '$lib/interfaces';
	import { ShoppingCart } from 'lucide-svelte';

	export let product: Content.ProductDocument;

	let className: string = '';
	export { className as class };

	const { data, uid } = product;
	const { name, category, images, price, description } = data;

	const addToCart = () => {
		const exists = $cartstore[product.uid];
		console.log({ exists, from: 'add to cart' });
		if (!exists) {
			$cartstore[product.uid] = product.data;
			$cartstore = $cartstore;
		}
	};
</script>

<!-- <div
	class={cn(
		'grid h-[49vw] max-h-[196px] w-full grid-cols-2  gap-2 overflow-hidden rounded-lg bg-white p-2 shadow-custom dark:bg-secondary sm:h-fit sm:max-h-none sm:grid-cols-1 relative',
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
			<PrismicRichText field={description} />
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
</div> -->

<div
	class={cn(
		'relative grid w-full grid-cols-2 rounded-lg overflow-hidden shadow-custom md:grid-cols-1 bg-white dark:bg-secondary',
		className
	)}
>
	<a class="relative aspect-square overflow-hidden" href={`/product/${product.uid}`}>
		<PrismicImage
			field={images[0]?.image}
			class="absolute left-1/2 top-1/2 aspect-auto h-full -translate-x-1/2 -translate-y-1/2 rounded-md object-cover"
		/>
		<h3
			class="absolute bottom-0 left-1/2 hidden w-full -translate-x-1/2 bg-white/90 p-4 font-medium dark:bg-secondary/90 md:block overflow-hidden whitespace-nowrap text-ellipsis"
		>
			{name}
		</h3>
	</a>

	<!-- mobile product detail -->
	<div class="flex flex-col justify-between md:hidden p-2">
		<div>
			<h3 class="font-medium">
				{name}
			</h3>
			<p class="font-bold text-lg bg-primary/20 w-fit py-1 px-3 rounded-lg">
				${price}
			</p>
		</div>
		<div class="flex gap-2 justify-end">
			<ProductDialog {product} />
			<Button size="icon">
				<ShoppingCart class="h-4 w-4" />
			</Button>
		</div>
	</div>

	<!-- desktop product detail -->
	<div class="mx-auto hidden w-full p-2 gap-2 rounded-lg md:flex md:items-center md:justify-between">
		<p class="font-bold text-lg bg-primary/20 w-fit py-1 px-3 rounded-lg">
			${price}
		</p>
		<div class="grid grid-cols-2 gap-2">
			<ProductDialog {product} />
			<Button size="icon">
				<ShoppingCart class="h-4 w-4" />
			</Button>
		</div>
	</div>
</div>
