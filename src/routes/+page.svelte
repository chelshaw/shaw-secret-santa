<script lang="ts">
	import CandyCaneBox from '../components/candy-cane-box.svelte';
	import Error from '../components/error.svelte';
	import ProfileSearch from '../components/profile-search.svelte';

	export let form;
	export let data;
	let matches: { user_id: string; name: string }[] = [];

	$: names = form?.data || data?.list || [];

	function onMatch(m: { user_id: string; name: string }[]) {
		matches = m || [];
	}
	console.log({ names, matches });
</script>

<CandyCaneBox>
	{#if names}
		<form class="block" method="POST" action="?/name">
			<ProfileSearch profiles={names} {onMatch} largeLabel={true} />
			{#each matches as match}
				<div class="match">
					<input class="readonly" name="name" value={match.name} readonly />
					<input name="userId" value={match.user_id} type="hidden" />
					<input type="submit" value="This is me" />
				</div>
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
