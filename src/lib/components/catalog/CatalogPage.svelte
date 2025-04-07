<!-- src/lib/components/catalog/CatalogPage.svelte -->
<script lang="ts">
	import type { CatalogPage } from '$lib/types';

	// Prop to pass the page data
	export let page: CatalogPage;
	export let isActive: boolean = false;
	export let index: number;

	// Placeholder for image URLs (in a real project, these would be actual images)
	// For development, we'll use placeholder colors
	const placeholderColors = ['#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da'];
	const bgColor = placeholderColors[index % placeholderColors.length];
</script>

<div class="catalog-page relative {isActive ? 'active' : ''}" style="background-color: {bgColor};">
	<!-- Page content -->
	<div class="page-content flex flex-col items-center justify-center h-full p-8">
		<h2 class="text-2xl font-bold mb-4">Page {index + 1}</h2>
		<p class="text-center mb-6">Catalog ID: {page.id}</p>

		<!-- Display hotspot positions (for development) -->
		<div class="text-sm text-gray-600 mb-4">
			{#if page.hotspots.length > 0}
				<p>Contains {page.hotspots.length} product hotspots</p>
			{:else}
				<p>No product hotspots on this page</p>
			{/if}
		</div>

		<!-- We'll add hotspots here in a later step -->

		<!-- Page number indicator -->
		<div class="absolute bottom-4 right-4 bg-white/70 px-3 py-1 rounded-full text-sm">
			{index + 1}
		</div>
	</div>
</div>

<style>
	.catalog-page {
		width: 100%;
		height: 100%;
		border-radius: 5px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		/* Hide overflow to prevent hotspots from appearing outside the page */
		overflow: hidden;
	}

	.catalog-page.active {
		/* Add subtle highlight to active page */
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
	}
</style>
