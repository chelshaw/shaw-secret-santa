<script lang="ts">
	import questions from '$lib/questions';
	import CandyCaneBox from '../../components/candy-cane-box.svelte';
	import NewAnswer from '../../components/new-answer.svelte';
	import Answer from '../../components/answer.svelte';
	import Tabs from '../../components/tabs.svelte';
	import ConfirmEmail from '../../components/confirm-email.svelte';

	export let data;
	$: answers = data.answers || [];
	$: answeredQuestions = answers.map((a) => a.q_key);
	$: remainingQuestions = Object.keys(questions).filter((q) => !answeredQuestions.includes(q));
	$: showEmailBanner = !data?.email || !data?.confirmed;
	let email: string = data?.email;

	function handleAddSuccess({ qKey, answer, id }: { qKey: string; answer: string; id: string }) {
		answers.push({ q_key: qKey, answer, id: parseInt(id, 10) });
	}
	function handleRemoveSuccess(answerId: string) {
		const id = parseInt(answerId);
		const list = [...answers];
		if (isNaN(id)) return;
		const idx = list.findIndex((a) => a.id === id);
		list.splice(idx, 1);
		answers = list;
	}
	function handleEmailConfirm() {
		data.confirmed = true;
	}
</script>

{#if data.firstTime}
	<div class="width info">
		🔖 <strong>Bookmark this page!</strong> You can come back and edit your wishlist any time.
	</div>
{/if}

<Tabs current="wishlist" />
<CandyCaneBox>
	<h1>{data.name}&apos;s wishlist</h1>
	<p>We're on the honor system. <a href="/logout">Not {data.name}?</a></p>
	<hr />
	{#if showEmailBanner}
		<ConfirmEmail {email} onSuccess={handleEmailConfirm} />
	{:else}
		<h2>Answer questions</h2>
		{#if remainingQuestions.length}
			<p>Only answer questions that are relevant to you. Feel free to add links!</p>
			<NewAnswer unanswered={remainingQuestions} onSuccess={handleAddSuccess} />
		{:else}
			<div class="empty">You answered all the questions! Gold star for you ⭐️</div>
		{/if}
		<hr />
		<h2>Your answers</h2>
		<p>Changes are saved automatically. Feel free to remove any that no longer apply.</p>
		{#each answers as answer}
			<Answer
				key={answer.q_key}
				a={answer.answer}
				answerId={answer.id}
				onRemove={handleRemoveSuccess}
			/>
		{:else}
			<div class="empty">No answers yet!</div>
		{/each}
	{/if}
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
