<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import IconPreview from '~icons/ph/eye-bold';
	import type { Content } from '@prismicio/client';

	import { PrismicImage, PrismicText } from '@prismicio/svelte';
	import { Badge } from '../ui/badge';
	import { userstore } from '$lib/stores';

	export let product: Content.ProductDocument;

	const { data } = product;
	const { name, category, age, images, description, discount, price } = data;

  $: console.log({ user: $userstore })
</script>

<Dialog.Root>
	<Dialog.Trigger class="flex items-center justify-center">
		<Button class="hidden w-full md:flex">Preview</Button>
		<Button class="md:hidden" size="icon">
			<IconPreview />
		</Button>
	</Dialog.Trigger>
	<Dialog.Content class="sm:max-w-[425px]">
		<div class="flex flex-col gap-4">
			<Dialog.Header>
				<Dialog.Title>
					<PrismicText field={name} />
				</Dialog.Title>
			</Dialog.Header>
			<div class="flex flex-col gap-4">
				<div class="relative aspect-video w-full overflow-hidden rounded-lg">
					{#each images as src, i}
						<PrismicImage
							field={src.image}
							class="absolute left-1/2 top-1/2 h-full -translate-x-1/2 -translate-y-1/2 object-cover object-center"
						/>
					{/each}
				</div>
				<div class="grid-flow-col gap-2 overflow-auto">
					{#each images as src, i}
						<Button
							class="overflow-hidde aspect-square h-14 w-14 rounded-lg overflow-hidden"
							size="icon"
							variant="ghost"
						>
							<PrismicImage field={src.image} class="h-full object-cover object-center" />
						</Button>
					{/each}
				</div>
				<div class="flex flex-col gap-2">
					<Badge class="w-fit overflow-hidden text-ellipsis whitespace-nowrap rounded-full text-xs font-medium capitalize">{category}</Badge>
          <PrismicText field={description} />
					<p>${price}</p>
				</div>
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
