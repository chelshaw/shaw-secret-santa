<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import Error from './error.svelte';

	export let question: { label: string; key: string };
	export let answer = '';
	let ref: HTMLElement;
	let errorMessage = '';
	let saved = false;
	const dispatch = createEventDispatcher();

	onMount(() => {
		resize();

		return () => {};
	});

	function handleNext(idx: number) {
		dispatch('navigate', {
			num: idx
		});
	}
	function resize() {
		ref.style.height = '0';
		ref.style.height = ref.scrollHeight + 6 + 'px';
	}
	async function handleKeydown(
		event: FocusEvent & { currentTarget: EventTarget & HTMLTextAreaElement }
	) {
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
				saved = true;
				await setTimeout(() => {
					saved = false;
				}, 3000);
			} else {
				errorMessage = 'Something went wrong updating your wishlist. Please try again later.';
			}
		};
	}}
>
	{#if saved}
		<span class="saved">✅ Saved</span>
	{/if}
	<input name="key" value={question.key} type="hidden" />
	<label for={question.key}>{question.label}</label>
	<textarea
		bind:value={answer}
		name={question.key}
		id={question.key}
		on:blur={handleKeydown}
		on:input={resize}
		bind:this={ref}
		placeholder="No answer"
	/>
	{#if errorMessage}
		<Error>{errorMessage}</Error>
	{/if}
</form>

<style>
	form {
		position: relative;
		margin: 8px 0 24px 0;
	}
	.saved {
		position: absolute;
		top: 0;
		right: 0;
		color: #ffffff;
		font-size: 0.8em;
	}
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
		border: 1px solid white;
		box-shadow: none;
		outline: none;
		padding: 8px;
		resize: none;
		border-radius: 6px;
	}
	/* textarea:focus {
		border: none;
		-webkit-box-shadow: 0 0 20px white;
		-moz-box-shadow: 0 0 20px white;
		box-shadow: 0 0 20px white;
	} */
</style>
