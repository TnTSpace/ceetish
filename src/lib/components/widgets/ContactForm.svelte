<script lang="ts">
	import toast from 'svelte-french-toast';
	import Button from '../ui/button/button.svelte';
	import { Input } from '../ui/input';
	import Textarea from '../ui/textarea/textarea.svelte';
	import type { iStatus } from '$lib/interfaces';
	import SpinLoader from '../icons/SpinLoader.svelte';

	$: loading = false;

	const onSubmit = async (evt: SubmitEvent) => {
		evt.preventDefault();
		const form = evt.target as HTMLFormElement;
		const formData = new FormData(form);
		const entries = Object.fromEntries(formData.entries());

		loading = true;
		const promise = fetch('/api/contact', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(entries)
		});

		const response = await toast.promise(promise, {
			success: 'Submitted',
			error: 'Error submitting',
			loading: 'Submitting...'
		});

		const { message, status } = (await response.json()) as iStatus;

		if (status === 'success') {
			toast.success(message);
		} else {
			toast.error(message);
		}
		loading = false;
	};
</script>

<form on:submit={onSubmit} class="flex flex-col gap-4">
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
		<Input type="text" name="firstName" placeholder="First name" />
		<Input type="text" name="lastName" placeholder="Last name" />
		<Input type="email" name="email" placeholder="Email" />
		<Input type="text" name="phoneNumber" placeholder="Phone number" />
	</div>
	<Textarea name="message" class="resize-none" placeholder="Message" rows={8} />
	{#if loading}
		<Button type="button" disabled size="icon">
			<SpinLoader />
		</Button>
	{:else}
		<Button type="submit">Submit</Button>
	{/if}
</form>
