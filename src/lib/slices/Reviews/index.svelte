<script lang="ts">
	import Embla from '$lib/components/widgets/review-carousel/Embla.svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicText } from '@prismicio/svelte';

	export let slice: Content.ReviewsSlice;
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="overflow-hidden py-0 center flex flex-col gap-4">
		<h2 class="text-xl md:text-3xl font-medium text-center">
			<PrismicText field={slice.primary.title} />
		</h2>
		<Embla {slice} />
	</div>
</section>
