<script lang="ts">
	import Skeleton from '../ui/skeleton/skeleton.svelte';

</script>

<div class="flex flex-col gap-2 overflow-hidden rounded-lg p-2 shadow-custom bg-white dark:bg-primary/10">
	<div class="grid grid-cols-[1fr_2fr] gap-2">
		<div class="relative aspect-square w-full overflow-hidden">
      <Skeleton class="absolute left-1/2 top-1/2 aspect-auto h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-md object-cover" />
    </div>
		<div class="flex h-full w-full flex-col justify-between overflow-hidden text-ellipsis">
			<div class="flex flex-col gap-1">
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-8 w-3/4" />
			</div>
      <Skeleton class="h-6 w-1/4" />
		</div>
	</div>
	<hr class="dark:border-primary/20" />
	<div aria-label="details" class="flex flex-col gap-2">
		<div class="flex items-center justify-between w-full">
      <Skeleton class="h-9 w-9" />
			<div class="flex items-center gap-2">
        <Skeleton class="h-9 w-24" />
			</div>
		</div>
	</div>
</div>
