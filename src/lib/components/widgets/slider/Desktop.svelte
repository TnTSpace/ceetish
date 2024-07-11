<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText, PrismicText, PrismicImage } from '@prismicio/svelte';
	import Heading1 from './Heading1.svelte';
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import EmblaCarousel, { type EmblaOptionsType, type EmblaCarouselType } from 'embla-carousel';
	import {
		addThumbBtnsClickHandlers,
		addToggleThumbBtnsActive
	} from './scripts/EmblaCarouselThumbsButton';

	let className: string;
	export { className as class };
	export let slice: Content.HeroSlice;

	$: sliders = slice.primary.sliders;

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
			{#each sliders as slider, i}
				<div
					aria-label="desktop"
					class="embla__slide relative hidden aspect-video max-h-[500px] w-full overflow-hidden rounded-lg bg-white dark:bg-primary/10 md:block md:aspect-[16/6]"
				>
					<div
						class="absolute left-0 top-1/2 flex h-full w-[40%] -translate-y-1/2 flex-col items-center justify-center gap-8"
					>
						<div class="flex flex-col gap-4 px-10">
							<PrismicRichText field={slider.title} components={{ heading1: Heading1 }} />
							<p>
								<PrismicText field={slider.subline} />
							</p>
						</div>
					</div>
					<div class="absolute right-0 top-1/2 h-full w-[60%] -translate-y-1/2 clip">
						<PrismicImage
							field={slider.image}
							class="absolute right-0 top-1/2 w-full -translate-y-1/2"
						/>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="embla-thumbs">
		<div bind:this={thumbViewport} class="embla-thumbs__viewport">
			<div class="embla-thumbs__container">
				{#each sliders as slider, i}
					<div
						class="embla-thumbs__slide embla-thumbs__slide--selected aspect-square overflow-hidden rounded-lg"
					>
						<button type="button" class="embla-thumbs__slide__number relative aspect-square">
							<PrismicImage
								field={slider.image}
								class="absolute left-1/2 top-1/2 h-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
							/>
						</button>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
