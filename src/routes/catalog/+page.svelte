<!-- src/routes/+page.svelte -->
<script lang="ts">
	import Catalog from '$lib/components/catalog/Catalog.svelte';
	import Header from '$lib/components/Header.svelte'; // Import the Header component
</script>

<svelte:head>
	<title>Product Catalog View - Users</title>
</svelte:head>

<main>
	<!-- Include the Header component here -->
	<Header />
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
