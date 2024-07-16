<script lang="ts">
	import { PrismicImage, PrismicText } from '@prismicio/svelte';
	import type { Content } from '@prismicio/client';
	import { cn } from '$lib/utils';
	import { Button } from '../ui/button';
	import ProductDialog from '../widgets/ProductDialog.svelte';
	import { cartstore, userstore } from '$lib/stores';
	import type { iCart, iCartValue, iStatus, TAction } from '$lib/interfaces';
	import { Actions, badgeClasses, priceClass } from '$lib/constants';
	import CartCounter from '../widgets/CartCounter.svelte';
	import { setCart } from '$lib/common/cart';
	import { ShoppingCart } from 'lucide-svelte';
	import SpinLoader from '../icons/SpinLoader.svelte';
	import Select from '../widgets/Select.svelte';
	import { Badge } from '../ui/badge';
	import toast from 'svelte-french-toast';

	export let product: Content.ProductDocument;

	let className: string = '';
	export { className as class };

	const { data } = product;
	let { name, images, description, in_stock, size_map, selected_size, category } = data;

	$: loading = false;
	$: product = product;

	const sizes = size_map.map((size) => ({
		label: size.size as string,
		value: size.size as string
	}));

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
		console.log({ cartstore: $cartstore });
	};

	const cart = async () => {
		loading = true;
		const cartValue: iCartValue[] = [{ count: 1, document: product }];

		const response = await fetch('/api/checkout', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(cartValue)
		});
		const result = (await response.json()) as iStatus;

		result.status === 'success' ? (location.href = result?.data?.url) : toast.error(result.message);
		loading = false;
	};

	const removeFromCart = async () => {
		const cartProduct = $cartstore[product.uid];
		const count = cartProduct.count - 1;
		if (count === 0) {
			delete $cartstore[product.uid];

			// $cartstore = filterObjectAndExclude(product.uid, $cartstore)
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

	const getPrices = (size: string) => {
		const found = size_map.find(
			(item) => item.size?.toString().toLowerCase() === size.toLowerCase()
		);
		const old_price = found?.old_price as number;
		const price = found?.price as number;
		return { old_price, price };
	};

	const onSelected = (evt: CustomEvent) => {
		const detail = evt.detail as string;
		const { old_price, price } = getPrices(detail);
		product.data.old_price = old_price;
		product.data.price = price;
		product.data.selected_size = detail;
		$cartstore[product.uid].document = product;
	};

	const { old_price, price } = getPrices(selected_size as string);
	product.data.old_price = selected_size ? old_price : product.data.old_price;
	product.data.price = selected_size ? price : product.data.price;
</script>

{#if in_stock}
	<div
		class={cn(
			'flex flex-col gap-2 overflow-hidden rounded-lg bg-white p-2 shadow-custom dark:bg-primary/10',
			className
		)}
	>
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
				<div class="flex items-center gap-1">
					<p class={priceClass}>
						£{product.data.price?.toFixed(2)}
					</p>
					{#if product.data.old_price}
						<p class="text-sm text-muted-foreground line-through">
							£{product.data.old_price.toFixed(2)}
						</p>
					{/if}
				</div>
			</div>
		</div>
		<hr class="dark:border-primary/20" />
		{#if size_map.length}
			<Select
				label="Size"
				list={sizes}
				on:selected={onSelected}
				selected={product.data.selected_size}
			/>
		{:else}
			<div class="flex h-9 items-center px-2">
				<Badge class={badgeClasses}>{category}</Badge>
			</div>
		{/if}
		<hr class="dark:border-primary/20" />
		<div aria-label="details" class="flex flex-col gap-2">
			<div class="flex w-full items-center justify-between">
				<ProductDialog {product} />

				<div class="flex w-full items-center justify-end gap-2 md:w-fit">
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
	</div>
{:else}
	<div
		class={cn(
			'flex flex-col gap-2 overflow-hidden rounded-lg bg-white p-2 shadow-custom dark:bg-primary/10',
			className
		)}
	>
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
				{#if size_map.length}
					<Select
						label="Size"
						list={sizes}
						on:selected={onSelected}
						selected={product.data.selected_size}
					/>
				{:else}
					<div class="flex h-9 items-center px-2">
						<Badge class={badgeClasses}>{category}</Badge>
					</div>
				{/if}
				<div class="flex items-center gap-1">
					<p class={priceClass}>
						£{product.data.price?.toFixed(2)}
					</p>
					{#if product.data.old_price}
						<p class="text-sm text-muted-foreground line-through">
							£{product.data.old_price.toFixed(2)}
						</p>
					{/if}
				</div>
			</div>
		</div>
		<hr class="dark:border-primary/20" />
		<div aria-label="details" class="flex flex-col gap-2">
			<div class="flex w-full items-center justify-between">
				<ProductDialog {product} />

				<div class="flex w-full items-center justify-end gap-2 md:w-fit">
					{#if $cartstore && $cartstore[product.uid]}
						<CartCounter on:action={onAction} {product} />
					{:else}
						<Button on:click={addToCart} class="w-fit">Out of Stock</Button>
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
	</div>
{/if}
