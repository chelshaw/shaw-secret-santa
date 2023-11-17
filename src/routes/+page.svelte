<script lang="ts">
	import type { ActionData } from './$types';
	import Error from '../components/error.svelte';

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
			<label for="otp">One-time code</label>
			<input id="otp" name="otp" value={otp} type="text" />
			<input id="email" name="email" value={email} type="hidden" />
			<input class="button primary" type="submit" value="Verify" />
			{#if form?.verifyError}
				<Error>Error: {form?.verifyError}.</Error>
			{/if}
		</form>
	{:else}
		<h2>Log in with your email</h2>
		<form class="block" method="POST" action="?/login">
			<label for="email">Email</label>
			<input id="email" name="email" value={email} type="email" />
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
	input[type='text'],
	input[type='email'] {
		display: block;
		width: 100%;
		font-family: inherit;
		color: rgb(255, 255, 255);
		padding-block-start: 0px;
		padding-block-end: var(--spacing-100);
		padding-inline: 0px;
		padding: 12px 0;
		margin: 12px 0;
		border: none;
		border-bottom: 1px solid white;
		outline: none;
		border-radius: 0px;
		appearance: none;
		background: transparent;
		transform: translateZ(0px);
		font-size: 30px;
		-moz-osx-font-smoothing: grayscale;
		line-height: unset;
		-webkit-text-fill-color: rgb(255, 255, 255);
		animation: 1ms ease 0s 1 normal none running native-autofill-in;
		box-shadow: rgba(83, 147, 102, 0.3) 0px 1px;
	}
</style>
