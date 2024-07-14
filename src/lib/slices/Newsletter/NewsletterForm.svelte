<script lang="ts">
	import SpinLoader from '$lib/components/icons/SpinLoader.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { calloutBtnClasses } from '$lib/constants';
	import type { iStatus } from '$lib/interfaces';
	import { cn } from '$lib/utils';
	import type { KeyTextField } from '@prismicio/client';
	import toast from 'svelte-french-toast';

	export let buttonLabel: KeyTextField;

	$: disabled = false;

	const onSubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();
		const form = evt.target as HTMLFormElement;
		const formData = new FormData(form);
		const entries = Object.fromEntries(formData.entries());

		disabled = true;

		try {
			const promise = fetch('/api/newsletter', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(entries)
			});

			const response = await toast.promise(promise, {
				success: 'Submitted',
				loading: 'Submitting...',
				error: "Couldn't Submit because"
			});

			const result = (await response.json()) as iStatus;

			if (result.status === 'success') {
				toast.success('Successfully');
			} else {
				toast.error(result.message);
			}
			disabled = false;
		} catch (error: any) {
			toast.error(error.message);
			disabled = false;
		}
	};
</script>

<form class="flex flex-col gap-4" on:submit={onSubmit}>
	<Input placeholder="Enter your email address" name="email" required class="bg-white text-font" />
	<Button type="submit" class={cn(calloutBtnClasses, '!w-full')}>
		{#if disabled}
			<SpinLoader />
		{:else}
			{buttonLabel}
		{/if}
	</Button>
</form>
