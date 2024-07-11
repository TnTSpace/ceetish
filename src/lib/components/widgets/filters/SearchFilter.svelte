<script lang="ts">
	import { page } from "$app/stores";
	import { eFilters } from "$lib/constants";
	import { cn } from "$lib/utils";
	import { SearchIcon } from "lucide-svelte";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
	import { onMount } from "svelte";

  let className: string = ""

  export { className as class }

  let search = ""

  $: search = search

  const onSubmit = (evt: SubmitEvent) => {
    evt.preventDefault()
    const form = evt.target as HTMLFormElement
    const formData = new FormData(form)
    const entries = Object.fromEntries(formData.entries()) as unknown as { search: string; }

    search = ""

    location.href = `/catalog/?search=${entries.search.toLowerCase().split(" ").join('+')}`
  }

  onMount(() => {
    const searchTerm = $page.url.searchParams.get(eFilters.SEARCH)
    if (searchTerm) {
      search = searchTerm as string
    }
  })

</script>

<form class={cn("relative", className)} on:submit={onSubmit}>
  <Button size="icon" variant="ghost" class="absolute right-0 top-1/2 -translate-y-1/2">
    <SearchIcon class="h-4 w-4" />
  </Button>
  <Input bind:value={search} placeholder="Your search begins here" name="search" class="w-full pr-12" />
</form>