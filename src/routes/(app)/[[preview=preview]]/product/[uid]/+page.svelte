<script lang="ts">
	import Select from '$lib/components/widgets/Select.svelte';
	import SpinLoader from '$lib/components/icons/SpinLoader.svelte';
	import { checkout } from '$lib/common/cart';
	import Button from '$lib/components/ui/button/button.svelte';
	import CartCounter from '$lib/components/widgets/CartCounter.svelte';
	import { setCart } from '$lib/common/cart';
	import Policies from '$lib/components/widgets/Policies.svelte';
	import { PrismicText, PrismicRichText } from '@prismicio/svelte';
	import EmblaProduct from '$lib/components/widgets/product-pictures/EmblaProduct.svelte';
	import {
		Actions,
		badgeClasses,
		badgeLinkClasses,
		cartstore,
		paramify,
		priceClass,
		userstore,
		type TAction
	} from '$lib';
	import { Badge } from '$lib/components/ui/badge';
	import { ShoppingCart } from 'lucide-svelte';
	import { cn } from '$lib/utils';

	export let data;

	const product = data.page;
	const { name, category, description, details, in_stock, size_map, selected_size } =
		product.data;

	$: images = data.page.data.images.map((field) => field.image);
	$: loading = false;

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
	};

	const handleCheckout = async () => {
		loading = true;
		await checkout(product);
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

<div class="flex flex-col gap-4 center">
	<div
		class="grid grid-cols-1 gap-4 rounded-lg bg-white p-4 shadow dark:bg-primary/10 md:grid-cols-[1fr_1fr_1fr]"
	>
		<div class="w-full">
			<EmblaProduct {images} />
		</div>
		<div class="flex flex-col gap-2">
			<Button
				variant="ghost"
				class={badgeLinkClasses}
				href={`/catalog?category=${paramify(category)}`}
			>
				<Badge class={badgeClasses}>{category}</Badge>
			</Button>
			<h1 class="font-medium">
				{name}
			</h1>
			<p class="text-muted-foreground">
				<PrismicText field={description} />
			</p>
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
			<hr class="dark:border-primary/20" />
			{#if size_map.length}
				<Select
					label="Size"
					list={sizes}
					on:selected={onSelected}
					selected={product.data.selected_size}
				/>
			{/if}
			<hr class="dark:border-primary/20" />
			{#if in_stock}
				<div class="mt-auto flex w-full items-center gap-2 md:w-fit">
					{#if $cartstore && $cartstore[product.uid]}
						<CartCounter on:action={onAction} {product} />
					{:else}
						<Button on:click={addToCart} class="flex-grow">Add to Cart</Button>
					{/if}

					<Button
						on:click={handleCheckout}
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
			{:else}
				<div class="mt-auto flex w-full items-center gap-2 md:w-fit">
					{#if $cartstore && $cartstore[product.uid]}
						<CartCounter on:action={onAction} {product} />
					{:else}
						<Button disabled on:click={addToCart} class="flex-grow">Add to Cart</Button>
					{/if}

					<Button
						on:click={handleCheckout}
						size="icon"
						disabled
						class={cn(loading ? 'pointer-events-none' : 'pointer-events-auto')}
					>
						{#if loading}
							<SpinLoader />
						{:else}
							<ShoppingCart class="h-4 w-4" />
						{/if}
					</Button>
				</div>
			{/if}
		</div>
		<div class="prose dark:prose-invert">
			<PrismicRichText field={details} />
		</div>
	</div>
	<Policies />
</div>
