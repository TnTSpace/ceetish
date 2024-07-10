<script lang="ts">
	import type { iStatus, iPayload } from '$lib';
	import { Button } from '$lib/components/ui/button';
	import { getPrice } from '$lib/common/products';
	import { cartstore, getTotalCartPrice, userstore } from "$lib";
	import toast from 'svelte-french-toast';
	import MobileProduct from '$lib/components/cards/MobileProduct.svelte';

	$: products = $cartstore ? Object.keys($cartstore).map(key => $cartstore[key]) : []
	$: subtotal = $cartstore ? getTotalCartPrice($cartstore) : 0
	$: console.log({ products })

	const onSubmit = async (evt: SubmitEvent) => {
		evt.preventDefault()
		const form = evt.target as HTMLFormElement
		const formData = new FormData(form)
		const entries = Object.fromEntries(formData.entries())

		const json: iPayload = {
			amount: entries.amount as string,
			email: $userstore?.emailAddresses[0] as unknown as string,
			fullName: $userstore?.fullName as string,
			products
		}

		console.log({ json })

		const promise = fetch('/api/checkout', {
			method: 'post',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(json)
		})

		const response = await toast.promise(promise, {
			success: 'Successful checkout',
			loading: 'Checking out...',
			error: 'Error :('
		})

		const result = await response.json() as iStatus

		if (result.status === "success") {
			location.href = result?.data?.url
		} else {

		}

	}
</script>

<section>
	<div class="center grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
		<div
			class="flex lg:hidden items-center justify-between rounded-lg p-2 shadow bg-white dark:bg-secondary"
		>
			<h2 class="uppercase font-semibold text-sm">subtotal</h2>
			<p class="font-bold">£{subtotal.toFixed(2)}</p>
		</div>
		<div class="grid grid-cols-1 gap-4 h-min">
			<h2 class="uppercase font-semibold text-sm">cart details</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				{#each products as item, i}
					<MobileProduct product={item.document} />
				{:else}
					 <p>No products found</p>
				{/each}
			</div>
		</div>
		<div class="hidden lg:flex lg:flex-col gap-4">
			<h2 class="uppercase font-semibold text-sm">cart summary</h2>
			<div class="rounded-lg p-4 shadow flex flex-col gap-4 bg-white dark:bg-secondary">
				{#each products as item, i}
					<div class="flex items-center justify-between">
						<div class="capitalize font-semibold text-sm flex items-center gap-1">
							<p>
								{item.document.data.name}
							</p>
							<span class="lowercase">x{item.count}</span>
						</div>
						<p class="font-bold">£{getPrice(item).toFixed(2)}</p>
					</div>
				{/each}
				<hr class="dark:opacity-60" />
				<div class="flex items-center justify-between">
					<h2 class="uppercase font-semibold text-sm">subtotal</h2>
					<p class="font-bold">£{subtotal.toFixed(2)}</p>
				</div>
				<hr class="dark:opacity-60" />
				<form on:submit={onSubmit} class="w-full">
					<input name="amount" type="text" hidden bind:value={subtotal} />
					<Button type="submit" class="w-full">
						Checkout (£{subtotal.toFixed(2)})
					</Button>
				</form>
			</div>
		</div>
		{#key subtotal}
			<div
				class="flex flex-col gap-4 lg:hidden rounded-lg p-4 shadow bg-white dark:bg-secondary"
			>
				{#each products as item, i}
					<div class="flex items-center justify-between">
						<div class="capitalize font-semibold text-sm flex items-center gap-1">
							<p>{item.document.data.name}</p>
							<span class="lowercase">x{item.count}</span>
						</div>
						<p class="font-bold">£{getPrice(item).toFixed(2)}</p>
					</div>
				{/each}
				<hr class="dark:opacity-60" />
				<div class="flex items-center justify-between">
					<h2 class="uppercase font-semibold text-sm">subtotal</h2>
					<p class="font-bold">£{subtotal.toFixed(2)}</p>
				</div>
				<hr class="dark:opacity-60" />
				<form on:submit={onSubmit} class="w-full">
					<input name="amount" type="text" hidden bind:value={subtotal} />
					<Button type="submit" class="w-full">
						Checkout (£{subtotal.toFixed(2)})
					</Button>
				</form>
			</div>
		{/key}
	</div>
</section>