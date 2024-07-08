<script lang="ts">
	import { PrismicImage, PrismicText } from '@prismicio/svelte';
	import type { Content } from '@prismicio/client';
	import { cn } from '$lib/utils';
	import { Button } from '../ui/button';
	import ProductDialog from '../widgets/ProductDialog.svelte';
	import { cartstore } from '$lib/stores';
	import type { TAction } from '$lib/interfaces';
	import { Actions, priceClass, sublineClass } from '$lib/constants';
	import CartCounter from '../widgets/CartCounter.svelte';
	import { ShoppingCart } from 'lucide-svelte';

	export let product: Content.ProductDocument;

	let className: string = '';
	export { className as class };

	const { data, uid } = product;
	const { name, category, images, price, description } = data;

	const addToCart = () => {
		const exists = $cartstore[product.uid];
		if (!exists) {
			$cartstore[product.uid] = { document: product, count: 1 };
		} else {
			const cartProduct = $cartstore[product.uid];
			const count = cartProduct.count + 1;
			$cartstore[product.uid] = { ...cartProduct, count };
		}
		$cartstore = $cartstore;
	};

	const removeFromCart = () => {
		const cartProduct = $cartstore[product.uid];
		const count = cartProduct.count - 1;
		if (count === 0) {
			delete $cartstore[product.uid];
		} else {
			$cartstore[product.uid] = { ...cartProduct, count };
		}
		$cartstore = $cartstore;
	};

	const onAction = (evt: CustomEvent) => {
		const detail = evt.detail as TAction;
		detail === Actions.ADD ? addToCart() : removeFromCart();
	};
</script>

<div
	class={cn(
		'relative w-full overflow-hidden border border-opacity-10 bg-white shadow dark:bg-primary/10 flex flex-col gap-2 justify-between rounded-lg',
		className
	)}
>
	<div class="flex flex-col">
		<a class="relative aspect-square w-full overflow-hidden" href={`/product/${product.uid}`}>
			<PrismicImage
				field={images[0]?.image}
				class="absolute left-1/2 top-1/2 aspect-auto h-full -translate-x-1/2 -translate-y-1/2 rounded-md object-cover"
			/>
		</a>
	
		<div aria-label="details" class="p-4 pb-0">
			<h3 class="overflow-hidden md:text-ellipsis md:whitespace-nowrap twolines">
				{name}
			</h3>
			<p class="text-sm text-muted-foreground hidden md:twolines">
				<PrismicText field={description} />
			</p>
			<div class="flex items-center justify-between">
			<p class={priceClass}>
				£{price?.toFixed(2)}
			</p>
			<ProductDialog {product} class="flex md:hidden" />
			</div>
		</div>
	</div>

	<div
		class="mx-auto w-full gap-2 p-2 flex items-center justify-between bg-muted-foreground/10"
	>
		<ProductDialog {product} class="hidden md:flex" />
		
		<div class="flex items-center gap-2 w-full md:w-fit">
			{#if $cartstore && $cartstore[product.uid]}
				<CartCounter on:action={onAction} {product} />
			{:else}
				<Button on:click={addToCart} class="w-full">Add to Cart</Button>
			{/if}
		</div>
	</div>
</div>
