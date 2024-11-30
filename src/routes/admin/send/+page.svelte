<script lang="ts">
	import { clickToCopy } from '$lib/click-to-copy';
	import CandyCaneBox from '../../../components/candy-cane-box.svelte';
	import Error from '../../../components/error.svelte';

	export let data: { profiles: { name: string; email: string; match: string }[] };
	let text = '';

	$: uncleanDataError = data.profiles.some((p) => !p.match || !p.email);
	$: emails = data.profiles.map((profile) => ({
		sent: false,
		to: profile.email,
		content: `Hey, Santa ${profile.name}!<br/><br/>You have been assigned your person to shop for. Remember that the spend limit is $30.<br/><br/>All your person's details and questionnaire answers can be found at your unique URL: <a href="https://shaw-secret-santa.vercel.app/match/${profile.match}">https://shaw-secret-santa.vercel.app/match/${profile.match}</a>.<br/><br/>Happy gifting! If you have any issues please reach out.</br>- Chelsea`
	}));

	function copySuccess() {
		text = 'Copy success!';
		setTimeout(() => {
			text = '';
		}, 3000);
	}
	function copyError() {
		text = 'Copy error!';
		setTimeout(() => {
			text = '';
		}, 3000);
	}
</script>

<svelte:window on:copysuccess={copySuccess} on:copyerror={copyError} />

<main>
	<CandyCaneBox>
		<h1>Admin panel</h1>
		{#if text}
			<p class="copy-msg"><strong>{text}</strong></p>
		{/if}
		<hr />
		<h2>Send emails</h2>
		{#if uncleanDataError}
			<Error>One or more profiles is missing email or match. Resolve before continuing.</Error>
			<pre>{data.profiles}</pre>
		{:else}
			<p>
				<em>
					Instructions: Copy the contents and send individual emails for each participant. Do not
					reload the page, or "sent" status will be reset.</em
				>
			</p>
			{#each emails as email}
				<div class:sent={email.sent}>
					<h3>Email</h3>
					<p class="copyable" use:clickToCopy>{email.to}</p>
					<h3>Subject</h3>
					<p class="copyable" use:clickToCopy>
						You've been matched for Shaw Secret Santa 2024! 🎁🎉
					</p>
					<h3>Contents</h3>
					<pre class="copyable" use:clickToCopy>{@html email.content}</pre>
					<button on:click={() => (email.sent = true)}>Mark sent</button>
				</div>
			{/each}
		{/if}
	</CandyCaneBox>
</main>

<style>
	pre {
		text-wrap: wrap;
		color: inherit;
	}
	div {
		padding: 10px 0;
		border: 1px solid black;
	}
	.sent {
		color: gray;
	}
	.copy-msg {
		position: absolute;
		border: 3px solid black;
		background-color: var(--cream);
		padding: 1em;
		bottom: 2em;
		right: 2em;
	}
	.copyable:hover {
		cursor: copy;
	}
</style>
