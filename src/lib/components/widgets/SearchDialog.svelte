<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js'; 
	import { btnClasses } from '$lib/constants';
	import { cn } from '$lib/utils';

  import { SearchIcon as IconSearch } from 'lucide-svelte';
	import SearchFilter from './filters/SearchFilter.svelte';

  let className: string = ""
  
  export { className as class }

  const onSubmit = (evt: SubmitEvent) => { 
    evt.preventDefault()
    const form = evt.target as HTMLFormElement
    const formData = new FormData(form)
    const entries = Object.fromEntries(formData.entries()) 
  }
</script>


  <Dialog.Root>
    <Dialog.Trigger class={cn(buttonVariants({ variant: 'outline', size: "icon" }), className, "flex items-center justify-center", btnClasses)} >
      <IconSearch class="!w-4 !h-4" />
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px] w-[calc(100%-32px)] mx-auto bg-white/10 dark:bg-primary/10">
      <form on:submit={onSubmit} class="flex flex-col gap-4">
        <Dialog.Header>
          <Dialog.Title>Search</Dialog.Title>
          <Dialog.Description>products with keywords</Dialog.Description>
        </Dialog.Header>
        <div>
          <SearchFilter />
        </div>
      </form>
    </Dialog.Content>
  </Dialog.Root> 

