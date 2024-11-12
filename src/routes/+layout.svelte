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

<div>
	<Lightrope />
	<div class="padded">
		<slot />
	</div>
</div>

<style>
	.padded {
		padding: 3rem 1rem;
	}
</style>
