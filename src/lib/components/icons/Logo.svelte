<script lang="ts">
	import { cn } from "$lib/utils";
	import LogoIcon from "./LogoIcon.svelte";

  export let srTitle: string = ""

  let className: string = ""
  
  export { className as class }
</script>  

<a href="/" class={cn("flex items-center gap-1", className)} on:click>
  <LogoIcon />
  <div class="flex flex-col">
    <p class="font-semibold text-lg">CEETISH</p>
    <p class="text-xs -mt-1">Collection</p>
  </div>
  <span class="sr-only">{srTitle}</span>
</a>