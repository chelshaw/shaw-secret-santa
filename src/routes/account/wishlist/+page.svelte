<script lang="ts">
	import type { PageData } from '../$types';
	import QuestionInput from '../../../components/question-input.svelte';

	export let data: PageData;
	let { profile } = data;
	$: ({ profile } = data);
	$: emptyWishlist =
		data.questions
			.reduce((prev, q) => {
				prev += profile ? profile[q.key] || '' : '';
				return prev;
			}, '')
			.trim() === '';

	const questions = data.questions;
	let profileForm: HTMLFormElement;
</script>

<main>
	<h1>My wishlist</h1>
	{#if emptyWishlist}
		<p>Your wishlist is empty!</p>
		<a class="button primary" href="/account/wishlist/create">Start now</a>
	{:else}
		<div class="info">
			🔖 <strong>Bookmark this page!</strong> You can come back and edit your wishlist any time. Edits
			are automatically saved.
		</div>
		{#each questions as question}
			<QuestionInput {question} answer={profile[question.key]} />
		{/each}
	{/if}
</main>

<style>
	.info {
		background: var(--light-blue);
		border: 1px solid var(--mid-blue);
		border-radius: 0.5em;
		color: var(--darkest-blue);
		padding: 1rem;
		margin-bottom: 2rem;
	}
	.info strong {
		color: inherit;
	}
</style>
