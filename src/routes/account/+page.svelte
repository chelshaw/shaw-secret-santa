<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import Input from '../../components/input.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { fade } from 'svelte/transition';

	export let data;
	export let form;
	let { session, supabase, profile, santas } = data;
	$: ({ session, supabase, profile, santas } = data);
	$: emptyWishlist =
		data.questions
			.reduce((prev, q) => {
				prev += profile ? profile[q.key] || '' : '';
				return prev;
			}, '')
			.trim() === '';
	$: santaList = (santas || [])?.filter((santa) => santa.name !== profile.name);
	let profileForm: HTMLFormElement;
	let loading = false;
	let name: string = form?.name ?? profile?.name ?? '';

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};

	const handleSignOut: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<main>
	{#if !profile.name}
		<div transition:fade={{ delay: 50, duration: 300 }}>
			<h2>Hey! What's your name?</h2>
			<form method="post" action="?/update" use:enhance={handleSubmit} bind:this={profileForm}>
				<Input name="name" value={name} label="Name" />
				<div>
					<input
						type="submit"
						class="button block primary"
						value={loading ? 'Loading...' : 'Update'}
						disabled={loading}
					/>
				</div>
			</form>
		</div>
	{:else if emptyWishlist}
		<div transition:fade={{ delay: 150, duration: 300 }}>
			<h2>🎅🏻 Welcome, {profile.name}! 🎅🏻</h2>
			{#if emptyWishlist}
				<div class="info">
					Your wishlist is empty! <a href="/account/wishlist/create">Fill it out now</a>.
				</div>
			{/if}
		</div>
	{:else}
		<div transition:fade={{ delay: 150, duration: 300 }}>
			<form method="post" action="?/update" use:enhance={handleSubmit} bind:this={profileForm}>
				<Input name="name" value={name} label="Name" />
				<Input name="email" value={session.user.email} label="Email" disabled />
				<div>
					<input
						type="submit"
						class="button block primary"
						value={loading ? 'Loading...' : 'Update'}
						disabled={loading}
					/>
				</div>
			</form>
			<div>
				<a href="/account/wishlist" class="button block">Edit wishlist</a>
			</div>
		</div>
	{/if}
	<div class="santas">
		<h2>Who else has signed up?</h2>
		<ul>
			{#each santaList as santa}
				<li>{santa.name}</li>
			{:else}
				No one else has signed up yet
			{/each}
		</ul>
	</div>
	<form method="post" action="?/signout" use:enhance={handleSignOut}>
		<div>
			<button class="button block" disabled={loading}>Sign Out</button>
		</div>
	</form>
</main>

<style>
	form {
		margin-bottom: 24px;
	}
	.santas {
		margin: 36px 0;
		padding: 8px 16px;
		background: rgba(255, 255, 255, 0.2);
	}
	.info {
		background: rgb(150, 181, 235);
		border: 1px solid rgb(43, 89, 168);
		border-radius: 0.5em;
		color: rgb(0, 0, 6);
		padding: 1rem;
	}
	.info a {
		color: rgb(4, 0, 66);
	}
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
		border: medium;
		outline: none;
		border-radius: 0px;
		appearance: none;
		background: transparent;
		/* background-position: 0% 0%;
		background-repeat: repeat;
		background-attachment: scroll;
		background-image: none;
		background-size: auto;
		background-origin: padding-box;
		background-clip: border-box; */
		transform: translateZ(0px);
		font-size: 30px;
		-moz-osx-font-smoothing: grayscale;
		line-height: unset;
		-webkit-text-fill-color: rgb(255, 255, 255);
		/* background-color: transparent !important; */
		animation: 1ms ease 0s 1 normal none running native-autofill-in;
		box-shadow: rgba(83, 147, 102, 0.3) 0px 1px;
	}
</style>
