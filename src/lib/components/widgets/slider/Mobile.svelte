<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText, PrismicText, PrismicImage } from '@prismicio/svelte';
	import Heading1 from './Heading1.svelte';
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import { initEmbla } from './scripts';
  import "./css/base.css"
  import "./css/embla.css" 

	export let slice: Content.HeroSlice;

	$: sliders = slice.primary.sliders;

  let className: string = ""

  export { className as class }

  onMount(() => initEmbla("mobile"))
</script>

<div class={cn("embla", className)}>
	<div class="embla__viewport">
		<div class="embla__container">
			{#each sliders as slider, i}
				<div
					aria-label="mobile"
					class="embla__slide relative w-full overflow-hidden rounded-lg bg-secondary"
				>
					<div class="aspect-video w-full relative overflow-hidden">
						<PrismicImage
							field={slider.image}
							class="absolute w-full aspect-auto"
						/>
					</div>
					<div class="flex w-full flex-col items-center justify-center gap-8 mt-4">
						<div class="flex flex-col w-full">
							<PrismicRichText field={slider.title} components={{ heading1: Heading1 }} />
							<p>
								<PrismicText field={slider.subline} />
							</p>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="embla-thumbs">
		<div class="embla-thumbs__viewport">
			<div class="embla-thumbs__container">
				{#each sliders as slider, i}
					<div
						class="embla-thumbs__slide embla-thumbs__slide--selected aspect-square overflow-hidden rounded-2xl"
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
