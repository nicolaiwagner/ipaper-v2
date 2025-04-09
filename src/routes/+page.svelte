<!-- src/routes/+page.svelte -->
<script lang="ts">
	import Welcome from '$lib/components/Welcome.svelte';
	import Header from '$lib/components/Header.svelte';
</script>

<svelte:head>
	<title>Interactive Product Catalog</title>
</svelte:head>

<Header />
<Welcome />
