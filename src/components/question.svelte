<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	export let question: { label: string; key: string };
	const dispatch = createEventDispatcher();
	let ref: HTMLElement;
	export let answer = '';

	onMount(() => {
		resize();

		return () => {};
	});

	async function handleQuestion(event: { currentTarget: EventTarget & HTMLFormElement }) {
		const data = new FormData(event.currentTarget);
		const answer = data.get(question.key);

		dispatch('message', {
			key: question.key,
			answer
		});
	}
	function handleNext(idx: number) {
		dispatch('navigate', {
			num: idx
		});
	}
	function resize() {
		ref.style.height = '0';
		ref.style.height = ref.scrollHeight + 12 + 'px';
	}
	interface FormChild extends KeyboardEvent {
		target: {
			form: EventTarget;
		};
	}
	async function handleKeydown(event: FormChild) {
		if (event.key !== 'Enter') return;

		event.preventDefault();
		const submitEvent = new Event('submit', { cancelable: true });
		event.target?.form.dispatchEvent(submitEvent);
	}
</script>

<form method="post" on:submit|preventDefault={handleQuestion} class="question">
	<label for={question.key}>{question.label}</label>
	<!-- <input type="text" name={question.key} id={question.key} /> -->
	<textarea
		value={answer}
		name={question.key}
		id={question.key}
		on:keydown={handleKeydown}
		on:input={resize}
		bind:this={ref}
	/>
	<button type="button" on:click={() => handleNext(-1)}>Previous</button>
	<button type="submit">Next</button>
</form>

<style>
	form {
		/* padding: 20px; */
	}
	label {
		color: white;
	}
	input[type='text'] {
		display: block;
		width: 100%;
		font-family: inherit;
		color: rgb(83, 147, 102);
		padding-block-start: 0px;
		padding-block-end: var(--spacing-100);
		padding-inline: 0px;
		padding: 12px 0;
		margin: 12px 0;
		border: medium;
		outline: none;
		border-radius: 0px;
		appearance: none;
		background-position: 0% 0%;
		background-repeat: repeat;
		background-attachment: scroll;
		background-image: none;
		background-size: auto;
		background-origin: padding-box;
		background-clip: border-box;
		transform: translateZ(0px);
		font-size: 30px;
		-moz-osx-font-smoothing: grayscale;
		line-height: unset;
		-webkit-text-fill-color: rgb(83, 147, 102);
		background-color: transparent !important;
		animation: 1ms ease 0s 1 normal none running native-autofill-in;
		transition: background-color 100000000s ease 0s, box-shadow 0.1s ease-out 0s;
		box-shadow: rgba(83, 147, 102, 0.3) 0px 1px;
	}
	textarea {
		display: block;
		width: 100%;
		font-family: inherit;
		color: white;
		background-color: transparent;
		border: none;
		box-shadow: none;
		font-size: 30px;
		outline: none;
		border-bottom: 2px solid white;
		padding: 12px 0;
		margin: 12px 0;
		resize: none;
	}
	/* textarea:focus {
		border: none;
		-webkit-box-shadow: 0 0 20px white;
		-moz-box-shadow: 0 0 20px white;
		box-shadow: 0 0 20px white;
	} */
</style>
