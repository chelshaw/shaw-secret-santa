<script lang="ts">
	import questions from '$lib/questions';
	import CandyCaneBox from '../../../components/candy-cane-box.svelte';

	export let data;
	const answers = data.answers || [];
</script>

{#if data.error}
	<CandyCaneBox>
		<div class="error">
			<iframe
				src="https://giphy.com/embed/3o7TKt3Glad7JMf5MA"
				width="480"
				height="331"
				style=""
				frameBorder="0"
				class="giphy-embed"
				title="stern santa shaking his head"
				allowFullScreen
			/>
			<div class="hoverblock" />
			<div class="logoblock">
				<a title="logged in as {data.session?.user.user_metadata.name}" href="/logout">Log out</a>
			</div>
		</div>
	</CandyCaneBox>
{:else}
	<main>
		<CandyCaneBox>
			<h1>Your match is <span class="ul">{data.name}</span>!</h1>
			<hr />
			<h2>{data.name}'s answers:</h2>
			{#each answers as answer}
				<div class="answer">
					{questions[answer.q_key].option}:<br />
					<strong>{answer.answer}</strong>
				</div>
			{/each}
		</CandyCaneBox>
	</main>
{/if}

<style>
	.answer {
		border-bottom: 1px solid black;
		padding: 1em 0;
	}
	.ul {
		text-decoration: underline;
	}
	.error {
		width: fit-content;
		margin: 0 auto;
		position: relative;
		padding-top: 1em;
	}
	.hoverblock {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
	}
	.logoblock {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 40px;
		background-color: var(--cream);
		color: var(--green);
		padding-top: 0.5em;
	}
</style>
