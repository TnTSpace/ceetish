<script lang="ts">
	import { cn } from '$lib/utils';

	let className: string = ""

	export { className as class };
	export let selected: boolean;
  export let index: number;
	export let onClick: () => void;
</script>

<div class={cn('embla-thumbs__slide', selected ? ' embla-thumbs__slide--selected' : '', className)}>
	<button on:click={onClick} type="button" class="embla-thumbs__slide__number">
		{index + 1}
	</button>
</div>
