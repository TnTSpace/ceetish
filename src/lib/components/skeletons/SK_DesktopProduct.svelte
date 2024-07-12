<script lang="ts">
	import { cn } from '$lib/utils';
	import Skeleton from '../ui/skeleton/skeleton.svelte';

	let className: string = '';

	export { className as class };
</script>

<div
	class={cn(
		'relative flex w-full flex-col justify-between gap-2 overflow-hidden rounded-lg border border-opacity-10 bg-white shadow dark:bg-primary/10',
		className
	)}
>
	<div class="flex flex-col">
		<Skeleton class="relative aspect-square w-full overflow-hidden" />

		<div aria-label="details" class="flex flex-col gap-2 p-4 pb-0">
			<Skeleton class="h-6 overflow-hidden twolines md:text-ellipsis md:whitespace-nowrap" />
			<Skeleton class="h-10 overflow-hidden twolines md:text-ellipsis md:whitespace-nowrap" />

			<div class="flex items-center gap-1">
				<Skeleton class="h-6 w-1/4" />
				<Skeleton class="h-4 w-1/5" />
			</div>
		</div>
	</div>
	<div
		class="mx-auto flex w-full items-center justify-between gap-2 border-t p-2 dark:border-primary/20"
	>
		<Skeleton class="h-9 w-9" />

		<Skeleton class="h-9 w-1/2" />
	</div>
</div>
