<script lang="ts">
	import Skeleton from '../ui/skeleton/skeleton.svelte';
</script>

<header class="sticky left-0 top-0 z-[3] bg-white dark:bg-secondary">
	<nav
		aria-label="Main"
		class="mx-auto flex h-14 items-center justify-between px-2 font-medium center"
	>
		<div class="flex items-center gap-4">
			<Skeleton class="h-10 w-[108px]" />

			<Skeleton class="hidden h-9 w-[225px] md:flex" />
		</div>

		<div class="flex items-center gap-2">
			<Skeleton class="hidden h-5 w-[57px] md:flex" />
			<Skeleton class="hidden h-5 w-[57px] md:flex" />
			<Skeleton class="hidden h-5 w-[57px] md:flex" />
			<Skeleton class="hidden h-5 w-[57px] md:flex" />
			<Skeleton class="h-9 w-9" />
			<Skeleton class="h-9 w-9" />
			<Skeleton class="hidden h-9 w-9 md:flex" />
		</div>
	</nav>
</header> 
