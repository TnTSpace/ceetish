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

  let className: string

  export { className as class }
  onMount(() => initEmbla("desktop"))
</script>

<div class={cn("embla", className)}>
	<div class="embla__viewport">
		<div class="embla__container">
			{#each sliders as slider, i}
				<div
					aria-label="desktop"
					class="embla__slide relative hidden aspect-video max-h-[500px] w-full overflow-hidden rounded-lg bg-secondary md:block md:aspect-[16/6]"
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
