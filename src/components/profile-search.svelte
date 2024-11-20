<script lang="ts">
	export let profiles: { user_id: string; name: string }[];
	export let onMatch: CallableFunction;
	export let label = 'Who are you?';
	export let typeAheadThreshold = 3;
	export let searchPlaceholder = 'Start typing your name…';
	export let emptyMessage =
		"Fiddlesticks, we can't find you! Reach out to Chelsea so she can add you to the list.";
	export let largeLabel = false;

	let search = '';
	function matchingNames(list: { user_id: string; name: string }[] | undefined, search: string) {
		if (!list || search.length < typeAheadThreshold) return [];
		return list?.filter((i) => search && i.name.toLowerCase().startsWith(search.toLowerCase()));
	}
	$: matches = matchingNames(profiles, search);
	function returnMatches() {
		const matches = matchingNames(profiles, search);
		onMatch(matches);
	}
</script>

<label for="search" class="large">{label}</label>
<input
	bind:value={search}
	on:input={returnMatches}
	name="search"
	placeholder={searchPlaceholder}
	autocomplete="off"
/>
{#if search.length >= typeAheadThreshold && matches.length === 0}
	{emptyMessage}
{/if}

<style>
	input {
		width: 100%;
		padding: 0.5em 1em;
		border-radius: var(--custom-border-radius);
		margin: 6px 0 12px 0;
	}
	label {
		display: block;
		font-weight: bold;
	}
	.large {
		font-size: 1.4rem;
	}
</style>
