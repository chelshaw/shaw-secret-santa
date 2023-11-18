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
		{#each questions as question}
			<QuestionInput {question} answer={profile[question.key]} />
		{/each}
	{/if}
</main>

<style>
	h1 {
		margin-top: 0;
	}
</style>
