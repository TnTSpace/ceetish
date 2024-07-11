<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { cn } from "$lib/utils";
  import { X } from "lucide-svelte"
  import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { capitalize } from "$lib/common";

  interface iKeyVal {
    key: string;
    value: string;
  }

	let className: string = ""
	export { className as class }

  let params: iKeyVal[] = []

  $: params = params
  $: console.log({ params })

  const removeParam = (key: string) => {
    $page.url.searchParams.delete(key)
    location.href = $page.url.toString()
  }

  onMount(() => {
    const entries = $page.url.searchParams.entries()
    const jsonEntries = Object.fromEntries(entries)
    params = Object.keys(jsonEntries).map(key => ({ key, value: capitalize(`${key}: ${jsonEntries[key]}`) }))
  })

</script>

<div class={cn("grid grid-flow-col auto-cols-max overflow-auto gap-2 py-2 w-full md:w-fit", className)}>
  {#each params as item (item.key)}
  <Button on:click={() => removeParam(item.key)} variant="amazonchipfilter" class="flex items-center gap-2 bg-white dark:bg-secondary/5">
    <span>{item.value}</span>
    <X class="w-4 h-4" />
  </Button>
  {/each}
</div>
