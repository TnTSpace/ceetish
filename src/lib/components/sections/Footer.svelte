<script lang="ts">
	import { educationalTypes } from '$lib/constants';
	import { categorystore } from '$lib/stores';
	import { PrismicLink, PrismicText } from '@prismicio/svelte';
	import type { EducationalDocument, SettingsDocument } from '../../../prismicio-types';
	import { Button } from '../ui/button';

	export let settings: SettingsDocument<string>;

	const links = settings.data.footer_links;
	const sections = Array.from(new Set(links.map((link) => link.section)));

	const getLinks = (section: string | null) =>
		links.filter((link) => link.section === (section as string));

	const srTitle = `${settings.data.site_title} homepage`;
</script>

<footer class="flex flex-col items-center gap-4 bg-white py-8 dark:bg-secondary">
	<div
		aria-label="Footer"
		class="grid w-full grid-cols-1 gap-4 center md:px-0 sm:grid-cols-2 md:grid-cols-4">
		{#each sections as section, i}
			<div>
				<h3 class="font-medium">
					{section}
				</h3>
				<div class="flex flex-col">
					{#each getLinks(section) as item, i}
						<Button
							variant="link"
							class="flex h-10 items-center justify-start pl-0 text-muted-foreground relative">
							<PrismicLink class="w-full h-full absolute z-[1]" field={item.link} />
							<PrismicText field={item.name} />
						</Button>
					{/each}
				</div>
			</div>
		{/each}
	</div>
	<hr class="dark:border-primary/10" />
	<div>© {new Date().getFullYear()} Ceetish Luxury Hair. All rights reserved</div>
</footer>
