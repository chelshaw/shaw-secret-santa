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
			Below are {info.name}'s responses. Questions they did not answer are not shown. Good luck! 🎁
		</p>
		<p>
			<em>(P.S. If they update their answers the updated response will show here)</em>
		</p>
		{#each answers as answer}
			<hr />
			<p class="question">{answer.label}</p>
			<p class="answer"><strong>{answer.answer}</strong></p>
		{/each}
	{/if}
</main>

<style>
	h1 {
		text-align: center;
	}
	.large {
		font-size: 1.3em;
	}
	.question {
		color: rgba(255, 255, 255, 0.8);
	}
	hr {
		border-color: rgba(255, 255, 255, 0.5);
	}
</style>
