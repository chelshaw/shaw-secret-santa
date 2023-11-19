<script lang="ts">
	import Error from '../../components/error.svelte';
	import Input from '../../components/input.svelte';

	export let form;
	let email = form?.email || '';
	let otp = '';
</script>

<svelte:head>
	<title>🎅🏻 Shaw Secret Santa 2023 🎅🏾</title>
</svelte:head>

<main>
	{#if form?.email}
		<h1>Check your email for a one-time code</h1>
		<p>
			The email should come from <span class="email">chelshaw.dev@gmail.com</span>. If you do not
			receive an email after 2 minutes refresh this page and try again.
		</p>
		<form class="block" method="POST" action="?/verify">
			<Input label="One-time code" name="otp" value={otp} />
			<input name="email" type="hidden" value={email} />
			<input class="button primary" type="submit" value="Verify" />
			{#if form?.verifyError}
				<Error>Error: {form?.verifyError}.</Error>
			{/if}
		</form>
	{:else}
		<h1>Log in with your email</h1>
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
	.email {
		text-decoration: underline;
	}
	.block {
		margin: 30px auto;
	}
</style>
