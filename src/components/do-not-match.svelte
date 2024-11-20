<script lang="ts">
	import { enhance } from '$app/forms';
	import Error from './error.svelte';

	interface Profile {
		name: string;
		user_id: string;
	}

	export let profiles: { user_id: string; name: string }[];
	export let blocklist: string[] = [];
	export let self: string;
	export let prevMatch: string;
	export let typeAheadThreshold = 3;

	let search = '';
	let error = '';

	function filterProfiles(profiles: Profile[], blocklist: string[]) {
		return profiles.filter((p) => !blocklist.includes(p.user_id));
	}
	function matchingNames(list: { user_id: string; name: string }[] | undefined, search: string) {
		if (!list || search.length < typeAheadThreshold) return [];
		return list?.filter((i) => search && i.name.toLowerCase().startsWith(search.toLowerCase()));
	}

	$: blocked = [...blocklist, self, prevMatch].filter((b) => !!b);
	$: profilesLeft = filterProfiles(profiles, blocked);
	$: matches = matchingNames(profilesLeft, search);
</script>

<label for="search">Block match with</label>
<input
	class="search"
	bind:value={search}
	name="search"
	placeholder="Search by name"
	autocomplete="off"
/>

{#each matches as match}
	<form
		class="match"
		method="POST"
		action="/settings?/block"
		use:enhance={() => {
			error = '';
			return async ({ result, update }) => {
				if (result.type === 'failure') {
					console.log('failure: ', result.data?.message);
				} else {
					search = '';
					update();
				}
			};
		}}
	>
		<input class="readonly" name="name" value={match.name} readonly />
		<input name="userId" value={match.user_id} type="hidden" />
		<input name="blocklist" value={blocklist} type="hidden" />
		<input type="submit" class="btn btn--match btn--red" value="Do not match" />
	</form>
{:else}
	{#if search.length >= typeAheadThreshold}
		No profile found
	{/if}
{/each}

{#if error}
	<Error debug={error}>An error occurred. Please try again later.</Error>
{/if}

<style>
	input {
		width: 100%;
		padding: 0.5em 1em;
		border-radius: var(--custom-border-radius);
	}
	input.search {
		margin: 6px 0 12px 0;
	}
	label {
		display: block;
		font-weight: bold;
	}
	.match {
		display: flex;
		background: white;
		padding: 0.5em;
		justify-content: space-between;
		align-items: baseline;
	}
	input.readonly {
		border: none;
		padding: none;
		font-weight: bold;
		width: auto;
	}
	span {
		font-size: 0.7em;
	}
	.btn--match {
		width: auto;
	}
</style>
