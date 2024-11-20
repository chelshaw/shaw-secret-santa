<script lang="ts">
	export let debug = 'No debug info';
</script>

<div class="error" data-debug={debug}>
	<slot />
</div>

<style>
	.error {
		background: var(--red);
		border: 5px dashed var(--dark-red);
		border-radius: var(--custom-border-radius);
		color: var(--cream);
		padding: 1rem;
		margin: 6px 0;
	}
</style>
