<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Filter as IconFilter } from "lucide-svelte";
	import Filter from "./Filter.svelte";
	import { btnClasses, type iFilters } from "$lib"; 
 
  export let allFilters: iFilters
  export let actualFilters: iFilters
</script>
 
<Drawer.Root>
  <Drawer.Trigger asChild let:builder>
    <Button builders={[builder]} variant="outline" size="icon" class={btnClasses}>
      <IconFilter class="w-4 h-4"/>
    </Button>
  </Drawer.Trigger>
  <Drawer.Content class="md:hidden">
    <div class="mx-auto w-full max-w-sm h-60 overflow-auto">
      <div class="p-4 pb-0">
        <Filter { allFilters } { actualFilters } class="flex md:hidden" />
      </div>
      <Drawer.Footer>
        <!-- <Button>Submit</Button> -->
        <Drawer.Close asChild let:builder>
          <Button builders={[builder]} variant="outline">Close</Button>
        </Drawer.Close>
      </Drawer.Footer>
    </div>
  </Drawer.Content>
</Drawer.Root>