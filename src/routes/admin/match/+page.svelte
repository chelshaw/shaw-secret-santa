<script lang="ts">
	import CandyCaneBox from '../../../components/candy-cane-box.svelte';
	import Error from '../../../components/error.svelte';

	export let data;
	export let form;

	let matches: Match[];
	let error: string;
	let profiles: Profile[] = data.profiles || [];

	interface Profile {
		name: string;
		do_not_match: string[];
		user_id: string;
	}
	interface Match {
		name: string;
		user_id: string;
		match: string;
		matchName: string;
	}
	interface FullMatch {
		profile: Profile;
		match: Profile;
	}

	$: sortedProfiles =
		profiles?.sort((a: Profile, b: Profile) => {
			if (a.do_not_match.length == b.do_not_match.length) return 0;
			return a.do_not_match.length > b.do_not_match.length ? -1 : 1;
		}) || [];

	function assignMatch(profile: Profile, candidates: Profile[]) {
		const potentials = candidates.filter(
			(c) => profile.user_id !== c.user_id && !profile.do_not_match.includes(c.user_id)
		);
		if (potentials.length === 0) {
			throw `No candidates available for ${profile.name}`;
		}
		const selection = potentials[Math.floor(Math.random() * potentials.length)];
		return candidates.indexOf(selection);
	}

	function matchProfiles() {
		// Reset
		matches = [];
		error = '';
		const candidates = [...sortedProfiles];
		try {
			const fullMatches: FullMatch[] = [];

			sortedProfiles.forEach((profile: Profile) => {
				const matchIdx = assignMatch(profile, candidates);
				const [match] = candidates.splice(matchIdx, 1);
				fullMatches.push({ profile, match });
			});
			matches = fullMatches.map(({ profile, match }) => {
				return {
					user_id: profile.user_id,
					name: profile.name,
					match: match.user_id,
					matchName: match.name
				};
			});
		} catch (e) {
			error = `${e as string}. ${candidates.length} profile(s) left.`;
		}
	}
</script>

<main>
	<CandyCaneBox>
		<h1>Admin panel</h1>
		<hr />
		<h2>{sortedProfiles.length} Profiles</h2>
		<div>
			{#if error}
				<Error>{error}</Error>
				<button class="btn" on:click={matchProfiles}>Re-Match</button>
			{:else if matches}
				<ul>
					{#each matches as match}
						<li>{match.name} - <a href="/match/{match.match}">{match.matchName}</a></li>
					{/each}
				</ul>
				<button class="btn" on:click={matchProfiles}>Re-Match</button>
				<form method="POST" action="?/save">
					<input type="hidden" name="matches" value={JSON.stringify(matches)} />
					<input type="submit" class="btn btn--red" value="Save" />
				</form>
			{:else}
				<button class="btn" on:click={matchProfiles}>Match</button>
			{/if}
		</div>
	</CandyCaneBox>
</main>

<style>
	form {
		margin-top: 1em;
	}
</style>
