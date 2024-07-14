<script lang="ts"> 
	import { highlightClasses, sublineClasses } from '$lib/constants';
	import { cn } from '$lib/utils';
	import type { Content } from '@prismicio/client';
	import { PrismicText } from '@prismicio/svelte'; 
	import NewsletterForm from './NewsletterForm.svelte';

	export let slice: Content.NewsletterSlice;

	const buttonLabel = slice.primary.button_label
	
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="center md:px-0">
		<div class={cn(highlightClasses, "grid grid-cols-1 md:grid-cols-[3fr_1fr] items-center")}>
			<h2 class={cn(sublineClasses, "text-start md:!text-5xl")}>
				<PrismicText field={slice.primary.title} />
			</h2>
			<NewsletterForm { buttonLabel } />
		</div>
	</div>
</section>
