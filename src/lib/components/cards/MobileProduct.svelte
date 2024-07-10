<script lang="ts">
	import SK_MobileProduct from './../skeletons/SK_MobileProduct.svelte';
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
	import { onMount } from 'svelte';

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

	let mounted = new Promise((resolve, reject) => {
		onMount(() => resolve(true));
	});
</script>

{#await mounted}
	<SK_MobileProduct />
{:then _}
	<div
		class={cn(
			'flex flex-col gap-2 overflow-hidden rounded-lg bg-white p-2 shadow-custom dark:bg-primary/10',
			className
		)}>
		<div class="grid grid-cols-[1fr_2fr] gap-2">
			<a class="relative aspect-square w-full overflow-hidden" href={`/product/${product.uid}`}>
				<PrismicImage
					field={images[0]?.image}
					class="absolute left-1/2 top-1/2 aspect-auto h-full -translate-x-1/2 -translate-y-1/2 rounded-md object-cover"
				/>
			</a>
			<div class="flex h-full w-full flex-col justify-between overflow-hidden text-ellipsis">
				<div>
					<h2 class="w-full overflow-hidden text-ellipsis text-base font-semibold oneline">
						{name}
					</h2>
					<p class="hidden w-full text-sm text-muted-foreground twolines dark:opacity-60">
						<PrismicText field={description} />
					</p>
				</div>
				<p class={priceClass}>
					£{price?.toFixed(2)}
				</p>
			</div>
		</div>
		<hr class="dark:border-primary/20" />
		<div aria-label="details" class="flex flex-col gap-2">
			<div class="flex w-full items-center justify-between">
				<ProductDialog {product} />
				<div class="flex items-center gap-2">
					{#if $cartstore && $cartstore[product.uid]}
						<CartCounter on:action={onAction} {product} />
					{:else}
						<Button on:click={addToCart} class="w-full">Add to Cart</Button>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/await}
