<script lang="ts">
	import type { ActionData } from './$types';
	import Error from '../components/error.svelte';

	export let form: ActionData;
	let email = form?.email || '';
	let otp = '';
	console.log({ form });
</script>

<svelte:head>
	<title>🎅🏻 Shaw Secret Santa 2023 🎅🏾</title>
</svelte:head>

<main>
	{#if form?.email}
		<h2>Check your email for the log-in code</h2>
		<form class="block" method="POST" action="?/verify">
			<label for="otp">OTP</label>
			<input id="otp" name="otp" value={otp} type="text" />
			<input id="email" name="email" value={email} type="hidden" />
			<input type="submit" value="Sign in" />
		</form>
	{:else}
		<form class="block" method="POST" action="?/login">
			<label for="email">Email</label>
			<input id="email" name="email" value={email} type="email" />
			<input type="submit" value="Sign in" />
			{#if form?.error}
				<Error>{form?.error}</Error>
			{/if}
		</form>
	{/if}
</main>
