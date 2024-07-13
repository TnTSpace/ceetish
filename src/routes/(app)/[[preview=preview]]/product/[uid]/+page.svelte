<script lang="ts">
	import Policies from '$lib/components/widgets/Policies.svelte';
	import { sublineClasses } from '$lib';
	import { highlightClasses } from '$lib'; 
	import { PrismicText, SliceZone, PrismicRichText } from '@prismicio/svelte';

	import { components } from '$lib/slices';
	import EmblaProduct from '$lib/components/widgets/product-pictures/EmblaProduct.svelte';
	import { page } from '$app/stores';
	import type { SettingsDocument } from '../../../../../prismicio-types.js';

	export let data;
	
	const { name, category,  description, price, details } = data.page.data

	$: images = data.page.data.images.map(field => field.image)

	const settings = $page.data.settings as SettingsDocument
	const policies = settings.data.policies
	
</script>

<div class="flex flex-col gap-4 center">
	<div class="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4">
		<div class="w-full">
			<EmblaProduct { images } />
		</div>
		<div class="flex flex-col gap-2">
			<h1 class="font-medium">
				{name} 
			</h1>
			<p class="text-muted-foreground">
				<PrismicText field={description} />
			</p>
			<div class="prose dark:prose-invert">
				<PrismicRichText field={details} />
			</div>
		</div>
	</div>
	<Policies />
</div>
