<script lang="ts">
	import { onMount } from 'svelte';

	export let label = '';
	export let subtext = '';
	export let answer = '';
	export let onChange = (evt: Event) => {};
	export let onBlur = (evt: Event) => {};
	let ref: HTMLElement;

	function resize() {
		if (!ref) {
			return;
		}
		ref.style.height = '0';
		ref.style.height = ref.scrollHeight + 6 + 'px';
	}

	function onInput(evt: Event) {
		onChange(evt);
		resize();
	}

	onMount(() => {
		resize();

		return () => {};
	});
</script>

<label for="answer">
	{label}
	{#if subtext}
		<span>{subtext}</span>
	{/if}
</label>
<textarea
	bind:value={answer}
	name="answer"
	id="answer"
	on:input={onInput}
	on:blur={onBlur}
	bind:this={ref}
/>

<style>
	label,
	textarea {
		display: block;
	}
	span {
		font-size: 0.8rem;
		color: gray;
		display: block;
	}
	textarea {
		display: block;
		width: 100%;
		font-family: inherit;
		outline: none;
		padding: 8px;
		margin: 8px 0px;
		resize: none;
		border-radius: 6px;
		border: 2px solid transparent;
	}
	textarea:focus {
		border: 2px dashed var(--green);
	}
</style>
