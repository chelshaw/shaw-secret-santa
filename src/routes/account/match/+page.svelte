<script>
	import Error from '../../../components/error.svelte';

	export let data;

	let { session, supabase, info, questions } = data;
	$: ({ session, supabase, info } = data);
	$: answers = info
		? questions.filter((q) => !!info[q.key]).map((q) => ({ ...q, answer: info && info[q.key] }))
		: [];
</script>

<main>
	{#if !info}
		<h1>You don't have a match</h1>
		<Error>Please reach out to Chelsea if you think this is a mistake.</Error>
	{:else}
		<h1>Your match is...<br />{info.name}!</h1>
		<p class="large">
			Below are {info.name}'s responses.
		</p>
		<p class="large">Spend limit is $40.</p>
		<p class="large">Good luck! 🎁</p>
		<div class="small">
			Last updated {new Date(info.updated).toDateString()}
		</div>
		<div class="answers">
			{#each answers as answer}
				<p class="question">{answer.label}</p>
				<p class="answer"><strong>{answer.answer}</strong></p>
			{/each}
		</div>
	{/if}
</main>

<style>
	h1 {
		text-align: center;
	}
	.large {
		font-size: 1.2em;
	}
	.small {
		margin-top: 2em;
		font-style: italic;
		font-size: 0.7;
	}
	.answers {
		margin: 0;
		padding: 8px 16px;
		background: rgba(255, 255, 255, 0.2);
	}
	.question {
		color: rgba(255, 255, 255, 0.8);
	}
	.answer {
		font-size: 1.2em;
	}
</style>
