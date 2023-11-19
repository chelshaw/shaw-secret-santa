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
				<p class="progress-text">{progress}</p>
				<progress value={$pctProgress}>
					<div class="progress-bar">
						<span style="width: {$pctProgress}%">{$pctProgress}%</span>
					</div>
				</progress>
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
					Feel free to come back and edit your answers anytime from your <a
						data-sveltekit-reload
						href="/account/wishlist">profile</a
					>.
				</p>
				<a data-sveltekit-reload href="/account/wishlist" class="button primary">Finish</a>
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
		align-items: baseline;
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
	.progress-text {
		flex-basis: 60px;
		min-width: 60px;
		color: rgba(255, 255, 255, 0.7);
	}
	/* Progress Styling */

	progress:not(value) {
		/* Add your styles here. As part of this walkthrough we will focus only on determinate progress bars. */
	}

	/* Styling the determinate progress element */

	progress[value] {
		/* Get rid of the default appearance */
		appearance: none;

		/* This unfortunately leaves a trail of border behind in Firefox and Opera. We can remove that by setting the border to none. */
		border: none;

		/* Add dimensions */
		width: 100%;
		height: 20px;

		/* Although firefox doesn't provide any additional pseudo class to style the progress element container, any style applied here works on the container. */
		background-color: rgb(0, 0, 0);
		border-radius: 3px;
		box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5) inset;

		/* Of all IE, only IE10 supports progress element that too partially. It only allows to change the background-color of the progress value using the 'color' attribute. */
		color: royalblue;

		position: relative;
		margin: 1em 0 1.5em;
	}

	/*
Webkit browsers provide two pseudo classes that can be use to style HTML5 progress element.
-webkit-progress-bar -> To style the progress element container
-webkit-progress-value -> To style the progress element value.
*/

	progress[value]::-webkit-progress-bar {
		background-color: rgb(0, 0, 0);
		border-radius: 3px;
		box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5) inset;
	}

	progress[value]::-webkit-progress-value {
		position: relative;

		background-size: 35px 20px, 100% 100%, 100% 100%;
		border-radius: 3px;

		/* Let's animate this */
		/* animation: animate-stripes 5s linear infinite; */
	}

	@keyframes animate-stripes {
		100% {
			background-position: -100px 0;
		}
	}

	/* Let's spice up things little bit by using pseudo elements. */

	progress[value]::-webkit-progress-value:after {
		/* Only webkit/blink browsers understand pseudo elements on pseudo classes. A rare phenomenon! */
		content: '';
		position: absolute;

		width: 5px;
		height: 5px;
		top: 7px;
		right: 7px;

		background-color: white;
		border-radius: 100%;
	}

	/* Firefox provides a single pseudo class to style the progress element value and not for container. -moz-progress-bar */

	progress[value]::-moz-progress-bar {
		background: var(--mid-blue);

		background-size: 35px 20px, 100% 100%, 100% 100%;
		border-radius: 3px;

		/* Firefox doesn't support CSS3 keyframe animations on progress element. Hence, we did not include animate-stripes in this code block */
	}

	/* Fallback technique styles */
	.progress-bar {
		background-color: #000;
		border-radius: 3px;
		box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5) inset;

		/* Dimensions should be similar to the parent progress element. */
		width: 100%;
		height: 20px;
	}

	.progress-bar span {
		background-color: royalblue;
		border-radius: 3px;

		display: block;
		text-indent: -9999px;
	}
</style>
