<script lang="ts">
	import { page } from "$app/stores";

  
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Drawer from "$lib/components/ui/drawer/index.js";
	import { asLink, type Content, type LinkField } from "@prismicio/client";
	import Hamburger from "../icons/Hamburger.svelte";
	import { PrismicLink } from "@prismicio/svelte";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils";
	import { btnClasses } from "$lib/constants";
  
  $: open = false
  
	const isActive = (link: LinkField) => {
		const path = asLink(link);
		return path && $page.url.pathname.includes(path);
	};

  let settings = $page.data.settings as Content.SettingsDocument
</script>
 
<Drawer.Root bind:open>
  <Drawer.Trigger asChild let:builder>
    <Button builders={[builder]} variant="outline" size="icon" class={cn("md:hidden", btnClasses)}>
      <Hamburger />
    </Button>
  </Drawer.Trigger>
  <Drawer.Content>
    <div class="mx-auto w-full max-w-sm">
      <Drawer.Header>
        <Drawer.Title>Ceetish Collection</Drawer.Title>
        <Drawer.Description>Navigate our space</Drawer.Description>
      </Drawer.Header>
      <div class="grid grid-cols-2 gap-2 px-4">
        {#each settings.data.navigation as item (item.label)}
        <PrismicLink
          field={item.link}
          class={buttonVariants({ variant: 'default' })}
          aria-current={isActive(item.link) ? 'page' : undefined}
        >
          {item.label}
        </PrismicLink>
				{/each}
        <!-- <Button
          on:click={() => open = false}
          class="font-medium underline-offset-4 hover:underline"
					href="/">
					Home
				</Button>
        <Button
          on:click={() => open = false}
          class="font-medium underline-offset-4 hover:underline"
					href="/services">
					Services
				</Button>
				<Button
          on:click={() => open = false}
          class="font-medium underline-offset-4 hover:underline"
          href="/about">
					About
				</Button>
				<Button
          on:click={() => open = false}
					class="font-medium underline-offset-4 hover:underline"
					href="/locations">
					Locations
				</Button>
				<Button
          on:click={() => open = false}
					class="font-medium underline-offset-4 hover:underline"
          target="_blank"
					href="https://www.jordanrecruitments.com">
					Join Us
				</Button>
				<Button
          on:click={() => open = false}
					class="font-medium underline-offset-4 hover:underline"
					href="/contact">
					Contact
				</Button> -->
      </div>
      <Drawer.Footer>
        <Drawer.Close asChild let:builder>
          <Button builders={[builder]} variant="outline">Cancel</Button>
        </Drawer.Close>
      </Drawer.Footer>
    </div>
  </Drawer.Content>
</Drawer.Root>