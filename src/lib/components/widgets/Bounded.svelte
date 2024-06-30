<script lang="ts">
	import { cn } from '$lib/utils';

	export let tag = 'section';

	let className = "";
	export { className as class };
</script>

<svelte:element
	this={tag}
	{...$$restProps}
	class={cn('py-4', className)}>
	<div class="center flex w-full flex-col items-center">
		<slot />
	</div>
</svelte:element>
