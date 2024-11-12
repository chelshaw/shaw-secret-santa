<div class="rope">
	{#each { length: 30 } as _}
		<div class="bulb" />
	{/each}
</div>

<style>
	.rope {
		/* LIGHTROPE */
		--globe-width: 12px;
		--globe-height: 28px;
		--globe-spacing: 40px;
		--globe-spread: 3px;
		--light-off-opacity: 0.4;

		border-top: 2px solid black;
		margin-top: 2rem;
		display: flex;
		justify-content: space-between;
	}
	.bulb {
		display: block;
		position: relative;
		width: var(--globe-width);
		height: var(--globe-height);
		border-radius: 50%;
		animation-duration: 4s;
		animation-fill-mode: both;
		animation-iteration-count: infinite;
	}
	.bulb:nth-child(odd) {
		background: rgba(246, 40, 40, 1);
		box-shadow: 0px calc(var(--globe-height) / 6) calc(var(--globe-width) * 2) var(--globe-spread)
			rgba(246, 40, 40, 1);
		animation-name: flash-odd;
	}
	.bulb:nth-child(even) {
		background: rgba(255, 250, 241, 1);
		box-shadow: 0px calc(var(--globe-height) / 6) calc(var(--globe-width) * 2) var(--globe-spread)
			rgba(255, 250, 241, 1);
		animation-name: flash-even;
	}
	.bulb:before {
		content: '';
		position: absolute;
		background: #222;
		width: calc(var(--globe-width) - 2);
		height: calc(var(--globe-height) / 3);
		border-radius: 3px;
		top: calc(0 - calc(var(--globe-height) / 6));
		left: 1px;
	}
	.bulb:after {
		content: '';
		top: -2px;
		left: 2px;
		position: absolute;
		width: 8px;
		height: 5px;
		border-radius: 1px;
		background-color: silver;
	}
	@keyframes flash-odd {
		0%,
		100% {
			background: rgba(246, 40, 40, 1);
			box-shadow: 0px calc(var(--globe-height) / 6) calc(var(--globe-width) * 2) var(--globe-spread)
				rgba(246, 40, 40, 1);
		}
		50% {
			background: rgba(246, 40, 40, var(--light-off-opacity));
			box-shadow: 0px calc(var(--globe-height) / 6) calc(var(--globe-width) * 2) var(--globe-spread)
				rgba(246, 40, 40, 0.2);
		}
	}
	@keyframes flash-even {
		0%,
		100% {
			background: rgba(255, 250, 241, var(--light-off-opacity));
			box-shadow: 0px calc(var(--globe-height) / 6) calc(var(--globe-width) * 2) var(--globe-spread)
				rgba(255, 250, 241, 0.2);
		}
		50% {
			background: rgba(255, 250, 241, 1);
			box-shadow: 0px calc(var(--globe-height) / 6) calc(var(--globe-width) * 2) var(--globe-spread)
				rgba(255, 250, 241, 1);
		}
	}
</style>
