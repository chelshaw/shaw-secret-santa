<script lang="ts">
	export let email = '';
</script>

<form class="email-banner" method="POST" action="/wishlist?/email">
	<label for="email">
		Confirm your email
		<span>
			When your Santa is assigned you will get an email about it at the address you provide here:
		</span>
	</label>
	<input id="email" type="email" name="email" bind:value={email} />
	<input type="submit" value="Confirm" class="btn btn--green" />
</form>

<style>
	input {
		width: 100%;
		padding: 0.5em 1em;
		border-radius: var(--custom-border-radius);
		margin: 0.5em 0;
	}
	span {
		display: block;
		color: gray;
		font-size: 0.8em;
	}
</style>
