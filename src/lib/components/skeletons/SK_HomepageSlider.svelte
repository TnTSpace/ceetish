<script lang="ts">
	import Skeleton from "../ui/skeleton/skeleton.svelte";


</script>


<div class="flex flex-col gap-4">
  <Skeleton class="rounded-lg aspect-[258/285] md:aspect-video md:max-h-[500px] w-full mx-auto" />

  <div class="grid grid-cols-4 gap-4 items-center">
    <Skeleton class="aspect-square" />
    <Skeleton class="aspect-square" />
    <Skeleton class="aspect-square" />
    <Skeleton class="aspect-square" />
  </div>
</div>