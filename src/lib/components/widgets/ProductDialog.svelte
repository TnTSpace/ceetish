<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Eye as IconPreview } from 'lucide-svelte';
	import type { Content } from '@prismicio/client';

	import { PrismicImage, PrismicRichText, PrismicText } from '@prismicio/svelte';
	import { Badge } from '../ui/badge';
	import { userstore } from '$lib/stores';
	import EmblaProduct from './product-pictures/EmblaProduct.svelte';
	import { priceClass } from '$lib/constants';
	import { cn } from '$lib/utils';

	export let product: Content.ProductDocument;

	const { data } = product;
	const { name, category,  images, description, price, details } = data;

	const emblaImages = images.map(field => field.image)
	
	let className: string = ""
	export { className as class }
</script>

<Dialog.Root>
	<Dialog.Trigger class={cn("flex items-center justify-center", className)}> 
		<Button aria-label={name} size="icon" class="bg-pri text-font hover:bg-pri">
			<IconPreview class="w-4 h-4" />
		</Button>
	</Dialog.Trigger>
	<Dialog.Content class="md:max-w-2xl mx-auto w-[calc(100%-32px)] bg-white/80 dark:bg-primary/10">
		<div class="flex flex-col gap-4">
			<Dialog.Header>
				<Dialog.Title>
					{name}
				</Dialog.Title>
			</Dialog.Header>
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<EmblaProduct images={emblaImages} />
				<Badge class="md:hidden w-fit h-fit overflow-hidden text-ellipsis whitespace-nowrap rounded-full text-xs font-medium capitalize">{category}</Badge>
				<div class="flex flex-col gap-2 h-[120px] md:h-auto overflow-auto">
					<Badge class="hidden md:inline-block w-fit h-fit overflow-hidden text-ellipsis whitespace-nowrap rounded-full text-xs font-medium capitalize">{category}</Badge>
          <p class="text-muted-foreground text-sm">
						<PrismicText field={description} />
					</p>
					<p class={priceClass}>${price}</p>
					<div class="prose dark:prose-invert">
						<PrismicRichText field={details} />
					</div>
				</div>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
