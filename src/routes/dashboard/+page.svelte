<!-- src/routes/+page.svelte -->
<script lang="ts">
	import Catalog from '$lib/components/catalog/Catalog.svelte';
</script>

<svelte:head>
	<title>Interactive Product Catalog</title>
</svelte:head>

<main>
	<Catalog />
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell,
			'Helvetica Neue', sans-serif;
	}
</style>
