<script lang="ts">
	import SK_Header from './../skeletons/SK_Header.svelte';
	import type { SettingsDocument } from '../../../prismicio-types';
	import { onMount } from 'svelte';
	import HeaderContent from './HeaderContent.svelte';

	export let settings: SettingsDocument<string>;

	let mounted = new Promise((resolve, reject) => {
		onMount(() => resolve(true));
	});
</script>

{#await mounted}
	<SK_Header />
{:then value}
	<HeaderContent {settings} />
{/await}
