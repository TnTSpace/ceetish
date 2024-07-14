<script lang="ts">
	import Skeleton from '../ui/skeleton/skeleton.svelte';

</script>

<header class="sticky left-0 top-0 z-[3] bg-white dark:bg-secondary">
	<nav
		aria-label="Main"
		class="mx-auto flex items-center justify-between px-2 h-14 font-medium center"
	>
		<div class="flex items-center gap-4">
      <Skeleton class="w-[108px] h-10" />

      <Skeleton class="w-[225px] h-9 hidden md:flex" />
		</div>

		<div class="flex items-center gap-2">
      <Skeleton class="w-[57px] h-5 hidden md:flex" />
      <Skeleton class="w-[57px] h-5 hidden md:flex" />
      <Skeleton class="w-[57px] h-5 hidden md:flex" />
      <Skeleton class="w-[57px] h-5 hidden md:flex" />
      <Skeleton class="w-9 h-9" />
      <Skeleton class="w-9 h-9" />
      <Skeleton class="w-9 h-9 hidden md:flex" />
		</div>
	</nav>
</header>
