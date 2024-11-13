<script lang="ts">
	import CandyCaneBox from '../../components/candy-cane-box.svelte';
	import QuestionInput from '../../components/question-input.svelte';

	export let data;
	let { profile } = data;
	$: ({ profile } = data);
	const questions = data.questions;
</script>

{#if data.firstTime}
	<div class="width info">
		🔖 <strong>Bookmark this page!</strong> You can come back and edit your wishlist any time. Edits
		are automatically saved.
	</div>
{/if}

<CandyCaneBox>
	<h1>{profile.name}&apos;s wishlist</h1>
	<p>We're on the honor system. <a href="/logout">Not {profile.name}?</a></p>
	<hr />
	{#each questions as question}
		<QuestionInput {question} answer={profile[question.key]} />
	{/each}
</CandyCaneBox>

<style>
	h1,
	p {
		margin: 0;
	}
	p {
		font-size: 0.8rem;
		font-style: italic;
	}
	.info {
		background: var(--green);
		border: 1px solid var(--cream);
		border-radius: var(--custom-border-radius);
		color: var(--cream);
		padding: 1rem;
		margin-bottom: 2rem;
	}
	.info strong {
		color: inherit;
	}
</style>
