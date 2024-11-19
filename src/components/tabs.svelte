<script lang="ts">
	export let current = '';
</script>

<div class="width tabs">
	<a href="/wishlist" class:active={current === 'wishlist'}>Wishlist</a>
	<a href="/settings" class:active={current === 'settings'}>Settings</a>
	<a href="/about" class:active={current === 'about'}>About</a>
</div>

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
	.tabs > a.active,
	.tabs > a:hover {
		background-color: var(--red);
		color: var(--cream);
	}
</style>
