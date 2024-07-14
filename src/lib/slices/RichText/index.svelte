<script lang="ts">
	import type { Content } from '@prismicio/client';
	import { PrismicRichText } from '@prismicio/svelte';
	import Label from './Label.svelte';
	import { page } from '$app/stores';
	import ContactForm from '$lib/components/widgets/ContactForm.svelte';

	export let slice: Content.RichTextSlice;
	
	const isContact = $page.url.pathname === '/contact'
</script>

<section>

	<div class="grid grid-cols-1 md:grid-cols-2 gap-4 center md:px-0">
		<div class="prose dark:prose-invert">
			<PrismicRichText
			field={slice.primary.content}
			components={{
				label: Label
			}}
		/>
		</div>
		<ContactForm />
	</div>
</section>