<script lang="ts">
	import Skeleton from '../ui/skeleton/skeleton.svelte';
</script>

<div class="flex flex-col gap-4">
	<div class="grid auto-cols-[95%] grid-flow-col gap-4 md:auto-cols-[40%]">
		<div
			class="flex flex-shrink-0 flex-grow-0 basis-[95%] flex-col items-center justify-center gap-6 bg-white p-4 dark:bg-primary/10 md:basis-[40%] rounded-lg"
		>
			<div class="flex flex-col items-center gap-2">
				<Skeleton class="h-[100px] w-[100px] rounded-full" />
				<Skeleton class="h-4 w-36 md:w-full" />
			</div>
			<div class="flex w-full h-[200px] items-center flex-col gap-2 px-4 md:px-6">
				<Skeleton class="h-4 w-3/4" />
				<Skeleton class="h-4 w-full" />
				<Skeleton class="h-4 w-3/4" />
			</div>
		</div>
		<div
			class="flex flex-shrink-0 flex-grow-0 basis-[95%] flex-col items-center justify-center gap-6 bg-white p-4 dark:bg-primary/10 md:basis-[40%] rounded-lg"
		>
			<div class="flex flex-col items-center gap-2">
				<Skeleton class="h-[100px] w-[100px] rounded-full" />
				<Skeleton class="h-4 w-36 md:w-full" />
			</div>
			<div class="flex w-full items-center h-[200px] flex-col gap-2 px-4 md:px-6">
				<Skeleton class="h-4 w-3/4" />
				<Skeleton class="h-4 w-full" />
				<Skeleton class="h-4 w-3/4" />
			</div>
		</div>
		<div
			class="flex flex-shrink-0 flex-grow-0 basis-[95%] flex-col items-center justify-center gap-6 bg-white p-4 dark:bg-primary/10 md:basis-[40%] rounded-lg"
		>
			<div class="flex flex-col items-center gap-2">
				<Skeleton class="h-[100px] w-[100px] rounded-full" />
				<Skeleton class="h-4 w-36 md:w-full" />
			</div>
			<div class="flex w-full items-center h-[200px] flex-col gap-2 px-4 md:px-6">
				<Skeleton class="h-4 w-3/4" />
				<Skeleton class="h-4 w-full" />
				<Skeleton class="h-4 w-3/4" />
			</div>
		</div>
		<div
			class="flex flex-shrink-0 flex-grow-0 basis-[95%] flex-col items-center justify-center gap-6 bg-white p-4 dark:bg-primary/10 md:basis-[40%] rounded-lg"
		>
			<div class="flex flex-col items-center gap-2">
				<Skeleton class="h-[100px] w-[100px] rounded-full" />
				<Skeleton class="h-4 w-36 md:w-full" />
			</div>
			<div class="flex w-full items-center h-[200px] flex-col gap-2 px-4 md:px-6">
				<Skeleton class="h-4 w-3/4" />
				<Skeleton class="h-4 w-full" />
				<Skeleton class="h-4 w-3/4" />
			</div>
		</div>
	</div>

	<div class="mt-[1.8rem] grid grid-cols-[auto_1fr] justify-between gap-[1.2rem]">
		<div class="flex items-center gap-4">
			<Skeleton class="aspect-square h-10 w-10 rounded-full" />
			<Skeleton class="aspect-square h-10 w-10 rounded-full" />
		</div>
		<Skeleton class="aspect-square h-10 w-[63px] rounded-full place-self-end" />
	</div>
</div>
