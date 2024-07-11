<script lang="ts">
	import Skeleton from '../ui/skeleton/skeleton.svelte';
</script>

<div class="flex flex-col gap-4">
	<Skeleton
		class="mx-auto hidden aspect-[258/285] w-full rounded-lg md:flex md:aspect-[16/6] md:h-[425px] md:max-h-[500px]"
	/>
	<div class="flex flex-col md:hidden">
		<Skeleton
			class="w-full aspect-video"
		/>
    <Skeleton class="w-full aspect-[259/80] max-h-[80px]" />
	</div>

	<div class="flex justify-start items-center gap-4">
		<Skeleton class="aspect-square w-20" />
		<Skeleton class="aspect-square w-20" />
		<Skeleton class="aspect-square w-20" />
		<Skeleton class="aspect-square w-20" />
	</div>
</div>
