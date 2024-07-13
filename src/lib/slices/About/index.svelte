<script lang="ts">
	import { highlightClasses } from '$lib';
	import LogoIcon from '$lib/components/icons/LogoIcon.svelte';
	import { sublineClasses } from '$lib/constants';
	import { cn } from '$lib/utils';
	import type { Content } from '@prismicio/client';
	import { PrismicLink, PrismicRichText, PrismicText } from '@prismicio/svelte';

	export let slice: Content.AboutSlice;
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class="center">
	<div class={highlightClasses}>
		<div class="flex items-center gap-2">
			<LogoIcon />
			<h2 class={cn(sublineClasses, "text-start")}>
				<PrismicText field={slice.primary.title} />
			</h2>
		</div>
		<PrismicRichText field={slice.primary.body} />
		<PrismicLink class="bg-white dark:bg-font py-2 px-4 w-full text-center md:w-fit rounded-lg" field={slice.primary.cta_link}>{slice.primary.cta_label}</PrismicLink>
	</div>
</section>