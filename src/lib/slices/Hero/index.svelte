<script lang="ts">
	import Embla from '$lib/components/widgets/slider/Embla.svelte';
	import type { Content } from '@prismicio/client';

	export let slice: Content.HeroSlice;
</script>

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
	<div class="py-4 center">
		<Embla {slice} />
	</div>
</section>
