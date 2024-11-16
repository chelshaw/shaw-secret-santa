<script lang="ts">
	import { enhance } from '$app/forms';

	export let email = '';
	let saved = false;
</script>

<form
	class="email-banner"
	method="POST"
	action="/wishlist?/email"
	use:enhance={() => {
		return async ({ result }) => {
			if (result.type === 'success') {
				saved = true;
				await setTimeout(() => {
					saved = false;
				}, 3000);
			}
		};
	}}
>
	{#if saved}<span class="saved">✅ Saved</span>{/if}
	<label for="email">
		Confirm your email
		<span class="subtext">
			When your Santa is assigned you will get an email about it at the address you provide here:
		</span>
	</label>
	<input id="email" type="email" name="email" bind:value={email} />
	<input type="submit" value="Confirm" class="btn btn--green" />
</form>

<style>
	form {
		position: relative;
	}
	.saved {
		position: absolute;
		font-size: 0.6em;
		right: 0px;
		color: var(--green);
	}
	input {
		width: 100%;
		padding: 0.5em 1em;
		border-radius: var(--custom-border-radius);
		margin: 0.5em 0;
	}
	.subtext {
		display: block;
		color: gray;
		font-size: 0.8em;
	}
</style>
