<script lang="ts">
	import { enhance } from '$app/forms';
	import questions from '$lib/questions';
	import Error from './error.svelte';
	import Textarea from './textarea.svelte';

	export let unanswered: string[];
	export let onSuccess: CallableFunction;
	$: chosen = '';
	$: answer = '';
	$: errorMessage = '';
</script>

<form
	method="POST"
	action="/wishlist?/add"
	use:enhance={({ formData }) => {
		errorMessage = '';

		return async ({ result, update }) => {
			if (result.type === 'success') {
				const q_key = formData.get('qKey');
				const answer = formData.get('answer');
				onSuccess({ q_key, answer, id: result.data?.answerId });
				update();
				chosen = '';
			} else {
				errorMessage = 'An error occurred. Please try again later.';
			}
		};
	}}
>
	{#if chosen}
		<Textarea label={questions[chosen].label} subtext={questions[chosen].subtext} {answer} />
		<input type="hidden" name="qKey" value={chosen} />
		<div class="btn-group">
			<button class="btn" type="button" on:click={() => (chosen = '')}>Change question</button>
			<input class="btn btn--green" type="submit" value="Save" />
		</div>
		{#if errorMessage}
			<Error>{errorMessage}</Error>
		{/if}
	{:else}
		<select name="qKey" bind:value={chosen}>
			<option value="" selected>Choose a question</option>
			{#each unanswered as r}
				<option value={r}>{questions[r].option}</option>
			{/each}
		</select>
	{/if}
</form>

<style>
	form {
		margin: 0.5em 0;
	}
	select {
		display: block;
		width: 100%;
		padding: 0.5em 1em;
		border-radius: var(--custom-border-radius);
		width: 100%;
	}
</style>
