<script lang="ts">
	import type { Content, ImageFieldImage } from '@prismicio/client';
	import { PrismicRichText, PrismicText, PrismicImage } from '@prismicio/svelte';
	import Heading1 from './Heading1.svelte';
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import { initEmbla } from './scripts';
	import './css/base.css';
	import './css/embla.css';
	
	export let images: ImageFieldImage[]

	let className: string;

	export { className as class };
	onMount(() => initEmbla('desktop'));
</script>

<div class={cn('embla', className)}>
	<div class="embla__viewport">
		<div class="embla__container">
			{#each images as image, i}
				<div
					aria-label="desktop"
					class="embla__slide relative aspect-square max-w-[320px] w-full"
				>
					<PrismicImage
						field={image}
						class="object-cover object-center w-full rounded-lg"
					/>
				</div>
			{/each}
		</div>
	</div>
	<div class="embla-thumbs">
		<div class="embla-thumbs__viewport">
			<div class="embla-thumbs__container">
				{#each images as image, i}
					<div
						class="embla-thumbs__slide embla-thumbs__slide--selected aspect-square overflow-hidden rounded-lg"
					>
						<button type="button" class="embla-thumbs__slide__number relative aspect-square">
							<PrismicImage
								field={image}
								class="absolute left-1/2 top-1/2 h-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
							/>
						</button>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
