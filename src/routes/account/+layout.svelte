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
	</ul>
</nav>
<slot />

<style>
	nav {
		margin: 0 auto;
		max-width: var(--content-width);
		padding: 0 24px;
	}
	nav ul {
		padding: 0;
		margin: 0;
		list-style: none;
		display: flex;
		justify-content: flex-start;
		align-items: baseline;
	}
	nav li {
		padding: 8px 12px 8px 0;
	}
	li[aria-current='page'] a {
		color: rgb(160, 205, 245);
	}
</style>
