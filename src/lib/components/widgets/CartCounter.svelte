<script lang="ts"> 
	import Minus from "../icons/Minus.svelte";
	import { Button } from "../ui/button";

  const btnClassName = "border-2 dark:border-white/50 p-0 w-10 h-10 flex items-center justify-center rounded-lg"

  export let hidden: boolean = false


</script>

<div class:hidden class="flex items-center gap-4">
  <Button size="icon">
    <Minus />
  </Button>
  <span>{0}</span>
  <Button size="icon">
    <Minus />
  </Button>
</div>