<script lang="ts">
	import CandyCaneBox from '../../components/candy-cane-box.svelte';
	import ConfirmEmail from '../../components/confirm-email.svelte';
	import ProfileSearch from '../../components/profile-search.svelte';
	import Tabs from '../../components/tabs.svelte';
	interface Profile {
		name: string;
		user_id: string;
	}
	export let data;
	let matches: Profile[] = [];

	$: profilesById = data.profiles
		? data.profiles.reduce((obj: Record<string, Profile>, curr: Profile) => {
				obj[curr.user_id] = curr;

				return obj;
		  }, {})
		: {};

	function filterProfiles(match: string, blocklist: string[], profiles: Profile[]) {
		const blocked = [...blocklist, match];
		return profiles.filter((p) => !blocked.includes(p.user_id));
	}
	$: profilesLeft = filterProfiles(data.match, data.blockList, data.profiles);
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
	<ProfileSearch profiles={profilesLeft} {onMatch} label="Search for name" />
	{#each matches as match}
		<form class="match" method="POST" action="/settings?/block">
			<input class="readonly" name="name" value={match.name} readonly />
			<input name="userId" value={match.user_id} type="hidden" />
			<input name="blocklist" value={data.blockList} type="hidden" />
			<input type="submit" class="btn" value="Do not match" />
		</form>
	{/each}
	<h3>Blocklist</h3>
	{#each data.blockList as b}
		<form class="match" method="POST" action="/settings?/unblock">
			<input class="readonly" name="name" value={profilesById[b].name} readonly />
			<input name="userId" value={profilesById[b].user_id} type="hidden" />
			<input name="blocklist" value={data.blockList} type="hidden" />
			<input type="submit" class="btn btn--red" value="Unblock" />
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
</style>
