<script lang="ts">
	import { cn } from '$lib/utils';
	import Skeleton from '../ui/skeleton/skeleton.svelte';

	let className: string = '';

	export { className as class };
</script>

<div
	class={cn(
		'flex flex-col gap-2 overflow-hidden rounded-lg bg-white p-2 shadow-custom dark:bg-primary/10',
		className
	)}
>
	<div class="grid grid-cols-[1fr_2fr] gap-2">
		<div class="relative aspect-square w-full overflow-hidden">
			<Skeleton
				class="absolute left-1/2 top-1/2 aspect-auto h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-md object-cover"
			/>
		</div>
		<div class="flex h-full w-full flex-col justify-between overflow-hidden text-ellipsis">
			<div class="flex flex-col gap-1">
				<Skeleton class="h-4 w-full" />
				<Skeleton class="h-8 w-3/4" />
			</div>
			<div class="flex items-center gap-1">
				<Skeleton class="h-6 w-1/4" />
				<Skeleton class="h-4 w-1/5" />
			</div>
		</div>
	</div>
	<hr class="dark:border-primary/20" />
	<div aria-label="details" class="flex flex-col gap-2">
		<div class="flex w-full items-center justify-between">
			<Skeleton class="h-9 w-9" />
			<div class="flex items-center gap-2">
				<Skeleton class="h-9 w-24" />
			</div>
		</div>
	</div>
</div>
