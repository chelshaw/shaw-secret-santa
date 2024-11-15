<script lang="ts">
	import { onMount } from "svelte";

    export let label = '';
    export let subtext = '';
    export let answer = '';
    let ref: HTMLElement;

    function resize() {
		if (!ref) {
			return;
		}
		ref.style.height = '0';
		ref.style.height = ref.scrollHeight + 6 + 'px';
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
<textarea bind:value={answer} name="answer" id="answer" on:input={resize} bind:this={ref}></textarea>

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