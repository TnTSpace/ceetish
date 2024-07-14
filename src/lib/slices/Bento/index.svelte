<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicImage, PrismicLink, PrismicText } from '@prismicio/svelte';

	export let slice: Content.BentoSlice;

</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-primary/10">
		{#each slice.primary.categories as category, i}
			<div class="relative bg-white shadow-custom rounded-lg overflow-hidden w-full aspect-[16/9] sm:aspect-square">
				<PrismicLink field={category.link} class="absolute top-0 left-0 w-full h-full z-[2]" />
				<h2 class="p-4 bg-black/70 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] font-semibold w-fit whitespace-nowrap">
					<PrismicText field={category.name} />
				</h2>
				<PrismicImage class="object-cover w-full absolute top-0 left-1/2 -translate-x-1/2" field={category.image} />
			</div>
		{/each}
	</div>
</section>
