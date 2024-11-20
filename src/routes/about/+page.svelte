<script>
	import CandyCaneBox from '../../components/candy-cane-box.svelte';
	import Tabs from '../../components/tabs.svelte';
</script>

<Tabs current="about" />
<CandyCaneBox>
	<h1>About</h1>
	<p>This is the Shaw Family Secret Santa.</p>
	<p>
		Yes, there are other secret santa websites, but this one is crafted with love by Chelsea ☺️ If
		you have any issues, please reach out to her.
	</p>
	<p>Spend limit is <strong>$30</strong> -- keep that in mind as you build your wishlist!</p>
	<p>
		Matches are sent on Thanksgiving via email -- <strong>make sure your email is correct</strong>
		in the <a href="/settings">Settings</a> tab.
	</p>
	<p>
		Secret Santa gifts will be exchanged on Christmas Eve (more details to come). We also do a <a
			href="https://www.whiteelephantrules.com/"
			target="_blank"
			rel="noreferrer noopener">white elephant exchange</a
		> with a cheap or found-around-the-house item.
	</p>
	<p>Have fun! 🎅🏼</p>
	<hr />
</CandyCaneBox>

<style>
	h1 {
		margin: 0;
	}
</style>
