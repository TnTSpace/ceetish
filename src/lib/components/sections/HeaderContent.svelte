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
	import { getTotalCartItems } from '$lib/common/products';
	import { btnClasses } from '$lib/constants'; 
	import { onMount } from 'svelte';
	import Skeleton from '../ui/skeleton/skeleton.svelte';
	import SearchFilter from '../widgets/filters/SearchFilter.svelte';

	export let settings: SettingsDocument<string>;

	const srTitle = `${settings.data.site_title} homepage`;

	let isOpen = false;

	const getUser = (user: any) => {
		$userstore = user;
		return '';
	};
	const close = () => (isOpen = false);

	const isActive = (link: LinkField) => {
		const path = asLink(link);
		return path && $page.url.pathname.includes(path);
	};

	$: count = $cartstore ? getTotalCartItems($cartstore) : 0

  let mounted = new Promise((resolve, reject) => {
		onMount(() => {
      setTimeout(() => {
        resolve(true)
      }, 2000);
    });
	});
</script>


<header class="sticky left-0 top-0 z-[3] bg-white dark:bg-secondary">
	<nav
		aria-label="Main"
		class="mx-auto flex items-center justify-between px-2 py-2 font-medium center"
	>
		<div class="flex items-center gap-4">
			<Logo {srTitle} on:click={close} class="z-50" />

			<SearchFilter class="hidden md:block" />
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
			<Button size="icon" variant="outline" class="relative amazonchip dark:border-none dark:bg-primary/10" href="/cart">
				{#if $cartstore}
					<span
						class="absolute right-0 top-0 flex h-4 w-4 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full text-xs font-black"
						>{count}</span
					>
				{/if}
				<ShoppingCart class="h-4 w-4" />
			</Button>
			<div>
				<SignedIn let:user>
          <div class="w-9 h-9">
            <pre>{getUser(user)}</pre>
            <UserButton afterSignOutUrl="/" />
          </div>
				</SignedIn>
				<SignedOut>
					<Button size="icon" variant="outline" href="/sign-in" class={btnClasses}>
						<User class="h-4 w-4" />
					</Button>
				</SignedOut>
			</div>
			<ModeToggle class="hidden items-center justify-center md:flex" />
		</div>
	</nav>
</header>
