<script>
	import Header from '$lib/components/sections/Header.svelte';
	// import Footer from '$lib/components/Footer.svelte';
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import { page } from '$app/stores';
	import { repositoryName } from '$lib/prismicio';
	import FloatingBottomBar from '$lib/components/sections/FloatingBottomBar.svelte';

</script>

<svelte:head>
	<title>Cart | Ceetish</title>
	<meta name="description" content="100% raw virgin hair. Luxury human hair and synthetic wigs as well as quality hair bundles" />
	<meta property="twitter:description" content="100% raw virgin hair. Luxury human hair and synthetic wigs as well as quality hair bundles" />
	<meta name="og:title" content="Cart | Ceetish" />
	<meta property="twitter:title" content="Cart | Ceetish" /> 
	<meta name="twitter:card" content="summary_large_image" /> 
</svelte:head>

<Header settings={$page.data.settings} />
<main>
	<slot/>
</main>

<FloatingBottomBar />
<PrismicPreview {repositoryName}></PrismicPreview>
