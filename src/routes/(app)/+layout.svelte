<script>
	import Header from '$lib/components/sections/Header.svelte';
	import Footer from '$lib/components/sections/Footer.svelte';
	// import Footer from '$lib/components/Footer.svelte';
	import { PrismicPreview } from '@prismicio/svelte/kit';
	import { page } from '$app/stores';
	import { repositoryName } from '$lib/prismicio';
	import FloatingBottomBar from '$lib/components/sections/FloatingBottomBar.svelte';

</script>

<svelte:head>
	<title>{$page.data.title}</title>
	{#if $page.data.meta_description}
		<meta name="description" content={$page.data.meta_description} />
		<meta property="twitter:description" content={$page.data.meta_description} />
	{/if}
	{#if $page.data.meta_title}
		<meta name="og:title" content={$page.data.meta_title} />
		<meta property="twitter:title" content={$page.data.meta_title} />
	{/if}
	{#if $page.data.meta_image}
		<meta name="og:image" content={$page.data.meta_image} />
		<meta name="twitter:card" content="summary_large_image" />
		<meta property="twitter:image" content={$page.data.meta_image} />
	{/if}
</svelte:head>

<Header settings={$page.data.settings} />
<main>
	<slot/>
</main>
<!-- <Footer
	settings={$page.data.settings}
	educationalDocuments={$page.data.educationalDocuments} /> -->

<FloatingBottomBar />
<PrismicPreview {repositoryName}></PrismicPreview>
