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
	action="/wishlist?/update"
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
	label {
		font-weight: bold;
	}
	.saved {
		position: absolute;
		top: 0;
		right: 0;
		/* color: #ffffff; */
		font-size: 0.8em;
	}
	textarea {
		display: block;
		width: 100%;
		font-family: inherit;
		outline: none;
		padding: 8px;
		margin-top: 8px;
		resize: none;
		border-radius: 6px;
		border: 2px solid transparent;
	}
	textarea:focus {
		border: 2px dashed var(--green);
	}
</style>
