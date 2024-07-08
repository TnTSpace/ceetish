<script>
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { Toaster } from 'svelte-french-toast';
</script>

<ModeWatcher />
<Toaster />
<main>
	<slot />
</main>
