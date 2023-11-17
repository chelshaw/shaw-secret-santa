<script lang="ts">
	export let label = '';
	export let value = '';
	export let name = '';
	export let type = 'text';
</script>

<label for={name}>{label}</label>
<input id={name} {name} {value} {type} />

<style>
	input[type='text'],
	input[type='email'] {
		background: transparent;
		color: white;
		margin-bottom: 24px;
	}
</style>
