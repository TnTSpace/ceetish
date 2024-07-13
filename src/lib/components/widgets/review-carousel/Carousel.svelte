<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicText, PrismicImage } from '@prismicio/svelte';
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import EmblaCarousel, { type EmblaOptionsType, type EmblaCarouselType } from 'embla-carousel';
	import Autoplay from 'embla-carousel-autoplay';
	import {
		addPrevNextBtnsClickHandlers,
		addNavBtnListeners,

		addPlayBtnListeners

	} from './scripts/EmblaCarouselThumbsButton';
	import Card from '$lib/components/ui/card/card.svelte';
	import Avatar from '$lib/components/icons/Avatar.svelte';
	import { buttonVariants } from '$lib/components/ui/button';

	let className: string = '';
	export { className as class };
	export let slice: Content.ReviewsSlice;

	$: sliders = slice.primary.reviews;

	let emblaNode: HTMLElement;
	let prevBtn: HTMLButtonElement;
	let nextBtn: HTMLButtonElement;
	let playBtn: HTMLButtonElement;
	let slideViewport: HTMLElement; 
	let emblaApi: EmblaCarouselType; 

	const OPTIONS: EmblaOptionsType = {
		// loop: true
	};
	onMount(() => {
		const viewportNodeMainCarousel = <HTMLElement>slideViewport; 

		emblaApi = EmblaCarousel(viewportNodeMainCarousel, OPTIONS, [
			Autoplay({ playOnInit: false, delay: 3000 })
		]); 

		const removePrevNextBtnClickHandlers = addPrevNextBtnsClickHandlers(emblaApi, prevBtn, nextBtn)
		const removePlayBtnListeners = addPlayBtnListeners(emblaApi, playBtn)
		const removeNavBtnListeners = addNavBtnListeners(emblaApi, prevBtn, nextBtn)

		return () => {
			emblaApi
				.on('destroy', removePrevNextBtnClickHandlers)
				.on('destroy', removePlayBtnListeners)
				.on('destroy', removeNavBtnListeners)

		};
	});
</script>

<div bind:this={emblaNode} class={cn('embla', className)}>
	<div bind:this={slideViewport} class="embla__viewport">
		<div class="embla__container !auto-cols-[95%] md:!auto-cols-[40%]">
			{#each sliders as { image, name, review }, i}
				<Card class="embla__slide flex items-center justify-center flex-col gap-6 bg-white dark:bg-primary/10 flex-grow-0 flex-shrink-0 basis-[95%] md:basis-[40%] p-4">
					<div class="flex flex-col items-center gap-2">
						{#if image.dimensions}
							<PrismicImage field={image} class="h-[100px] w-[100px] rounded-full" />
						{:else}
							<Avatar class="h-[100px] w-[100px] rounded-full" />
						{/if}
						<h2>
							<PrismicText field={name} />
						</h2>
					</div>
					<p class="px-4 md:px-6 h-[200px] overflow-auto">
						<PrismicText field={review} />
					</p>
				</Card> 
			{/each}
		</div>
	</div>
	<div class="embla__controls">
		<div class="embla__buttons">
			<button bind:this={prevBtn} class={cn("embla__button embla__button--prev", buttonVariants({ variant: "outline" }), "!rounded-full shadow-custom !bg-white dark:!bg-primary/10")} type="button">
				<svg class="embla__button__svg" viewBox="0 0 532 532">
					<path
						fill="currentColor"
						d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
					></path>
				</svg>
			</button>
			<button bind:this={nextBtn} class={cn("embla__button embla__button--next", buttonVariants({ variant: "outline" }), "!rounded-full shadow-custom !bg-white dark:!bg-primary/10")} type="button">
				<svg class="embla__button__svg" viewBox="0 0 532 532">
					<path
						fill="currentColor"
						d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
					></path>
				</svg>
			</button>
		</div>
		<button bind:this={playBtn} class={cn("embla__play", buttonVariants({ variant: "outline" }), "!rounded-full shadow-custom !bg-white dark:!bg-primary/10")} type="button">Start</button>
	</div>
</div>
