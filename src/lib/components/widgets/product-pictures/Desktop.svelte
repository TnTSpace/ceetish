<script lang="ts">
	import type { ImageFieldImage } from '@prismicio/client';
	import { PrismicImage } from '@prismicio/svelte'; 
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import EmblaCarousel, { type EmblaOptionsType, type EmblaCarouselType } from 'embla-carousel';
	import {
		addThumbBtnsClickHandlers,
		addToggleThumbBtnsActive
	} from './scripts/EmblaCarouselThumbsButton';
	
	export let images: ImageFieldImage[]
	let className: string;
	export { className as class };

	let slideViewport: HTMLElement;
	let thumbViewport: HTMLElement;
	let emblaApiMain: EmblaCarouselType;
	let emblaApiThumb: EmblaCarouselType;


	const OPTIONS: EmblaOptionsType = {};
	const OPTIONS_THUMBS: EmblaOptionsType = {
		containScroll: 'keepSnaps',
		dragFree: true
	};
	onMount(() => {
		const viewportNodeMainCarousel = <HTMLElement>slideViewport;
		const viewportNodeThumbCarousel = <HTMLElement>thumbViewport;

		emblaApiMain = EmblaCarousel(viewportNodeMainCarousel, OPTIONS);
		emblaApiThumb = EmblaCarousel(viewportNodeThumbCarousel, OPTIONS_THUMBS);

		const removeThumbBtnsClickHandlers = addThumbBtnsClickHandlers(emblaApiMain, emblaApiThumb);
		const removeToggleThumbBtnsActive = addToggleThumbBtnsActive(emblaApiMain, emblaApiThumb);

		return () => {
			emblaApiMain
				.on('destroy', removeThumbBtnsClickHandlers)
				.on('destroy', removeToggleThumbBtnsActive);

			emblaApiThumb
				.on('destroy', removeThumbBtnsClickHandlers)
				.on('destroy', removeToggleThumbBtnsActive);
		};
	});
</script>

<div class={cn('embla', className)}>
	<div bind:this={slideViewport} class="embla__viewport">
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
		<div bind:this={thumbViewport} class="embla-thumbs__viewport">
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
