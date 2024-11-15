<script lang="ts">
	import questions from '$lib/questions';
	import CandyCaneBox from '../../components/candy-cane-box.svelte';
	import NewAnswer from '../../components/new-answer.svelte';
	import Answer from '../../components/answer.svelte';

	export let data;

	let { profile } = data;
	$: answers = data.answers || [];
	$: answeredQuestions = answers.map((a) => a.q_key);
	$: remainingQuestions = Object.keys(questions).filter((q) => !answeredQuestions.includes(q));

	function handleAddSuccess({qKey, answer, id}: { qKey: string; answer: string, id: string }) {
		answers.push({ q_key: qKey, answer, id: parseInt(id, 10) });
	}
	function handleRemoveSuccess(answerId: string) {
		const id = parseInt(answerId);
		const list = [...answers];
		if (isNaN(id)) return;
		const idx = list.findIndex(a => a.id === id)
		list.splice(idx, 1);
		answers = list;
	}
</script>

{#if data.firstTime}
	<div class="width info">
		🔖 <strong>Bookmark this page!</strong> You can come back and edit your wishlist any time.
	</div>
{/if}

<CandyCaneBox>
	<h1>{profile.name}&apos;s wishlist</h1>
	<p>We're on the honor system. <a href="/logout">Not {profile.name}?</a></p>
	<hr />
	<h2>Answer questions</h2>
	<NewAnswer unanswered={remainingQuestions} onSuccess={handleAddSuccess} />
	<hr />
	<h2>Previous answers</h2>
	{#each answers as answer}
		<Answer key={answer.q_key} a={answer.answer} answerId={answer.id} onRemove={handleRemoveSuccess} />
	{:else}
		<div class="empty">No answers yet!</div>
	{/each}
</CandyCaneBox>

<style>
	h1,
	h2,
	p {
		margin: 0;
	}
	p {
		font-size: 0.8rem;
		font-style: italic;
	}
	hr {
		margin: 1em 0;
	}
	.empty {
		padding: 1em 0;
		color: grey;
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
