<script lang="ts">
	import type { ImageFieldImage } from '@prismicio/client';
	import { PrismicText, SliceZone, PrismicImage } from '@prismicio/svelte';

	import { components } from '$lib/slices';
	import Bounded from '$lib/components/widgets/Bounded.svelte';
	import TriangleGrid from '$lib/components/widgets/TriangleGrid.svelte';
	import EmblaProduct from '$lib/components/widgets/product-pictures/EmblaProduct.svelte';

	export let data;

	$: images = data.page.data.images.map(field => field.image)
</script>

<Bounded>
	<div class="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4">
		<div class="w-full">
			<EmblaProduct { images } />
		</div>
		<div class="flex flex-col gap-2">
			<h1 class="font-medium">
				{data.page.data.name} 
			</h1>
			<p class="text-muted-foreground">
				<PrismicText field={data.page.data.description} />
			</p>
		</div>
	</div>
	<div class="">
		<SliceZone slices={data.page.data.slices} {components} />
	</div>
</Bounded>
