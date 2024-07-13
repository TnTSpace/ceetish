<script lang="ts">
	import { educationalTypes } from '$lib/constants';
	import { categorystore } from '$lib/stores';
	import type { EducationalDocument, SettingsDocument } from '../../../prismicio-types';
	import { Button } from '../ui/button';

	export let settings: SettingsDocument<string>;
	export let educationalDocuments: EducationalDocument[];

	const footerLinks = (type: string) => {
		return educationalDocuments.filter(
			(doc) => doc.data.type?.toLowerCase() === type.toLowerCase()
		);
	};

	$: console.log({ categories: $categorystore  })

	const srTitle = `${settings.data.site_title} homepage`;
</script>

<footer class="bg-white dark:bg-secondary py-8 flex flex-col items-center gap-4">
	<div
		aria-label="Footer"
		class="grid w-full grid-cols-1 gap-4 center sm:grid-cols-2 md:grid-cols-5"
	>
	<div>
		<h3 class="font-medium">About</h3>
		<div class="flex flex-col">
			<Button href="/educational/about#our-story" variant="link" class="flex justify-start items-center h-10 pl-0 text-muted-foreground">
				Our Story
			</Button>
			<Button href="/educational/about#our-products" variant="link" class="flex justify-start items-center h-10 pl-0 text-muted-foreground">
				Our Products
			</Button>
			<Button href="/educational/about#our-commitment" variant="link" class="flex justify-start items-center h-10 pl-0 text-muted-foreground">
				Our Commitment
			</Button>
			<Button href="/educational/about#join-us" variant="link" class="flex justify-start items-center h-10 pl-0 text-muted-foreground">
				Join Us
			</Button>
		</div>
	</div>
	<div>
		<h3 class="font-medium">About</h3>
		<div class="flex flex-col">
			{#each $categorystore as { href, name }, i}
			<Button { href } variant="link" class="flex justify-start items-center h-10 pl-0 text-muted-foreground">
				{name}
			</Button>
			{/each}
		</div>
	</div>
		{#each educationalTypes as type, i}
			<div>
				<h3 class="font-medium">{type}</h3>
				<div class="flex flex-col">
					{#each footerLinks(type) as link, i}
						<Button href={link.url} variant="link" class="flex justify-start items-center h-10 pl-0 text-muted-foreground">
							{link.data.title}
						</Button>
					{/each}
				</div>
			</div>
		{/each}
	</div>
	<hr class="dark:border-primary/10" />
	<div>© {new Date().getFullYear()} EKIDZ Academy. All rights reserved</div>
</footer>
