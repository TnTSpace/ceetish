<script lang="ts">
	import { PrismicImage } from '@prismicio/svelte';
	import type { Content } from '@prismicio/client';
	import { cn } from '$lib/utils';
	import { Button } from '../ui/button';
	import ProductDialog from '../widgets/ProductDialog.svelte';
	import { cartstore } from '$lib/stores';
	import type { TAction } from '$lib/interfaces'; 
	import { Actions, sublineClass } from '$lib/constants';
	import CartCounter from '../widgets/CartCounter.svelte';

	export let product: Content.ProductDocument;

	let className: string = '';
	export { className as class };

	const { data, uid } = product;
	const { name, category, images, price, description } = data;

	const addToCart = () => {
		const exists = $cartstore[product.uid];
		if (!exists) {
			$cartstore[product.uid] = { document: product, count: 1 }
		} else {
			const cartProduct = $cartstore[product.uid]
			const count = cartProduct.count + 1
			$cartstore[product.uid] = { ...cartProduct, count  }
		}
		$cartstore = $cartstore;
	};

	const removeFromCart = () => {
		const cartProduct = $cartstore[product.uid]
		const count = cartProduct.count - 1
		if (count === 0) {
			delete $cartstore[product.uid]
		} else {
			$cartstore[product.uid] = { ...cartProduct, count }
		}
		$cartstore = $cartstore
	}

	const onAction = (evt: CustomEvent) => {
		const detail = evt.detail as TAction
		detail === Actions.ADD ? addToCart() : removeFromCart()
	}
</script>

<div
	class={cn(
		'relative grid w-full grid-cols-2 rounded-lg overflow-hidden shadow-sm md:grid-cols-1 bg-white dark:bg-secondary',
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
			<h3 class={sublineClass}>
				{name}
			</h3>
			<div class="flex items-center gap-2">
				<p class="font-bold text-lg bg-primary/10 w-fit py-1 px-3 rounded-lg h-9 flex items-center justify-center">
					£{price?.toFixed(2)}
				</p>
				<ProductDialog {product} class="md:hidden" />
			</div>
		</div>
		<div class="flex flex-col gap-2 items-end">
			{#if $cartstore && $cartstore[product.uid]}
				<CartCounter on:action={onAction} { product } />
			{:else}
				<Button on:click={addToCart} class="w-full">
					Add to Cart 
				</Button>
			{/if}
		</div>
	</div>

	<!-- desktop product detail -->
	<div class="mx-auto hidden w-full p-2 gap-2 rounded-lg md:flex md:items-center md:justify-between">
		<p class="font-bold text-lg bg-primary/10 w-fit py-1 px-3 rounded-lg">
			£{price?.toFixed(2)}
		</p>
		<div class="flex items-center gap-2">
			<ProductDialog {product} />
			{#if $cartstore && $cartstore[product.uid]}
				<CartCounter on:action={onAction} { product } />
			{:else}
				<Button on:click={addToCart} class="w-full">
					Add to Cart 
				</Button>
			{/if}
		</div>
	</div>
</div>
