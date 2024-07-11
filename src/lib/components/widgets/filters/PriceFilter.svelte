<script lang="ts">
	import { page } from '$app/stores';
	import { eFilters, upperAndLowerLimit, type iFilters, type iPrice } from '$lib'; 
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { onMount } from 'svelte';

	export let allFilters: iFilters;

	const { maxPrice } = allFilters

	let lowerLimit = 0;
	let upperLimit = 999;

	const onSubmit = (evt: SubmitEvent) => {
		evt.preventDefault();
		const form = evt.target as HTMLFormElement;
		const formData = new FormData(form);
		const entries = Object.fromEntries(formData.entries()) as unknown as iPrice;
		const value = `${entries.lowerLimit}-${entries.upperLimit}`;

		$page.url.searchParams.set(eFilters.PRICE, value.toLowerCase());

		location.href = $page.url.toString();
	};

	// Handler to ensure lowerLimit is less than upperLimit
	const handleLowerLimitChange = (event: Event) => {
		const value = parseInt((event.target as HTMLInputElement).value);
		if (value >= upperLimit) {
			lowerLimit = upperLimit - 1;
		} else {
			lowerLimit = value;
		}
	};

	// Handler to ensure upperLimit is greater than lowerLimit
	const handleUpperLimitChange = (event: Event) => {
		const value = parseInt((event.target as HTMLInputElement).value);
		if (value <= lowerLimit) {
			upperLimit = lowerLimit + 1;
		} else {
			upperLimit = value;
		}
	};

	onMount(() => {
		const price = $page.url.searchParams.get(eFilters.PRICE)
		if (price) {
			const limits = upperAndLowerLimit(price as string)
			lowerLimit = limits.lowerLimit
			upperLimit = limits.upperLimit
		}
	})
</script>

<form on:submit={onSubmit} class="flex flex-col gap-2">
	<div class="mt-2 flex justify-between items-center gap-4">
		<div>
			<p>Min. (£)</p>
			<Input type="number" name="lowerLimit" bind:value={lowerLimit} on:input={handleLowerLimitChange} />
		</div>
		<div>
			<p class="opacity-0">to</p>
			<span>to</span>
		</div>
		<div>
			<p>Max. (£)</p>
			<Input type="number" name="upperLimit" bind:value={upperLimit} on:input={handleUpperLimitChange} />
		</div>
	</div>
	<Button type="submit">Apply</Button>
</form>
