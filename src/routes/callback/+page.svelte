<script lang="ts">
	import Error from '../../components/error.svelte';
	import Input from '../../components/input.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;
	let otp = '';
	let email = form?.email || '';
</script>

<svelte:head>
	<title>🎅🏻 Shaw Secret Santa 2023 🎅🏾</title>
</svelte:head>

<main>
	<h1>Accept your invitation</h1>
	<p>If you've already accepted your invitation, <a href="/">log in here</a>.</p>
	<form class="block" method="POST" action="?/verify">
		<Input label="Email" name="email" value={email} type="email" />
		<Input label="One-time code" name="otp" value={otp} />
		<input class="button primary" type="submit" value="Verify" />
		{#if form?.verifyError}
			<Error>Error: {form?.verifyError}.</Error>
		{/if}
	</form>
</main>

<style>
	.block {
		margin: 30px auto;
	}
</style>
