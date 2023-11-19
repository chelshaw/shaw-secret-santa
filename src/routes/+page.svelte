<svelte:head>
	<title>🎅🏻 Shaw Secret Santa 2023 🎅🏾</title>
</svelte:head>

<main>
	<h1>
		Welcome to<br />
		🎅🏻🧑🏽‍🎄 Shaw Secret Santa 2023 🧑🏼‍🎄🎅🏾
	</h1>
	<div class="row">
		<div class="dancing">🎄</div>
		<div class="dancing-rev">🎁</div>
		<div class="dancing">🎄</div>
		<div class="dancing-rev">🎁</div>
		<div class="dancing">🎄</div>
		<div class="dancing-rev">🎁</div>
		<div class="dancing">🎄</div>
		<div class="dancing-rev">🎁</div>
		<div class="dancing">🎄</div>
		<div class="dancing-rev">🎁</div>
	</div>
	<p class="description">If you run into issues, please reach out to Chelsea.</p>
	<a href="/login" class="button primary">Go to log in</a>
</main>

<style>
	main {
		text-align: center;
	}
	.row {
		display: flex;
		justify-content: space-between;
	}
	.description {
		font-size: 1.4rem;
	}

	@keyframes dance {
		0%,
		100% {
			transform: rotate(-20deg);
		}
		50% {
			transform: rotate(20deg);
		}
	}
	@keyframes dance-rev {
		0%,
		100% {
			transform: rotate(20deg);
		}
		50% {
			transform: rotate(-20deg);
		}
	}
	.dancing {
		display: inline-block;
		font-size: 36px;
		transform-origin: center;
		animation: dance 3s ease-in-out infinite alternate;
		/* , nudge 5s linear infinite alternate; */
	}
	.dancing-rev {
		display: inline-block;
		font-size: 36px;
		transform-origin: center;
		animation: dance-rev 3s ease-in-out infinite alternate;
		/* , nudge 5s linear infinite alternate; */
	}
	@media (prefers-reduced-motion) {
		.dancing,
		.dancing-rev {
			animation: none;
		}
	}
</style>
