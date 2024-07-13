<script lang="ts">
	import { page } from "$app/stores";
	import { highlightClasses, sublineClasses } from "$lib/constants";
	import { PrismicText, PrismicRichText } from "@prismicio/svelte";
	import type { SettingsDocument } from "../../../prismicio-types";


  
	const settings = $page.data.settings as SettingsDocument
	const policies = settings.data.policies
</script>


<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  {#each policies as policy, i}
  <div class={highlightClasses}>
    <h2 class={sublineClasses}>
      <PrismicText field={policy.title} />
    </h2>
    <div class="prose dark:prose-invert">
      <PrismicRichText field={policy.body} />
    </div>
  </div>
  {/each}
</div>