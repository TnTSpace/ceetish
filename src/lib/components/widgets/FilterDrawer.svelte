<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import IconFilter from '~icons/flowbite/filter-outline'
	import Filter from "./Filter.svelte";
	import type { Content } from "@prismicio/client";
 
  export let slice: Content.FiltersSlice;
</script>
 
<Drawer.Root>
  <Drawer.Trigger asChild let:builder>
    <Button builders={[builder]} variant="outline" size="icon">
      <IconFilter/>
    </Button>
  </Drawer.Trigger>
  <Drawer.Content class="md:hidden">
    <div class="mx-auto w-full max-w-sm h-60 overflow-auto">
      <div class="p-4 pb-0">
        <Filter { slice } class="flex md:hidden" />
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