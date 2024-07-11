<script lang="ts">
	import type { iCart } from '$lib';
	import { cartstore } from '$lib'; 
	import { userstore } from '$lib';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
	import { getCart } from '$lib/common/cart';
	
	$: $userstore && getCart($userstore.emailAddresses[0].emailAddress, cartstore)

	$: console.log({ cartstore: $cartstore })
	
</script>

<ModeWatcher />
<Toaster />
<main>
	<slot />
</main>
