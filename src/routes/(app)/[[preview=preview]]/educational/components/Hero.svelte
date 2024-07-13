<script lang="ts">
	import { cn } from "$lib/utils";

  let className: string = ""

  export { className as class }
</script>

<div class={cn("py-10 md:py-20", className)}>
  <slot />
</div>