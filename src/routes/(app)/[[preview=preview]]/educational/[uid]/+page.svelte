<script lang="ts">
	import { PrismicRichText, PrismicText, PrismicImage, SliceZone } from '@prismicio/svelte';

	import { components } from '$lib/slices';
	import Hero from '../components/Hero.svelte';
	import { Button } from '$lib/components/ui/button';
	import { slugify } from '$lib/common';
	import { sublineClasses } from '$lib';

	export let data;

	$: page = data.page.data;
	$: sections = page.sections;
	$: reviews = page.reviews;
</script>

<!-- <div class="bg-white dark:bg-inherit">
	<SliceZone slices={data.page.data.slices} {components} />
</div> -->

<Hero class="flex flex-col gap-4 bg-white dark:bg-secondary">
	<div class="center">
		<h2 class="text-4xl font-medium lg:text-6xl">
			<PrismicText field={page.title} />
		</h2>
		<p class="prose max-w-5xl dark:prose-invert">
			<PrismicText field={page.subline} />
		</p>
	</div>
</Hero>

<div>
	<aside
		class="sticky top-0 z-[4] flex h-14 w-full flex-nowrap items-center gap-2 overflow-auto bg-white p-2 dark:bg-secondary lg:hidden"
	>
		{#each sections as item, i}
			{#if item.title_id}
				<Button
					variant="amazonchip"
					href={`#${slugify(item.title_id)}`}
					class="!rounded-full capitalize">{item.title_id}</Button
				>
			{/if}
		{/each}
	</aside>
	<main class="my-[2rem] flex flex-wrap gap-[2rem] center">
		<section class="flex-grow-[999] basis-0">
			<div class="grid grid-cols-1 gap-4">
				{#each sections as item, i}
					{#if item.title_id}
						<div class="pb-15 prose w-full dark:prose-invert">
							<div class="h-[60px] w-full" id={slugify(item?.title_id)}></div>
							<h4 class="prose-h4 mt-0 pt-0 text-2xl font-medium">
								<PrismicText field={item.title} />
							</h4>
							<PrismicRichText field={item.body} />
						</div>
					{/if}
				{/each}
			</div>
		</section>
		<aside class="sticky top-0 hidden h-fit w-[280px] flex-grow basis-[280px] flex-col lg:flex">
			<div class="h-[60px] w-full"></div>
			{#each sections as item, i}
				{#if item.title_id}
					<Button
						variant="link"
						href={`#${slugify(item.title_id)}`}
						class="flex justify-start pl-0 capitalize text-font dark:text-primary"
						>{item.title_id}</Button
					>
				{/if}
			{/each}
		</aside>
	</main>
</div>
<div class="flex flex-col gap-4 mt-4 center">
	<h2 class={sublineClasses}>What our customers say?</h2>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each reviews as { image, review, name }, i}
			<div class="relative w-full">
				<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 flex flex-col items-center justify-center gap-2 bg-black/70 w-[90%] rounded-lg prose">
					<h3 class="text-white">
						<PrismicText field={name} />
					</h3>
					<blockquote class="text-white font-light">
						<PrismicText field={review} />
					</blockquote>
				</div>
				<PrismicImage class="object-cover w-full rounded-lg" field={image} />
			</div>
		{/each}
	</div>
</div>
