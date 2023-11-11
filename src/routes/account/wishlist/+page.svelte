<script lang="ts">
	import type { PageData, ActionData } from '../$types';
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import Question from '../../../components/question.svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});
	export let data: PageData;
	// export let form: ActionData;

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

	const questions = [
		{ key: 'need', label: 'Is there something specific you want or need?' },
		{ key: 'hobbies', label: 'What are your hobbies or interests' },
		{ key: 'style', label: 'How would you describe your style' },
		{ key: 'genres', label: 'Favorite TV, movie, or book genres?' },
		{ key: 'brands', label: 'Any specific brands or stores you like to shop from?' },
		{ key: 'color', label: "What's your favorite color to wear?" },
		{ key: 'diet', label: 'Any dietary restrictions or preferences?' },
		{ key: 'pamper', label: 'Do you enjoy pampering yourself?' }
	];
	let currentIdx = 0;
	$: currentQuestion = questions[currentIdx];
	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		// const data = new FormData(event.currentTarget);
		// for (const key of data.keys()) {
		// 	console.log(key, data.get(key));
		// 	wishlist[key] = data.get(key);
		// }
		handleNext(1);
		return;
	}
	function handleClick() {
		console.log({ wishlist });
	}
	function handleNext(count: number) {
		currentIdx = currentIdx + count;
		progress.set(currentIdx * -1000);
	}
	function handleMessage(event: CustomEvent<{ key: string; answer: string }>) {
		console.log(event.detail.key);
		wishlist[event.detail.key] = event.detail.answer;
		handleNext(1);
	}
	// TODO: lifecycle > tick for textarea handling
</script>

<main>
	<h1>My wishlist {$progress}</h1>
	<!-- {#key currentQuestion}
		<div class="question">
			<Question on:message={handleMessage} question={currentQuestion} />
		</div>
	{/key} -->
	<div class="viewport">
		<div class="questions" style:top={$progress + 'px'}>
			{#each questions as question}
				<div class="question">
					<Question on:message={handleMessage} {question} />
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
		max-width: 600;
		margin: 0 auto;
	}
	label {
		color: white;
	}
	.viewport {
		height: 70vh;
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
