<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>


<section>
	<div class="center md:px-0 bg-white dark:bg-primary/10">
		<Card class="grid grid-cols-1 md:grid-cols-[3fr_1fr] dark:bg-primary/10 items-center gap-4 max-w-xl mx-auto p-4 rounded-lg">
			<div class="flex flex-col md:flex-row items-center gap-2">
				<img
				class="h-24 w-24"
				src="data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cpath fill='%23F5F5F5' d='M0 50a50 50 0 11100 0A50 50 0 010 50'/%3e%3cpath fill='%236DBD28' d='M38.8 62.7L24.2 48l-6 6 20.9 21 44.7-44.8-6.3-6.3z'/%3e%3c/g%3e%3c/svg%3e"
				alt="order success"
			/>
			<p class="text-center md:text-start">Thank you for placing an order on Ceetish!</p>
			</div>
			<Button href="/order">
				See order details
			</Button>
		</Card>
	</div>
</section>
