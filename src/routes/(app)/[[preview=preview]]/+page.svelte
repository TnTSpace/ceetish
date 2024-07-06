<script>
	import { SliceZone } from '@prismicio/svelte';

	import { components } from '$lib/slices';
	import { page } from '$app/stores';

	export let data;

</script>

<SliceZone slices={data.page.data.slices} {components} />
