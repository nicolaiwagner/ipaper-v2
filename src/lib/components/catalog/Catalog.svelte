<!-- src/lib/components/catalog/Catalog.svelte -->
<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { currentPageIndex, totalPages, goToPage } from '$lib/stores/catalogStore';
	import { catalogPages } from '$lib/data/sampleData';
	import CatalogPage from './CatalogPage.svelte';
	import { Button } from 'flowbite-svelte';

	// Track whether we're in a page-turning animation
	let isAnimating = false;
	let animationDirection: 'forward' | 'backward' | 'none' = 'none';
	const animationDuration = 300; // in milliseconds

	// Track viewport size for responsive design
	let windowWidth = 0;
	let windowHeight = 0;

	// Handle page turn animation
	async function turnPage(targetIndex: number) {
		if (isAnimating || targetIndex === $currentPageIndex) return;

		isAnimating = true;
		animationDirection = targetIndex > $currentPageIndex ? 'forward' : 'backward';

		// Update the page index
		currentPageIndex.set(targetIndex);

		// Allow animation to complete then reset
		setTimeout(() => {
			isAnimating = false;
			animationDirection = 'none';
		}, animationDuration);
	}

	// Navigation functions
	function handlePrevPage() {
		if ($currentPageIndex > 0 && !isAnimating) {
			turnPage($currentPageIndex - 1);
		}
	}

	function handleNextPage() {
		if ($currentPageIndex < totalPages - 1 && !isAnimating) {
			turnPage($currentPageIndex + 1);
		}
	}

	function handleThumbnailClick(index: number) {
		if (!isAnimating) {
			turnPage(index);
		}
	}

	// Track window size for responsive design
	onMount(() => {
		const handleResize = () => {
			windowWidth = window.innerWidth;
			windowHeight = window.innerHeight;
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	});

	// Add keyboard navigation
	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft') {
			handlePrevPage();
		} else if (e.key === 'ArrowRight') {
			handleNextPage();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="catalog-container flex flex-col items-center p-4 md:p-8 bg-gray-100 min-h-screen">
	<div class="catalog-header w-full max-w-6xl mb-6">
		<h1 class="text-3xl font-bold text-center text-gray-800">Interactive Product Catalog</h1>
	</div>

	<!-- Main catalog view -->
	<div class="catalog-viewer relative w-full max-w-6xl bg-white rounded-lg shadow-lg p-4 mb-8">
		<!-- Book-like container with shadows -->
		<div
			class="book-container relative mx-auto overflow-hidden rounded-lg shadow-xl"
			style="height: 70vh; max-height: 800px;"
		>
			<!-- Page display -->
			<div
				class="relative h-full w-full bg-gray-50 flex items-center justify-center overflow-hidden"
			>
				<!-- Current page -->
				<div class="absolute inset-0 overflow-hidden">
					<CatalogPage
						page={catalogPages[$currentPageIndex]}
						isActive={true}
						index={$currentPageIndex}
						{animationDirection}
						shouldAnimate={true}
					/>
				</div>

				<!-- Subtle page shadows -->
				<div
					class="page-shadow absolute inset-0 pointer-events-none"
					style="box-shadow: inset 0 0 30px rgba(0, 0, 0, 0.05);"
				></div>
			</div>

			<!-- Interactive corner overlays for page turning -->
			<button
				class="page-turn-button absolute top-0 bottom-0 right-0 w-16 md:w-24 cursor-pointer transition-colors duration-200 flex items-center justify-end pr-4 opacity-60 hover:opacity-100"
				on:click={handleNextPage}
				disabled={isAnimating || $currentPageIndex >= totalPages - 1}
				aria-label="Turn to next page"
			>
				<div class="text-gray-700 transform scale-75 md:scale-100">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="9 18 15 12 9 6"></polyline>
					</svg>
				</div>
			</button>

			<button
				class="page-turn-button absolute top-0 bottom-0 left-0 w-16 md:w-24 cursor-pointer transition-colors duration-200 flex items-center justify-start pl-4 opacity-60 hover:opacity-100"
				on:click={handlePrevPage}
				disabled={isAnimating || $currentPageIndex <= 0}
				aria-label="Turn to previous page"
			>
				<div class="text-gray-700 transform scale-75 md:scale-100">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="15 18 9 12 15 6"></polyline>
					</svg>
				</div>
			</button>
		</div>

		<!-- Navigation controls -->
		<div class="navigation-controls flex justify-between mt-6">
			<Button
				color="light"
				on:click={handlePrevPage}
				disabled={isAnimating || $currentPageIndex === 0}
			>
				<span class="mr-2">←</span> Previous
			</Button>

			<div class="page-indicator text-sm text-gray-600">
				Page {$currentPageIndex + 1} of {totalPages}
			</div>

			<Button
				color="light"
				on:click={handleNextPage}
				disabled={isAnimating || $currentPageIndex >= totalPages - 1}
			>
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
					on:click={() => handleThumbnailClick(i)}
					disabled={isAnimating}
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

	.thumbnail-btn {
		transition: all 0.2s ease;
		cursor: pointer;
	}

	.page-turn-button {
		background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.02));
	}

	.page-turn-button:first-child {
		background: linear-gradient(to left, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.02));
	}
</style>
