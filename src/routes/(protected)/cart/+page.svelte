<script lang="ts">
	import type { iStatus, iPayload } from '$lib';
	import { Button } from '$lib/components/ui/button';
	import { getPrice } from '$lib/common/products';
	import { cartstore, Constants, getTotalCartPrice, userstore } from '$lib';
	import toast from 'svelte-french-toast';
	import MobileProduct from '$lib/components/cards/MobileProduct.svelte';
	import { setCart } from '$lib/common/cart';

	$: products = $cartstore ? Object.keys($cartstore).map((key) => $cartstore[key]) : [];
	$: subtotal = $cartstore ? getTotalCartPrice($cartstore) : 0;

	const onSubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();
		// const form = evt.target as HTMLFormElement;
		// const formData = new FormData(form);
		// const entries = Object.fromEntries(formData.entries());

		// const json: iPayload = {
		// 	amount: entries.amount as string,
		// 	email: $userstore?.emailAddresses[0] as unknown as string,
		// 	fullName: $userstore?.fullName as string,
		// 	products
		// };

		const promise = fetch('/api/checkout', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(products)
		});

		const response = await toast.promise(promise, {
			success: 'Successful checkout',
			loading: 'Checking out...',
			error: 'Error :('
		});

		const result = (await response.json()) as iStatus;

		if (result.status === 'success') {
			localStorage.removeItem(Constants.CART);

			if ($userstore) { 
				await setCart($userstore.emailAddresses[0].emailAddress, {});
			}
			toast.success(result.message)
			location.href = result?.data?.url; 
		} else {
			toast.error(result.message)
		}
	};
</script>

<section>
	<div class="grid grid-cols-1 gap-4 center lg:grid-cols-[1fr_320px]">
		<div
			class="flex items-center justify-between rounded-lg bg-white p-2 shadow dark:bg-secondary lg:hidden"
		>
			<h2 class="text-sm font-semibold uppercase">subtotal</h2>
			<p class="font-bold">£{subtotal.toFixed(2)}</p>
		</div>
		<div class="grid h-min grid-cols-1 gap-4">
			<h2 class="text-sm font-semibold uppercase">cart details</h2>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				{#key products}
					{#each products as item, i}
						<MobileProduct product={item.document} />
					{:else}
						<p>No products found</p>
					{/each}
				{/key}
			</div>
		</div>
		<div class="hidden gap-4 lg:flex lg:flex-col">
			<h2 class="text-sm font-semibold uppercase">cart summary</h2>
			<div class="flex flex-col gap-4 rounded-lg bg-white p-4 shadow dark:bg-secondary">
				{#each products as item, i}
					<div class="flex items-start justify-between gap-4">
						<div class="flex items-start gap-1 text-sm font-semibold capitalize">
							<span class="lowercase">(x{item.count})</span>
							<p>
								{item.document.data.name}
							</p>
						</div>
						<p class="font-bold">£{getPrice(item).toFixed(2)}</p>
					</div>
				{/each}
				<hr class="dark:opacity-60" />
				<div class="flex items-center justify-between">
					<h2 class="text-sm font-semibold uppercase">subtotal</h2>
					<p class="font-bold">£{subtotal.toFixed(2)}</p>
				</div>
				<hr class="dark:opacity-60" />
				{#if products.length}
					<form on:submit={onSubmit} class="w-full">
						<input name="amount" type="text" hidden bind:value={subtotal} />
						<Button type="submit" class="w-full">
							Checkout (£{subtotal.toFixed(2)})
						</Button>
					</form>
				{/if}
			</div>
		</div>
		{#key subtotal}
			<div class="flex flex-col gap-4 rounded-lg bg-white p-4 shadow dark:bg-secondary lg:hidden">
				{#each products as item, i}
					<div class="flex items-start justify-between">
						<div class="flex items-start gap-4 text-sm font-semibold capitalize">
							<span class="lowercase">(x{item.count})</span>
							<p>{item.document.data.name}</p>
						</div>
						<p class="font-bold">£{getPrice(item).toFixed(2)}</p>
					</div>
				{/each}
				<hr class="dark:opacity-60" />
				<div class="flex items-center justify-between">
					<h2 class="text-sm font-semibold uppercase">subtotal</h2>
					<p class="font-bold">£{subtotal.toFixed(2)}</p>
				</div>
				<hr class="dark:opacity-60" />
				{#if products.length}
					<form on:submit={onSubmit} class="w-full">
						<input name="amount" type="text" hidden bind:value={subtotal} />
						<Button type="submit" class="w-full">
							Checkout (£{subtotal.toFixed(2)})
						</Button>
					</form>
				{/if}
			</div>
		{/key}
	</div>
</section>
