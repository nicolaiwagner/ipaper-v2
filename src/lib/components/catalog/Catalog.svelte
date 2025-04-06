<!-- src/lib/components/catalog/Catalog.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import {
		currentPageIndex,
		totalPages,
		nextPage,
		previousPage,
		goToPage
	} from '$lib/stores/catalogStore';
	import { catalogPages } from '$lib/data/sampleData';
	import CatalogPage from './CatalogPage.svelte';
	import { Button } from 'flowbite-svelte';

	// Reactive variable to track current shown pages (left and right)
	$: leftPageIndex = Math.floor($currentPageIndex / 2) * 2;
	$: rightPageIndex = leftPageIndex + 1;

	// Determine if we're showing a spread or a single page
	$: isLastPageSingle = totalPages % 2 === 1 && rightPageIndex === totalPages - 1;

	// Calculate the number of thumbnail rows (we'll show 4 thumbnails per row)
	$: thumbnailRows = Math.ceil(totalPages / 4);
</script>

<div class="catalog-container flex flex-col items-center p-4 md:p-8 bg-gray-100 min-h-screen">
	<div class="catalog-header w-full max-w-6xl mb-6">
		<h1 class="text-3xl font-bold text-center text-gray-800">Interactive Product Catalog</h1>
	</div>

	<!-- Main catalog view -->
	<div class="catalog-viewer relative w-full max-w-6xl bg-white rounded-lg shadow-lg p-4 mb-8">
		<!-- Page spread container (two pages side by side) -->
		<div class="page-spread flex justify-center h-[60vh] relative">
			<!-- Left page -->
			{#if leftPageIndex < totalPages}
				<div class="page-container w-1/2 p-2">
					<CatalogPage
						page={catalogPages[leftPageIndex]}
						isActive={$currentPageIndex === leftPageIndex}
						index={leftPageIndex}
					/>
				</div>
			{/if}

			<!-- Right page -->
			{#if rightPageIndex < totalPages}
				<div class="page-container w-1/2 p-2">
					<CatalogPage
						page={catalogPages[rightPageIndex]}
						isActive={$currentPageIndex === rightPageIndex}
						index={rightPageIndex}
					/>
				</div>
			{:else if isLastPageSingle}
				<!-- Empty right page if we have an odd number of pages -->
				<div class="page-container w-1/2 p-2">
					<div class="h-full w-full bg-gray-200 rounded-sm flex items-center justify-center">
						<span class="text-gray-500">End of catalog</span>
					</div>
				</div>
			{/if}
		</div>

		<!-- Navigation controls -->
		<div class="navigation-controls flex justify-between mt-6">
			<Button color="light" on:click={previousPage} disabled={leftPageIndex === 0}>
				<span class="mr-2">←</span> Previous
			</Button>

			<div class="page-indicator text-sm text-gray-600">
				Page {$currentPageIndex + 1} of {totalPages}
			</div>

			<Button color="light" on:click={nextPage} disabled={rightPageIndex >= totalPages - 1}>
				Next <span class="ml-2">→</span>
			</Button>
		</div>
	</div>

	<!-- Thumbnail navigation -->
	<div class="thumbnail-navigation w-full max-w-6xl overflow-x-auto pb-4">
		<div class="flex flex-wrap justify-center gap-2">
			{#each Array(totalPages) as _, i}
				<button
					class="thumbnail-btn p-1 rounded-md {$currentPageIndex === i
						? 'bg-blue-100 ring-2 ring-blue-400'
						: 'bg-gray-200 hover:bg-gray-300'}"
					on:click={() => goToPage(i)}
				>
					<div class="w-16 h-12 flex items-center justify-center bg-white rounded">
						<span class="text-xs text-gray-600">P{i + 1}</span>
					</div>
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	.catalog-container {
		transition: background-color 0.3s ease;
	}

	.page-spread {
		position: relative;
		/* Add a subtle line between pages */
		background-image: linear-gradient(
			to right,
			transparent 49.9%,
			#ddd 49.9%,
			#ddd 50.1%,
			transparent 50.1%
		);
	}

	.thumbnail-btn {
		transition: all 0.2s ease;
		cursor: pointer;
	}
</style>
