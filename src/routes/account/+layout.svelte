<script>
	import { page } from '$app/stores';
</script>

<nav>
	<ul>
		<li aria-current={$page.url.pathname === '/account' ? 'page' : undefined}>
			<a href="/account">Profile</a>
		</li>
		<li aria-current={$page.url.pathname === '/account/wishlist' ? 'page' : undefined}>
			<a href="/account/wishlist">Wishlist</a>
		</li>
		<li aria-current={$page.url.pathname === '/account/match' ? 'page' : undefined}>
			<a href="/account/match">Match</a>
		</li>
	</ul>
</nav>
<slot />

<style>
	nav {
		width: 100%;
		padding: 12px;
		background: var(--darkest-blue);
	}
	nav ul {
		padding: 0;
		margin: 0;
		list-style: none;
		display: flex;
		justify-content: flex-start;
		align-items: baseline;
		margin: 0 auto;
		max-width: var(--content-width);
		padding: 0 24px;
	}
	nav li a {
		color: inherit;
	}
	nav li {
		padding: 8px 12px;
		color: white;
		margin-right: 1rem;
		transition: all 0.5s ease;
		border-radius: 5px;
	}
	nav li:hover {
		background: var(--light-blue);
		color: var(--darkest-blue);
	}
	li[aria-current='page'] {
		background-color: var(--light-blue);
		color: var(--darkest-blue);
	}
</style>
