<script lang="ts">
	import { PUBLIC_IN_DEV } from '$env/static/public';
	import CandyCaneBox from '../components/candy-cane-box.svelte';
	import Error from '../components/error.svelte';

	const typeAheadThreshold = 3;
	export let form;
	export let data;
	let search = '';

	$: names = form?.data || data?.list;

	function matchingNames(list: { user_id: string; name: string }[] | undefined, search: string) {
		if (!list || search.length < typeAheadThreshold) return [];
		return list?.filter((i) => search && i.name.toLowerCase().startsWith(search.toLowerCase()));
	}

	$: matches = matchingNames(names, search);
</script>

<CandyCaneBox>
	{#if names}
		<form class="block" method="POST" action="?/name">
			<label for="search">Who are you?</label>
			<input
				bind:value={search}
				name="search"
				placeholder="Start typing your name…"
				autocomplete="off"
			/>
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
{#if PUBLIC_IN_DEV}
	<div class="dev-mode">DEV MODE</div>
{/if}

<style>
	.dev-mode {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 0.5em 1em;
		background: var(--green);
		color: var(--black);
		text-align: center;
	}
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
