<script lang="ts">
	import CandyCaneBox from '../components/candy-cane-box.svelte';
	import Error from '../components/error.svelte';

	export let form;
	const typeAheadThreshold = 3;

	function matchingNames(list: { user_id: string; name: string }[] | undefined, search: string) {
		if (!list || search.length < typeAheadThreshold) return [];
		return list?.filter((i) => search && i.name.toLowerCase().startsWith(search.toLowerCase()));
	}

	let search = '';
	$: matches = matchingNames(form?.data, search);
</script>

<CandyCaneBox>
	{#if form?.data}
		<form class="block" method="POST" action="?/name">
			<label for="search">Who are you?</label>
			<input bind:value={search} name="search" placeholder="Start typing your name…" />
			{#each matches as match}
				<div class="match">
					<input class="readonly" name="name" value={match.name} readonly />
					<input name="userId" value={match.user_id} type="hidden" />
					<input type="submit" value="This is me" />
				</div>
			{:else}
				{#if search.length >= typeAheadThreshold}
					Fiddlesticks, we can't find you! Reach out to Chelsea so she can add you to the list.
				{/if}
			{/each}
		</form>
	{:else}
		<form method="POST" action="?/enter">
			<label for="passcode">Provide passcode to enter</label>
			<input name="passcode" id="passcode" type="password" autocomplete="current-password" />
			<input type="submit" value="Enter" />
		</form>
	{/if}
	{#if form?.error}
		<Error>{form?.error}</Error>
	{/if}
</CandyCaneBox>

<style>
	form > * {
		margin-bottom: 12px;
	}
	input {
		width: 100%;
		padding: 0.5em 1em;
		border-radius: var(--custom-border-radius);
	}
	input[type='submit'] {
		width: auto;
		background-color: var(--green);
		color: var(--cream);
	}
	label {
		display: block;
		font-size: 1.6rem;
		font-weight: bold;
	}
	select {
		width: 100%;
		color: var(--mid-blue);
	}
	.match {
		display: flex;
		background: white;
		padding: 0.5em;
	}
	input.readonly {
		border: none;
		padding: none;
		font-weight: bold;
	}
</style>
