<script lang="ts">
	import { enhance } from '$app/forms';
	import CandyCaneBox from '../../components/candy-cane-box.svelte';
	import ConfirmEmail from '../../components/confirm-email.svelte';
	import Error from '../../components/error.svelte';
	import ProfileSearch from '../../components/profile-search.svelte';
	import Tabs from '../../components/tabs.svelte';
	interface Profile {
		name: string;
		user_id: string;
	}
	export let data;
	let blockError = '';
	let matches: Profile[] = [];

	$: profilesById = data.profiles
		? data.profiles.reduce((obj: Record<string, Profile>, curr: Profile) => {
				obj[curr.user_id] = curr;

				return obj;
		  }, {})
		: {};

	function filterProfiles(profiles: Profile[], blocklist: string[], self: string, match: string) {
		const blocked = [...blocklist, match, self];
		return profiles.filter((p) => !blocked.includes(p.user_id));
	}
	$: profilesLeft = filterProfiles(data.profiles, data.blockList, data.self, data.match);
	function onMatch(m: Profile[]) {
		matches = m;
	}
</script>

<Tabs current="settings" />
<CandyCaneBox>
	<h1>Settings</h1>
	<hr />
	<h2>Do not match</h2>
	<p>
		Add names of participants who you do not want to match with this year (eg. your spouse). You
		will not be matched with the person you matched with last year, if you participated.
	</p>
	<ProfileSearch
		profiles={profilesLeft}
		{onMatch}
		label="Block match with"
		searchPlaceholder="Search by name"
		emptyMessage="User not found"
	/>
	{#each matches as match}
		<form
			class="match"
			method="POST"
			action="/settings?/block"
			use:enhance={() => {
				blockError = '';
				return async ({ result, update }) => {
					if (result.type === 'failure') {
						console.log('failure: ', result.data?.message);
					} else {
						update();
					}
				};
			}}
		>
			<input class="readonly" name="name" value={match.name} readonly />
			<input name="userId" value={match.user_id} type="hidden" />
			<input name="blocklist" value={data.blockList} type="hidden" />
			<input type="submit" class="btn btn--match" value="Do not match" />
		</form>
	{/each}
	{#if blockError}
		<Error debug={blockError}>An error occurred. Please try again later.</Error>
	{/if}
	<h3>Blocklist</h3>
	{#each data.blockList as b}
		<form class="match" method="POST" action="/settings?/unblock">
			<input class="readonly" name="name" value={profilesById[b].name} readonly />
			<input name="userId" value={profilesById[b].user_id} type="hidden" />
			<input name="blocklist" value={data.blockList} type="hidden" />
			<input type="submit" class="btn btn--red btn--match" value="Unblock" />
		</form>
	{/each}
	{#if data.match}
		<div class="match">
			<input class="readonly" name="name" value={profilesById[data.match].name} readonly />
			<input name="userId" value={profilesById[data.match].user_id} type="hidden" />
			<span>Last year's match</span>
		</div>
	{/if}
	<hr />
	<ConfirmEmail email={data.email} />
</CandyCaneBox>

<style>
	h1,
	h2 {
		margin: 0;
	}
	input {
		width: 100%;
		padding: 0.5em 1em;
		border-radius: var(--custom-border-radius);
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
