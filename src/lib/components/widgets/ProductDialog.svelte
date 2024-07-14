<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Eye as IconPreview } from 'lucide-svelte';
	import type { Content } from '@prismicio/client';

	import { PrismicRichText, PrismicText } from '@prismicio/svelte';
	import { Badge } from '../ui/badge';
	import EmblaProduct from './product-pictures/EmblaProduct.svelte';
	import { badgeClasses, badgeLinkClasses, priceClass, sublineClasses } from '$lib/constants';
	import { cn } from '$lib/utils';
	import { paramify } from '$lib/common';

	export let product: Content.ProductDocument;

	const { data } = product;
	const { name, category, images, description, price, details } = data;

	const emblaImages = images.map((field) => field.image);

	let className: string = '';
	export { className as class };
</script>

<Dialog.Root>
	<Dialog.Trigger class={cn('flex items-center justify-center', className)}>
		<Button aria-label={name} size="icon" class="bg-pri text-font hover:bg-pri">
			<IconPreview class="h-4 w-4" />
		</Button>
	</Dialog.Trigger>
	<Dialog.Content class="mx-auto w-[calc(100%-32px)] bg-white/80 dark:bg-primary/10 md:max-w-2xl">
		<div class="flex flex-col gap-4">
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
				<div>
					<EmblaProduct images={emblaImages} />

					<div class="md:hidden">
						<Button
							variant="ghost"
							class={badgeLinkClasses}
							href={`/catalog?category=${paramify(category)}`}
						>
							<Badge class={badgeClasses}>{category}</Badge>
						</Button>
						<h2 class="font-semibold">{name}</h2>
						<p class={priceClass}>${price}</p>

						<p class="text-sm text-muted-foreground">
							<PrismicText field={description} />
						</p>
					</div>
				</div>
				<div class="flex flex-col gap-4">
					<div class="hidden md:block">
						<Button
							variant="ghost"
							class={badgeLinkClasses}
							href={`/catalog?category=${paramify(category)}`}
						>
							<Badge class={badgeClasses}>{category}</Badge>
						</Button>
						<h2 class="font-semibold">{name}</h2>
						<p class={priceClass}>${price}</p>

						<p class="text-sm text-muted-foreground">
							<PrismicText field={description} />
						</p>
					</div>
					<div
						class="prose hidden h-[243px] flex-col overflow-auto dark:prose-invert md:flex"
					>
						<PrismicRichText field={details} />
					</div>
				</div>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
