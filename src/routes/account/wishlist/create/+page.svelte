<script lang="ts">
	import type { PageData } from '../$types';
	import Question from '../../../../components/question.svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	export let data: PageData;
	const questions = data.questions;
	let currentIdx = 0;
	$: progress = `${currentIdx} of ${questions.length}`;

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
		if (currentIdx < questions.length && currentIdx > 0) {
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
				<h2>Welcome!</h2>
				<p>
					Answer as many of these questions as you like. Feel free to come back and update your
					answers any time between now and Thanksgiving. Once matches are made we will send out
					communication with the wishlist for you to work with.
				</p>
				<button class="primary" on:click={() => handleNext(1)}>Start</button>
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
			<div class="question">
				<h2>All done!</h2>
				<p>
					Feel free to come back and edit your answers anytime from your <a href="/account"
						>profile</a
					>.
				</p>
				<a href="/account" class="button primary">Finish</a>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		max-width: var(--content-width);
		margin: 0 auto;
		display: flex;
		height: 100vh;
		flex-direction: column;
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