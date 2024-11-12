<div class="width outer">
	<div class="inner">
		<slot />
	</div>
</div>

<style>
	.outer {
		background-color: var(--red);
		background-image: linear-gradient(
			45deg,
			var(--cream) 25%,
			transparent 25.5%,
			transparent 50%,
			var(--cream) 50.5%,
			var(--cream) 75%,
			transparent 75.5%,
			transparent
		);
		background-size: 20px 20px;
		padding: 1em;
		border-radius: 30px;
	}
	.inner {
		background: var(--cream);
		padding: 1em;
		border-radius: var(--custom-border-radius);
		/* box-shadow: inset 0 0 5px var(--black); */
	}
</style>
