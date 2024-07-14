<script lang="ts">
	import { Actions } from '$lib/constants';
	import type { TAction } from '$lib/interfaces';
	import type { Content } from '@prismicio/client';
	import Minus from '../icons/Minus.svelte';
	import Plus from '../icons/Plus.svelte';
	import { Button } from '../ui/button';
	import { createEventDispatcher } from 'svelte';
	import { cartstore } from '$lib/stores';

	const dispatch = createEventDispatcher();

	export let product: Content.ProductDocument;

	export let in_stock: boolean = true

	const disabled = !in_stock

	const onClick = (action: TAction) => {
		dispatch('action', action);
	};
</script>

<div class="flex items-center gap-4 justify-between w-32">
	<Button {disabled} size="icon" variant="amazonchip" class="bg-white dark:bg-primary/10" on:click={() => onClick(Actions.REMOVE)}>
		<Minus />
	</Button>
	{#if $cartstore && $cartstore[product.uid]}
		<span>{$cartstore[product.uid].count}</span>
	{:else}
		<span>{0}</span>
	{/if}
	<Button {disabled} size="icon" variant="amazonchip" class="bg-white dark:bg-primary/10" on:click={() => onClick(Actions.ADD)}>
		<Plus />
	</Button>
</div>
