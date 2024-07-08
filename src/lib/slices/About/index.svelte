<script lang="ts">
	import LogoIcon from '$lib/components/icons/LogoIcon.svelte';
	import { sublineClass } from '$lib/constants';
	import type { Content } from '@prismicio/client';
	import { PrismicLink, PrismicRichText, PrismicText } from '@prismicio/svelte';

	export let slice: Content.AboutSlice;
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} class="center">
	<div class="p-4 bg-primary/50  border-l-primary border-l-4 flex flex-col gap-4">
		<div class="flex items-center gap-2">
			<LogoIcon />
			<h2 class={sublineClass}>
				<PrismicText field={slice.primary.title} />
			</h2>
		</div>
		<PrismicRichText field={slice.primary.body} />
		<PrismicLink class="bg-white dark:bg-font py-2 px-4 w-full text-center md:w-fit rounded-lg" field={slice.primary.cta_link}>{slice.primary.cta_label}</PrismicLink>
	</div>
</section>