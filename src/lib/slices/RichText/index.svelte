<script lang="ts">
	import { PrismicLink } from '@prismicio/svelte';
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import Label from './Label.svelte';
	import { page } from '$app/stores';
	import ContactForm from '$lib/components/widgets/ContactForm.svelte';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '$lib/components/ui/button';

	export let slice: Content.RichTextSlice;

	const isContact = $page.url.pathname === '/contact';
	const channels = slice.primary.channels;
</script>

<section>
	<div class="grid grid-cols-1 gap-4 center md:grid-cols-2 md:px-0">
		<div class="prose dark:prose-invert">
			<PrismicRichText
				field={slice.primary.content}
				components={{
					label: Label
				}}
			/>
			<div class="flex flex-col gap-2">
				{#each channels as channel, i}
					<PrismicLink field={channel.url} class={cn(buttonVariants({ variant: "default" }), "no-underline w-full md:w-fit")}>
						{channel.name}
					</PrismicLink>
				{/each}
			</div>
		</div>
		<ContactForm />
	</div>
</section>
