<script lang="ts">
	import type { PageData } from '../$types';
	$: emptyWishlist =
		Object.keys(wishlist)
			.reduce((prev, key) => {
				prev += wishlist[key] || '';
				return prev;
			}, '')
			.trim() === '';
	export let data: PageData;

	const wishlist = {
		need: '',
		hobbies: '',
		style: '',
		color: '',
		genres: '',
		brands: '',
		diet: '',
		pamper: '',
		...data.profile?.wishlist
	};

	const questions = data.questions;
</script>

<main>
	<h1>My wishlist</h1>
	{#if emptyWishlist}
		<p>Your wishlist is empty!</p>
		<a href="/account/wishlist/create">Start now</a>
	{:else}
		{#each questions as question}
			<p>{question.label}</p>
			<p>{wishlist[question.key]}</p>
		{/each}
	{/if}
</main>

<style>
	main {
		max-width: 600px;
		margin: 0 auto;
		display: flex;
		max-height: 100vh;
		flex-direction: column;
	}
	label {
		color: white;
	}
	.viewport {
		height: 70vh;
		overflow: clip;
		position: relative;
	}
	.questions {
		position: absolute;
		top: 0px;
		right: 0px;
		left: 0px;
	}
	.question {
		height: 1000px;
		padding: 24px 0;
	}
</style>
