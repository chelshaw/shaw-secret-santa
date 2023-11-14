<script lang="ts">
	import type { PageData } from '../$types';
	import Question from '../../../../components/question.svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	export let data: PageData;
	export let form: FormData;
	$: progress = `${currentIdx} of ${questions.length}`;
	const questions = data.questions;
	let currentIdx = 0;

	const scrollProgress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});
	const pctProgress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	function handleNext(count: number) {
		currentIdx = currentIdx + count;
		scrollProgress.set(currentIdx * -1000);
		pctProgress.set(currentIdx / questions.length);
		if (currentIdx < questions.length) {
			const currentQuestionKey = questions[currentIdx - 1].key;
			document.getElementById(currentQuestionKey)?.focus();
		}
	}
	function handleNav(event: CustomEvent<{ num: number }>) {
		handleNext(event.detail.num);
	}
	function handleMessage(event: CustomEvent<{ key: string; answer: string }>) {
		handleNext(1);
	}
</script>

<main>
	<div class="header">
		<h1>My wishlist</h1>
		{#if currentIdx > 0 && currentIdx < questions.length + 1}
			<div class="progress">
				<p>{progress}</p>
				<progress value={$pctProgress} />
			</div>
		{/if}
	</div>
	<div class="viewport">
		<div class="questions" style:top={$scrollProgress + 'px'}>
			<div class="question">
				<p>Intro!</p>
				<button on:click={() => handleNext(1)}>Next</button>
			</div>
			{#each questions as question}
				<div class="question">
					<Question
						on:message={handleMessage}
						on:navigate={handleNav}
						{question}
						answer={data.profile[question.key]}
					/>
				</div>
			{/each}
			<div class="question">All done!</div>
		</div>
	</div>
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
	.progress {
		display: flex;
	}
	.progress progress {
		flex: 1 0 auto;
		margin-left: 12px;
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
