<script lang="ts">
	import { PrismicImage, PrismicText } from '@prismicio/svelte';
	import type { Content } from '@prismicio/client';
	import { cn } from '$lib/utils';
	import { Button } from '../ui/button';
	import ProductDialog from '../widgets/ProductDialog.svelte';
	import { cartstore, userstore } from '$lib/stores';
	import type { TAction } from '$lib/interfaces';
	import { Actions, priceClass, sublineClass } from '$lib/constants';
	import CartCounter from '../widgets/CartCounter.svelte';
	import { setCart } from '$lib/common/cart';
	import { ShoppingCart } from 'lucide-svelte';
	import SpinLoader from '../icons/SpinLoader.svelte';

	export let product: Content.ProductDocument;

	let className: string = '';
	export { className as class };

	const { data } = product;
	const { name, images, price, description, old_price, in_stock } = data;

	console.log({ in_stock })

	$: loading = false;

	const addToCart = async () => {
		const exists = $cartstore[product.uid];
		if (!exists) {
			$cartstore[product.uid] = { document: product, count: 1 };
		} else {
			const cartProduct = $cartstore[product.uid];
			const count = cartProduct.count + 1;
			$cartstore[product.uid] = { ...cartProduct, count };
		}
		$cartstore = $cartstore;
		if ($userstore) {
			await setCart($userstore.emailAddresses[0].emailAddress, $cartstore);
		}
	};

	const cart = async () => {
		loading = true;
		await addToCart();
		location.href = '/cart';
		loading = false;
	};

	const removeFromCart = async () => {
		const cartProduct = $cartstore[product.uid];
		const count = cartProduct.count - 1;
		if (count === 0) {
			delete $cartstore[product.uid];
		} else {
			$cartstore[product.uid] = { ...cartProduct, count };
		}
		$cartstore = $cartstore;
		if ($userstore) {
			await setCart($userstore.emailAddresses[0].emailAddress, $cartstore);
		}
	};

	const onAction = (evt: CustomEvent) => {
		const detail = evt.detail as TAction;
		detail === Actions.ADD ? addToCart() : removeFromCart();
	};
</script>

{#if in_stock}
	<div
		class={cn(
			'relative flex w-full flex-col justify-between gap-2 overflow-hidden rounded-lg border border-opacity-10 bg-white shadow dark:bg-primary/10',
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
				<h3 class="overflow-hidden oneline md:text-ellipsis md:whitespace-nowrap">
					{name}
				</h3>
				<p class="hidden h-10 text-sm text-muted-foreground md:twolines">
					<PrismicText field={description} />
				</p>
				<div class="flex items-center gap-1">
					<p class={priceClass}>
						£{price?.toFixed(2)}
					</p>
					{#if old_price}
						<p class="text-sm text-muted-foreground line-through">
							£{old_price?.toFixed(2)}
						</p>
					{/if}
				</div>
			</div>
		</div>

		<div
			class="mx-auto flex w-full items-center justify-between gap-2 border-t p-2 dark:border-primary/20"
		>
			<ProductDialog {product} class="hidden md:flex" />

			<div class="flex w-full items-center gap-2 md:w-fit">
				{#if $cartstore && $cartstore[product.uid]}
					<CartCounter on:action={onAction} {product} />
				{:else}
					<Button on:click={addToCart} class="w-fit">Add to Cart</Button>
				{/if}
				<Button
					on:click={cart}
					size="icon"
					class={cn(loading ? 'pointer-events-none' : 'pointer-events-auto')}
				>
					{#if loading}
						<SpinLoader />
					{:else}
						<ShoppingCart class="h-4 w-4" />
					{/if}
				</Button>
			</div>
		</div>
	</div>
{:else}
	<div
		class={cn(
			'relative flex w-full flex-col justify-between gap-2 overflow-hidden rounded-lg border border-opacity-10 bg-white shadow dark:bg-primary/10',
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
				<h3 class="overflow-hidden oneline md:text-ellipsis md:whitespace-nowrap">
					{name}
				</h3>
				<p class="hidden h-10 text-sm text-muted-foreground md:twolines">
					<PrismicText field={description} />
				</p>
				<div class="flex items-center gap-1">
					<p class={priceClass}>
						£{price?.toFixed(2)}
					</p>
					{#if old_price}
						<p class="text-sm text-muted-foreground line-through">
							£{old_price?.toFixed(2)}
						</p>
					{/if}
				</div>
			</div>
		</div>

		<div
			class="mx-auto flex w-full items-center justify-between gap-2 border-t p-2 dark:border-primary/20"
		>
			<ProductDialog {product} class="hidden md:flex" />

			<div class="flex w-full items-center gap-2 md:w-fit">
				{#if $cartstore && $cartstore[product.uid]}
					<CartCounter on:action={onAction} {product} { in_stock } />
				{:else}
					<Button disabled on:click={addToCart} class="w-fit">Out of stock</Button>
				{/if}
				<Button
					on:click={cart}
					disabled
					size="icon"
					class={cn(loading ? 'pointer-events-none' : 'pointer-events-auto')}
				>
					{#if loading}
						<SpinLoader />
					{:else}
						<ShoppingCart class="h-4 w-4" />
					{/if}
				</Button>
			</div>
		</div>
	</div>
{/if}
