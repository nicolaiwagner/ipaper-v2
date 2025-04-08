<!-- src/lib/components/catalog/CatalogPage.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { CatalogPage } from '$lib/types';
	import Hotspot from './Hotspot.svelte';
	import ProductModal from './ProductModal.svelte';
	import { getProductById } from '$lib/data/sampleData';

	// Event dispatcher
	const dispatch = createEventDispatcher<{
		addToCart: { productId: string; quantity: number };
	}>();

	// Prop to pass the page data
	export let page: CatalogPage;
	export let isActive: boolean = false;
	export let index: number;
	export let animationDirection: 'forward' | 'backward' | 'none' = 'none';
	const animationDuration: number = 300;
	export let shouldAnimate: boolean = true;

	// State for product modal
	let selectedProductId: string | null = null;
	let showProductModal = false;
	let activeHotspotId: string | null = null;

	// Handle hotspot interactions
	function handleHotspotClick(event: CustomEvent<{ hotspotId: string; productId: string }>) {
		selectedProductId = event.detail.productId;
		activeHotspotId = event.detail.hotspotId;
		showProductModal = true;
	}

	function handleHotspotHover(
		event: CustomEvent<{ hotspotId: string; productId: string; isHovering: boolean }>
	) {
		// We could add additional hover logic here if needed
		console.log(`Hotspot hover: ${event.detail.hotspotId}, hovering: ${event.detail.isHovering}`);
	}

	function handleModalClose() {
		showProductModal = false;
		activeHotspotId = null;
	}

	function handleAddToCart(event: CustomEvent<{ productId: string; quantity: number }>) {
		// Forward the event to the parent component
		dispatch('addToCart', {
			productId: event.detail.productId,
			quantity: event.detail.quantity
		});

		console.log(`Adding to cart: ${event.detail.quantity} of product ${event.detail.productId}`);
		showProductModal = false;
		activeHotspotId = null;
	}

	// Placeholder for image URLs (in a real project, these would be actual images)
	// For development, we'll use placeholder colors
	const placeholderColors = ['#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da'];
	const bgColor = placeholderColors[index % placeholderColors.length];
</script>

<div
	class="catalog-page relative {isActive ? 'active' : ''}"
	style="background-color: {bgColor};"
	class:animate-slide-left={shouldAnimate && animationDirection === 'backward'}
	class:animate-slide-right={shouldAnimate && animationDirection === 'forward'}
>
	<div class="page-content flex flex-col h-full p-8">
		<div class="page-header border-b border-gray-200 pb-4 mb-4">
			<h2 class="text-xl font-semibold">Page {index + 1}</h2>
			<p class="text-sm text-gray-600">Catalog ID: {page.id}</p>
		</div>

		<!-- Page content with hotspots -->
		<div class="flex-grow relative">
			<div class="catalog-page-content h-full bg-gray-100 rounded-lg relative overflow-hidden">
				<!-- Placeholder content -->
				<div class="flex items-center justify-center h-full">
					<div class="text-center p-6">
						<p class="mb-2 text-lg">Page {index + 1} Content</p>
						<p class="text-sm text-gray-500">
							Contains {page.hotspots.length} product{page.hotspots.length !== 1 ? 's' : ''}
						</p>
					</div>
				</div>

				<!-- Hotspots -->
				{#each page.hotspots as hotspot (hotspot.id)}
					{@const product = getProductById(hotspot.productId)}
					{#if product}
						<Hotspot
							{hotspot}
							{product}
							isActive={activeHotspotId === hotspot.id}
							on:click={handleHotspotClick}
							on:hover={handleHotspotHover}
						/>
					{/if}
				{/each}
			</div>
		</div>

		<!-- Page footer -->
		<div class="page-footer flex justify-between items-center pt-4 border-t border-gray-200 mt-4">
			<span class="text-sm text-gray-500">Interactive Catalog</span>
			<span class="text-sm text-gray-600">Page {index + 1}</span>
		</div>
	</div>

	<!-- Product Modal -->
	{#if selectedProductId}
		{@const product = getProductById(selectedProductId)}
		{#if product}
			<ProductModal
				{product}
				bind:open={showProductModal}
				on:close={handleModalClose}
				on:addToCart={handleAddToCart}
			/>
		{/if}
	{/if}
</div>

<style>
	.catalog-page {
		width: 100%;
		height: 100%;
		border-radius: 5px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		/* Hide overflow to prevent hotspots from appearing outside the page */
		overflow: hidden;
		background-color: white;
		transition: transform 0.3s ease-out;
	}

	.catalog-page.active {
		/* Add subtle highlight to active page */
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
	}

	.animate-slide-right {
		animation: slideRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	.animate-slide-left {
		animation: slideLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	@keyframes slideRight {
		0% {
			transform: translateX(100%);
			opacity: 0;
		}
		100% {
			transform: translateX(0);
			opacity: 1;
		}
	}

	@keyframes slideLeft {
		0% {
			transform: translateX(-100%);
			opacity: 0;
		}
		100% {
			transform: translateX(0);
			opacity: 1;
		}
	}
</style>
