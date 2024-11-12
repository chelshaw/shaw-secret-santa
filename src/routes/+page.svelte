<script>
	import Error from '../components/error.svelte';
	import Input from '../components/input.svelte';

	export let form;
	let pw = '';
	let user = '';
</script>

<svelte:head>
	<title>🎁🎁🎁🎁🎁🎁</title>
</svelte:head>

<main>
	{#if form?.names}
		<h1>Who are you?</h1>
		<form class="block" method="POST" action="?/name">
			<select name="name" bind:value={user}>
				<option value="" selected>Choose your name</option>
				{#each form.names as name}
					<option value={name}>
						{name}
					</option>
				{/each}
			</select>
			<input class="button primary" type="submit" value="Continue" />
		</form>
	{:else}
		<h1>Provide password to enter</h1>
		<form class="block" method="POST" action="?/enter">
			<Input label="Passcode" name="passcode" value={pw} type="password" />
			<input class="button primary" type="submit" value="Enter" />
		</form>
	{/if}
	{#if form?.error}
		<Error>{form?.error}</Error>
	{/if}
</main>

<style>
	select {
		width: 100%;
		color: var(--mid-blue);
	}
</style>
