<script lang="ts">
	import { sublineClasses, highlightClasses } from '$lib/constants';
	import type { Content } from '@prismicio/client';
	import { PrismicText, PrismicRichText, PrismicLink } from '@prismicio/svelte';
	import { cn } from '$lib/utils';

	export let slice: Content.PerksSlice;

	console.log(slice.primary.perks)
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:px-0">
		{#each slice.primary.perks as perk, i}
			<div class={highlightClasses}>
				<div class="flex items-center gap-2">
					<h2 class={cn(sublineClasses, 'text-start md:text-xl')}>
						{perk.name}
					</h2>
				</div>
				<p>
					<PrismicRichText field={perk.description} />
				</p>
			</div>
		{/each}
	</div>
</section>
