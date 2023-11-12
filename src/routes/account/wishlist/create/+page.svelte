<script lang="ts">
	import type { PageData } from '../$types';
	import Question from '../../../../components/question.svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { supabase } from '@supabase/auth-ui-shared';

	const scrollProgress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});
	const pctProgress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});
	$: progress = `${currentIdx + 1} of ${questions.length}`;
	export let data: PageData;

	const wishlist = {
		need: '',
		hobbies: '',
		style: '',
		color: '',
		genres: '',
		brands: '',
		diet: '',
		pamper: '',
		...data.profile?.wishlist
	};
	const questions = data.questions;
	let currentIdx = 0;
	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		// const data = new FormData(event.currentTarget);
		// for (const key of data.keys()) {
		// 	console.log(key, data.get(key));
		// 	wishlist[key] = data.get(key);
		// }
		handleNext(1);
		return;
	}
	async function saveProgress() {
		console.log({ wishlist });
		// const session = await getSession();
	}
	function handleNext(count: number) {
		saveProgress();
		currentIdx = currentIdx + count;
		scrollProgress.set(currentIdx * -1000);
		pctProgress.set(currentIdx / (questions.length - 1));
		const currentQuestionKey = questions[currentIdx].key;
		document.getElementById(currentQuestionKey)?.focus();
	}
	function handleNav(event: CustomEvent<{ num: number }>) {
		handleNext(event.detail.num);
	}
	function handleMessage(event: CustomEvent<{ key: string; answer: string }>) {
		wishlist[event.detail.key] = event.detail.answer;
		handleNext(1);
	}
</script>

<main>
	<div class="header">
		<h1>My wishlist</h1>
		<p>{progress}</p>
		<progress value={$pctProgress} />
		<!-- {#key currentQuestion}
		<div class="question">
			<Question on:message={handleMessage} question={currentQuestion} />
		</div>
	{/key} -->
	</div>
	<div class="viewport">
		<div class="questions" style:top={$scrollProgress + 'px'}>
			{#each questions as question}
				<div class="question">
					<Question
						on:message={handleMessage}
						on:navigate={handleNav}
						{question}
						answer={wishlist[question.key]}
					/>
				</div>
			{/each}
		</div>
	</div>

	<!-- <form
		method="post"
		on:submit|preventDefault={handleSubmit}
		class="question"
		transition:slide={{ delay: 250, duration: 300, easing: quintOut, axis: 'y' }}
	>
		<TextInput label={question.label} key={question.key} bind:value={wishlist[question.key]} />
		<label for={currentQuestion.key}>{currentQuestion.label}</label>
		<input
			type="text"
			name={currentQuestion.key}
			id={currentQuestion.key}
			autofocus
			bind:value={wishlist[currentQuestion.key]}
		/>
		<button type="button" on:click={() => handleNext(-1)}>Previous</button>
		<button type="submit">Next</button>
	</form> -->
</main>

<style>
	main {
		max-width: 600px;
		margin: 0 auto;
		display: flex;
		height: 100vh;
		flex-direction: column;
		padding: 0 20px;
	}
	.header {
		flex: 0 1 auto;
	}
	label {
		color: white;
	}
	.viewport {
		flex: 1 0 auto;
		/* height: 70vh; */
		overflow: clip;
		position: relative;
	}
	.questions {
		position: absolute;
		top: 0px;
		right: 0px;
		left: 0px;
	}
	.question {
		height: 1000px;
		padding: 24px 0;
	}
</style>
