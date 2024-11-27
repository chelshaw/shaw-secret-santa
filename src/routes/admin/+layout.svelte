<div class="width tabs">
	<a href="/wishlist">Back</a>
	<a href="/admin">Current</a>
	<a href="/admin/match">Match</a>
	<a href="/admin/send">Send</a>
</div>

<slot />

<style>
	.tabs {
		padding: 0 2em;
		display: flex;
		gap: 1em;
	}
	.tabs > a {
		padding: 0.5em 1em;
		background-color: var(--cream);
		border-radius: var(--custom-border-radius) var(--custom-border-radius) 0 0;
		color: var(--red);
	}
	.tabs > a:hover {
		background-color: var(--red);
		color: var(--cream);
	}
</style>
