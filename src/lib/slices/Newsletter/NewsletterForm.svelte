<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { calloutBtnClasses } from "$lib/constants";
	import { cn } from "$lib/utils";
	import type { KeyTextField } from "@prismicio/client";


  export let buttonLabel: KeyTextField

  const onSubmit = (evt: SubmitEvent) => {
    evt.preventDefault()
    const form = evt.target as HTMLFormElement
    const formData = new FormData(form)
    const entries = Object.fromEntries(formData.entries())
    console.log({ entries })
  }
</script>

<form class="flex flex-col gap-4">
  <Input placeholder="Enter your email address" name="email" class="bg-white text-font" />
  <Button type="submit" class={cn(calloutBtnClasses, "!w-full")}>{buttonLabel}</Button>
</form>