<script lang="ts">
	import { page } from '$app/stores';
	import Logo from '$lib/components/icons/Logo.svelte';
	import { Button } from '$lib/components/ui/button';

</script>

<div class="flex flex-col items-center justify-center h-[100vh] gap-2">
	<Logo />
	<h1 class="text-lg font-medium capitalize">{$page.error?.message}</h1>
	<Button on:click={() => location.reload()}>Refresh</Button>
</div>