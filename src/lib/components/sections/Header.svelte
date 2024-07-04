<script lang="ts">
	import type { SettingsDocument } from '../../../prismicio-types';
	import { PrismicLink } from '@prismicio/svelte';
	import Logo from '../icons/Logo.svelte';
	import { asLink, type LinkField } from '@prismicio/client';
	import { page } from '$app/stores';
	import { Input } from '../ui/input';

	import { User } from 'lucide-svelte';
	import { ShoppingCart } from 'lucide-svelte';
	import { SearchIcon } from 'lucide-svelte';
	import { Button } from '../ui/button';
	import UserButton from 'clerk-sveltekit/client/UserButton.svelte';
	import SignedIn from 'clerk-sveltekit/client/SignedIn.svelte';
	import SignedOut from 'clerk-sveltekit/client/SignedOut.svelte';
	import ModeToggle from '../widgets/ModeToggle.svelte';
	import { userstore, cartstore } from '$lib/stores';
	import { Badge } from '../ui/badge';

	export let settings: SettingsDocument<string>;

	const srTitle = `${settings.data.site_title} homepage`;

	let isOpen = false;

	const getUser = (user: any) => {
		$userstore = user;
		return '';
	};

	const toggleOpen = () => (isOpen = !isOpen);
	const close = () => (isOpen = false);

	const isActive = (link: LinkField) => {
		const path = asLink(link);
		return path && $page.url.pathname.includes(path);
	};
</script>

<header class="sticky left-0 top-0 z-[3] bg-white dark:bg-secondary">
	<nav
		aria-label="Main"
		class="mx-auto flex items-center justify-between px-2 py-2 font-medium center"
	>
		<div class="flex items-center gap-4">
			<Logo {srTitle} on:click={close} class="z-50" />

			<div class="relative hidden md:block">
				<Button size="icon" variant="ghost" class="absolute right-0 top-1/2 -translate-y-1/2">
					<SearchIcon class="h-4 w-4" />
				</Button>
				<Input placeholder="Your search begins here" name="search" class="w-full pr-12" />
			</div>
		</div>

		<div class="flex items-center gap-2">
			<ul class="hidden gap-6 md:flex items-center">
				{#each settings.data.navigation as item (item.label)}
					<li>
						<PrismicLink
							field={item.link}
							aria-current={isActive(item.link) ? 'page' : undefined}
						>
							{item.label}
						</PrismicLink>
					</li>
				{/each}
			</ul>
			<Button size="icon" variant="outline" class="relative">
				{#if $cartstore}
					<span
						class="absolute right-0 top-0 flex h-4 w-4 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full text-xs font-black"
						>{Object.keys($cartstore).length}</span
					>
				{/if}
				<ShoppingCart class="h-4 w-4" />
			</Button>
			<div>
				<SignedIn let:user>
					<pre>{getUser(user)}</pre>
					<UserButton afterSignOutUrl="/" />
				</SignedIn>
				<SignedOut>
					<Button size="icon" variant="outline" href="/sign-in">
						<User class="h-4 w-4" />
					</Button>
				</SignedOut>
			</div>
			<ModeToggle class="hidden items-center justify-center md:flex" />
		</div>
	</nav>
</header>
