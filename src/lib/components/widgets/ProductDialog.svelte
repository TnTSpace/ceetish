<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Eye as IconPreview } from 'lucide-svelte';
	import type { Content } from '@prismicio/client';

	import { PrismicImage, PrismicText } from '@prismicio/svelte';
	import { Badge } from '../ui/badge';
	import { userstore } from '$lib/stores';
	import EmblaProduct from './product-pictures/EmblaProduct.svelte';

	export let product: Content.ProductDocument;

	const { data } = product;
	const { name, category,  images, description, price } = data;

	const emblaImages = images.map(field => field.image)
	
	let className: string = ""
	export { className as class }
</script>

<Dialog.Root>
	<Dialog.Trigger class="flex items-center justify-center"> 
		<Button size="icon" class={className}>
			<IconPreview class="w-4 h-4" />
		</Button>
	</Dialog.Trigger>
	<Dialog.Content class="md:max-w-2xl mx-auto w-[calc(100%-32px)]">
		<div class="flex flex-col gap-4">
			<Dialog.Header>
				<Dialog.Title>
					{name}
				</Dialog.Title>
			</Dialog.Header>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<EmblaProduct images={emblaImages} />
				<div class="flex flex-col gap-2">
					<Badge class="w-fit overflow-hidden text-ellipsis whitespace-nowrap rounded-full text-xs font-medium capitalize">{category}</Badge>
          <PrismicText field={description} />
					<p>${price}</p>
				</div>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
