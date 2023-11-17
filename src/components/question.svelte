<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import Error from './error.svelte';

	export let question: { label: string; key: string };
	export let answer = '';
	let errorMessage = '';
	let ref: HTMLElement;
	const dispatch = createEventDispatcher();

	onMount(() => {
		resize();

		return () => {};
	});

	// async function handleQuestion(event: { currentTarget: EventTarget & HTMLFormElement }) {
	// 	const data = new FormData(event.currentTarget);
	// 	const answer = data.get(question.key);

	// 	dispatch('message', {
	// 		key: question.key,
	// 		answer
	// 	});
	// }
	function handleNext(idx: number) {
		dispatch('navigate', {
			num: idx
		});
	}
	function resize() {
		ref.style.height = '0';
		ref.style.height = ref.scrollHeight + 12 + 'px';
	}
	async function handleKeydown(
		event: KeyboardEvent & { currentTarget: EventTarget & HTMLTextAreaElement }
	) {
		const shouldSubmit = event.key === 'Enter' && !event.shiftKey;
		if (!shouldSubmit) return;
		event.preventDefault();
		const submitEvent = new Event('submit', { cancelable: true });
		event.currentTarget?.form?.dispatchEvent(submitEvent);
	}
</script>

<form
	method="post"
	action="/account/wishlist?/update"
	class="question"
	use:enhance={({ formData }) => {
		return async ({ result }) => {
			errorMessage = '';
			if (result.status === 200) {
				const val = formData.get(question.key);
				dispatch('message', {
					key: question.key,
					answer: val
				});
			} else {
				errorMessage = 'Something went wrong updating your wishlist. Please try again later.';
			}
		};
	}}
>
	<label for={question.key}>{question.label}</label>
	<textarea
		bind:value={answer}
		name={question.key}
		id={question.key}
		on:keydown={handleKeydown}
		on:input={resize}
		bind:this={ref}
	/>
	<input name="key" value={question.key} type="hidden" />
	<p class="instruction">Shift + Enter to make a new line</p>
	{#if errorMessage}
		<Error>{errorMessage}</Error>
	{/if}
	<button type="button" on:click={() => handleNext(-1)}>Previous</button>
	<button class="primary" type="submit">Next</button>
</form>

<style>
	.instruction {
		font-size: 0.8em;
		color: rgb(195, 227, 255);
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
