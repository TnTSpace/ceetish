<script lang="ts">
	import { PrismicText, PrismicImage, PrismicRichText, PrismicLink } from '@prismicio/svelte';
	import type { Content } from '@prismicio/client';
	import { cn } from '$lib/utils';
	import { Button } from '../ui/button';
	import { Badge } from '../ui/badge';
	import ProductDialog from '../widgets/ProductDialog.svelte';
	import { cartstore } from '$lib/stores';
	import type { iSKU, TAction } from '$lib/interfaces';
	import { ShoppingCart } from 'lucide-svelte';
	import { Actions, priceClass, sublineClass } from '$lib/constants';
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
		'relative flex w-full rounded-lg overflow-hidden shadow-sm bg-white dark:bg-secondary',
		className
	)}
>
	<a class="relative aspect-square w-[160px] h-[160px] overflow-hidden" href={`/product/${product.uid}`}>
		<PrismicImage
			field={images[0]?.image}
			class="absolute left-1/2 top-1/2 aspect-auto h-full -translate-x-1/2 -translate-y-1/2 rounded-md object-cover"
		/>
	</a>

	<!-- mobile product detail -->
	<div class="flex flex-col justify-between p-2 w-full">
		<div>
			<h3 class={sublineClass}>
				{name}
			</h3>
			<p  class="hidden sm:block text-muted-foreground">
				<PrismicText field={description} />
			</p>
		</div>
		<div class="flex flex-col sm:flex-row gap-2 justify-between w-full">
			<div class="flex items-center gap-2">
				<p class={priceClass}>
					£{price?.toFixed(2)}
				</p>
				<ProductDialog {product} />
			</div>
			<div class="flex flex-col gap-2 items-start sm:items-end">
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
</div>
