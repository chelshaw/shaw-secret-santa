<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import { updated } from '$app/stores';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { fade } from 'svelte/transition';

	export let data;
	export let form;

	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);
	$: emptyWishlist =
		data.questions
			.reduce((prev, q) => {
				prev += profile ? profile[q.key] || '' : '';
				return prev;
			}, '')
			.trim() === '';

	let profileForm: HTMLFormElement;
	let loading = false;
	let name: string = profile?.name ?? '';

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
	<h1>Profile</h1>
	{#if !profile.name}
		<div transition:fade={{ delay: 50, duration: 300 }}>
			<p>Hey! What's your name?</p>
			<form
				class="form-widget"
				method="post"
				action="?/update"
				use:enhance={handleSubmit}
				bind:this={profileForm}
			>
				<div>
					<label for="name">Name</label>
					<input id="name" name="name" type="text" value={form?.name ?? name} />
				</div>
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
			<h2>🎅🏻 Welcome {profile.name}! 🎅🏻</h2>
			{#if emptyWishlist}
				<div class="info">
					Your wishlist is empty! <a href="/account/wishlist/create">Fill it out now</a>.
				</div>
			{/if}
		</div>
	{:else}
		<div transition:fade={{ delay: 150, duration: 300 }}>
			<div class="form-widget">
				<form
					class="form-widget"
					method="post"
					action="?/update"
					use:enhance={handleSubmit}
					bind:this={profileForm}
				>
					<div>
						<label for="name">Name</label>
						<input id="name" name="name" type="text" value={form?.name ?? name} />
					</div>
					<div>
						<label for="email">Email</label>
						<input id="email" type="email" value={session.user.email} disabled />
					</div>

					<div>
						<input
							type="submit"
							class="button block primary"
							value={loading ? 'Loading...' : 'Update'}
							disabled={loading}
						/>
					</div>
				</form>

				<form method="post" action="?/signout" use:enhance={handleSignOut}>
					<div>
						<button class="button block" disabled={loading}>Sign Out</button>
					</div>
				</form>
			</div>
		</div>
	{/if}
</main>

<style>
	.info {
		background: aliceblue;
		border: 1px solid rgb(43, 89, 168);
		border-radius: 0.5em;
		color: rgb(4, 0, 66);
		padding: 1rem;
	}
	.info a {
		color: rgb(4, 0, 66);
	}
	label {
		color: white;
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
