<script lang="ts">
	import { enhance } from '$app/forms';
	import questions from '$lib/questions';
	import Textarea from './textarea.svelte';

	export let key = '';
	export let a = '';
	export let answerId = '';
	export let onRemove:CallableFunction;
	let saved = false;
</script>

<form method="POST" action="/wishlist?/update" use:enhance={({ formElement, formData, action, cancel, submitter }) => { 
	return async ({ result }) => {
		if (result.type === 'success') {
			if (result.data?.action === 'remove') {
				onRemove(result.data?.answerId)
			} else {
				saved = true;
				await setTimeout(() => {
					saved = false;
				}, 3000);
			}
		}
	};
}}>
	<Textarea label={questions[key].label} subtext={questions[key].subtext} answer={a} />
	<input name="answerId" type="hidden" value={answerId} />
	<div class="btn-group">
		<button class="btn btn--red" formaction="/wishlist?/remove">❌ Remove</button>
		<div class="save-btn">
			{#if saved}
				<span class="saved">✅ Saved</span>
			{/if}
			<input class="btn btn--green" type="submit" value="Save" />
		</div>
	</div>
</form>

<style>
	form {
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
</style>
