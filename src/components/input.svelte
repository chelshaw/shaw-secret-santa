<script lang="ts">
	export let label = '';
	export let value = '';
	export let name = '';
	export let type = 'text';
	export let disabled = false;
</script>

{#if disabled}
	<label for={name}>{label}</label>
	<input id={name} {name} {value} {type} disabled />
{:else}
	<label for={name}>{label}</label>
	<input id={name} {name} {value} {type} />
{/if}

<style>
	input[type='text'],
	input[type='email'] {
		background: transparent;
		color: white;
		margin-bottom: 24px;
		padding: 8px;
	}
	input:disabled {
		background: rgba(255, 255, 255, 0.3);
		color: rgba(255, 255, 255, 0.8);
	}
</style>
