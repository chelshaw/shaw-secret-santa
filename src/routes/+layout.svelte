<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../styles.css';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Lightrope from '../components/lightrope.svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Shaw Secret Santa</title>
</svelte:head>

<div class="wrapper">
	<Lightrope />
	<div class="padded">
		<slot />
	</div>
	<footer>
		<Lightrope />
	</footer>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
	.padded {
		padding: 3rem 1rem;
		flex-grow: 2;
	}
	footer {
		padding: 2em 0;
	}
</style>
