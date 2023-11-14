<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	export let data;
	export let form;

	let { session, supabase, profile } = data;
	$: ({ session, supabase, profile } = data);
	$: emptyWishlist =
		Object.keys(data.questions || {})
			.reduce((prev, key) => {
				prev += profile ? profile[key] || '' : '';
				return prev;
			}, '')
			.trim() === '';

	let profileForm: HTMLFormElement;
	let loading = false;
	let name: string = profile?.name ?? '';

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
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
	<h1>Profile {emptyWishlist}</h1>
	{#if emptyWishlist}
		<div class="info">
			Your wishlist is empty! <a href="/account/wishlist/create">Fill it out now</a>.
		</div>
	{/if}
	<div class="form-widget">
		<form
			class="form-widget"
			method="post"
			action="?/update"
			use:enhance={handleSubmit}
			bind:this={profileForm}
		>
			<div>
				<label for="email">Email</label>
				<input id="email" type="text" value={session.user.email} disabled />
			</div>

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

		<form method="post" action="?/signout" use:enhance={handleSignOut}>
			<div>
				<button class="button block" disabled={loading}>Sign Out</button>
			</div>
		</form>
	</div>
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
</style>
