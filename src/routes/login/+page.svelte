<script lang="ts">
	import type { ActionData } from '../$types';
	import Error from '../../components/error.svelte';
	import Input from '../../components/input.svelte';

	export let form: ActionData;
	let email = form?.email || '';
	let otp = '';
</script>

<svelte:head>
	<title>🎅🏻 Shaw Secret Santa 2023 🎅🏾</title>
</svelte:head>

<main>
	{#if form?.email}
		<h2>Check your email for the log-in code</h2>
		<form class="block" method="POST" action="?/verify">
			<Input label="One-time code" name="otp" value={otp} />
			<input name="email" type="hidden" value={email} />
			<input class="button primary" type="submit" value="Verify" />
			{#if form?.verifyError}
				<Error>Error: {form?.verifyError}.</Error>
			{/if}
		</form>
	{:else}
		<h2>Log in with your email</h2>
		<form class="block" method="POST" action="?/login">
			<Input label="Email" name="email" type="email" value={email} />
			<input class="button primary" type="submit" value="Log in" />
			{#if form?.error}
				<Error>Error: {form?.error}. Please reach out to Chelsea for assistance.</Error>
			{/if}
		</form>
	{/if}
</main>

<style>
	.block {
		margin: 30px auto;
	}
</style>
