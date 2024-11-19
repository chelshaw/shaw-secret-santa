<script lang="ts">
	import { enhance } from '$app/forms';
	import questions from '$lib/questions';
	import CandyCaneBox from './candy-cane-box.svelte';
	import Error from './error.svelte';
	import Textarea from './textarea.svelte';

	export let key = '';
	export let a = '';
	export let answerId: number;
	export let onRemove: CallableFunction;
	let saved = false;
	let error = '';
	let removeError = '';
	let confirmation: HTMLDialogElement;
</script>

<form
	class="answer"
	method="POST"
	action="/wishlist?/update"
	use:enhance={() => {
		return async ({ result }) => {
			saved = false;
			error = '';
			if (result.type === 'success') {
				saved = true;
				await setTimeout(() => {
					saved = false;
				}, 3000);
			} else if (result.type === 'failure') {
				error = 'Error occurred, contact Chelsea';
			}
		};
	}}
>
	<Textarea label={questions[key].label} subtext={questions[key].subtext} answer={a} />
	<input name="answerId" type="hidden" value={answerId} />
	<div class="btn-group">
		<button
			class="btn btn--red"
			type="button"
			on:click={() => {
				confirmation.showModal();
				removeError = '';
			}}>❌ Remove</button
		>
		<div class="save-btn">
			{#if saved}
				<span class="saved">✅ Saved</span>
			{/if}
			<input class="btn btn--green" type="submit" value="Save" />
		</div>
	</div>
	{#if error}
		<Error>{error}</Error>
	{/if}
</form>
<dialog bind:this={confirmation}>
	<CandyCaneBox>
		<form
			method="POST"
			action="/wishlist?/remove"
			use:enhance={() => {
				return async ({ result }) => {
					removeError = '';
					if (result.type === 'success') {
						onRemove(result.data?.answerId);
						confirmation.close();
					} else if (result.type === 'failure') {
						removeError = 'Could not remove -- contact Chelsea';
					}
				};
			}}
		>
			<p class="confirm">Are you sure?</p>
			<input name="answerId" type="hidden" value={answerId} />
			<div class="btn-group">
				<button type="button" on:click={() => confirmation.close()} class="btn">No, cancel</button>
				<input type="submit" value="Yes, remove" class="btn btn--red" />
			</div>
			{#if removeError}
				<Error>{removeError}</Error>
			{/if}
		</form>
	</CandyCaneBox>
</dialog>

<style>
	form.answer {
		border: 1px solid var(--green);
		padding: 0.5em;
		margin: 0.5em 0;
		border-radius: var(--custom-border-radius);
		position: relative;
	}
	input {
		display: block;
	}
	span {
		font-size: 0.8rem;
		color: gray;
		display: block;
	}
	input[type='submit'] {
		width: auto;
		padding: 0.5em 1em;
		border-radius: var(--custom-border-radius);
	}

	.save-btn {
		display: flex;
		justify-content: end;
		align-items: baseline;
		gap: 1em;
	}
	::backdrop {
		background-image: linear-gradient(45deg, var(--red), black, var(--green));
		opacity: 0.75;
	}
	dialog {
		/* matches candy cane outer */
		border-radius: 30px;
		padding: 0;
		border: none;
	}
	p.confirm {
		margin-top: 0;
	}
</style>
