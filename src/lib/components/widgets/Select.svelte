<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { Selected } from 'bits-ui';

	export let list: Selected<unknown>[]
	export let label: string;
	const placeholder = `Select ${label}`
	const name = label

	let className: string = ""
	export { className as class }

	$: value = null;
</script>
<div class="relative">
	<select
		class={cn(
			'country-select !h-10 w-full',
			'flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1', className
		)}
		aria-label={label}
		name={name.toLowerCase()}
    required
		bind:value>
		<option value={null} hidden={value !== null}>{placeholder}</option>
		{#each list as item, i}
			<option value={item.value} selected={item.value === value}>
				{item.label}
			</option>
		{/each}
	</select>
</div>

<style>
	select {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
	}

	div.relative::before {
		content: ''; /* Unicode character for down arrow */
		position: absolute;
		top: 50%;
		width: 6px;
		height: 6px;
		background-color: transparent;
		top: 50%;
		transform: translateY(-50%) rotate(135deg);
		right: 16px;
		border: 2px solid #282828;
		border-left: none;
		border-bottom: none;
		pointer-events: none; /* Ensure the arrow doesn't block interactions */
	}

</style>
