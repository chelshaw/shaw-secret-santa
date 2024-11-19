<script lang="ts">
	import Error from '../../components/error.svelte';

	export let data;

	let matches: Match[];
	let error: string;
	let { session, supabase, profiles } = data;
	$: ({ session, supabase, profiles } = data);
	console.log({ profiles });

	interface Profile {
		name: string;
		dnm: string[];
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
		profiles
			?.map((p) => ({ ...p, dnm: p.do_not_match || [] }))
			.sort((a, b) => {
				if (a.dnm.length == b.dnm.length) return 0;
				return a.dnm.length > b.dnm.length ? -1 : 1;
			}) || [];

	function assignMatch(profile: Profile, candidates: Profile[]) {
		const potentials = candidates.filter(
			(c) => profile.user_id !== c.user_id && !profile.dnm.includes(c.user_id)
		);
		if (potentials.length === 0) {
			throw `No candidates available for ${profile.name}`;
		}
		const selection = potentials[Math.floor(Math.random() * potentials.length)];
		return candidates.indexOf(selection);
	}

	function matchProfiles(evt: Event) {
		// Reset
		matches = [];
		error = '';
		const candidates = [...sortedProfiles];
		try {
			const fullMatches: FullMatch[] = [];

			sortedProfiles.forEach((profile) => {
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
	<h1>{sortedProfiles.length} Profiles</h1>
	<div>
		{#if error}
			<Error>{error}</Error>
			<button on:click={matchProfiles}>Re-Match</button>
		{:else if matches}
			<form method="POST" action="?/save">
				<input type="hidden" name="matches" value={JSON.stringify(matches)} />
				<input type="submit" class="button block primary" value={'Save'} />
			</form>
			<button on:click={matchProfiles}>Re-Match</button>
		{:else}
			<button on:click={matchProfiles}>Match</button>
		{/if}
	</div>
</main>
