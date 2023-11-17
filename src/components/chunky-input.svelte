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
		display: block;
		width: 100%;
		font-family: inherit;
		color: rgb(255, 255, 255);
		padding-block-start: 0px;
		padding-block-end: var(--spacing-100);
		padding-inline: 0px;
		padding: 12px 0;
		margin: 12px 0;
		border: none;
		border-bottom: 1px solid white;
		outline: none;
		border-radius: 0px;
		appearance: none;
		background: transparent;
		transform: translateZ(0px);
		font-size: 30px;
		-moz-osx-font-smoothing: grayscale;
		line-height: unset;
		-webkit-text-fill-color: rgb(255, 255, 255);
		animation: 1ms ease 0s 1 normal none running native-autofill-in;
		box-shadow: rgba(83, 147, 102, 0.3) 0px 1px;
	}
</style>
