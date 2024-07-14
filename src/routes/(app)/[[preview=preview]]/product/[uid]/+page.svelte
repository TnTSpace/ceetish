<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import CartCounter from '$lib/components/widgets/CartCounter.svelte';
	import { setCart } from '$lib/common/cart';
	import Policies from '$lib/components/widgets/Policies.svelte'; 
	import { PrismicText, PrismicRichText } from '@prismicio/svelte'; 
	import EmblaProduct from '$lib/components/widgets/product-pictures/EmblaProduct.svelte'; 
	import { Actions, badgeClass, cartstore, priceClass, userstore, type TAction } from '$lib'
	import { Badge } from '$lib/components/ui/badge'; 

	export let data;
	
	const product = data.page
	const { name, category,  description, price, details, old_price } = product.data

	$: images = data.page.data.images.map(field => field.image)
 
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

<div class="flex flex-col gap-4 center">
	<div class="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] gap-4 bg-white dark:bg-primary/10 p-4 rounded-lg shadow">
		<div class="w-full">
			<EmblaProduct { images } />
		</div>
		<div class="flex flex-col gap-2">
			<Badge class={badgeClass}>{category}</Badge>
			<h1 class="font-medium">
				{name} 
			</h1>
			<p class="text-muted-foreground">
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
			<div class="flex w-full items-center gap-2 md:w-fit mt-auto">
				{#if $cartstore && $cartstore[product.uid]}
					<CartCounter on:action={onAction} {product} />
				{:else}
					<Button on:click={addToCart} class="w-full">Add to Cart</Button>
				{/if}
			</div>
		</div>
		<div class="prose dark:prose-invert">
			<PrismicRichText field={details} />
		</div>
	</div>
	<Policies />
</div>
