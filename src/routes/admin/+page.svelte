<script lang="ts">
	import CandyCaneBox from '../../components/candy-cane-box.svelte';

	export let data;
</script>

<main>
	<CandyCaneBox>
		<h1>Admin panel</h1>
		<hr />
		<h2>Current matches ({data.current.table})</h2>
		<div>
			{data.current?.matches.length} matches out of {data.profiles?.length} total profiles
			{#if 0 < data.current?.matches.length}
				<form method="POST" action="?/clear">
					<input
						name="santas"
						type="hidden"
						value={data.current?.matches.map((m) => m.santa).join(',')}
					/>
					<input type="submit" value="clear" />
				</form>
			{/if}
		</div>
	</CandyCaneBox>
</main>

<style>
	form {
		margin-top: 1em;
	}
</style>
