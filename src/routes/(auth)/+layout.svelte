<script>
	import { ModeWatcher } from 'mode-watcher';
</script>

<svelte:head>
	<title>Sign In</title>
	<meta name="description" content="Sign in to Ceetish" />
	<meta name="og:title" content="Sign in" />
	<meta
		name="og:image"
		content="https://images.prismic.io/ekidz/ZmwsMZm069VX1wUE_OgImage_2200x1237.webp?auto=format%2Ccompress&rect=0%2C41%2C2200%2C1155&w=2400&h=1260"
	/>
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<ModeWatcher />
<main class="flex h-[100vh] w-full items-center justify-center">
	<slot />
</main>
