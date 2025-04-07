<!-- src/lib/components/catalog/Hotspot.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { Hotspot, Product } from '$lib/types';

	// Props
	export let hotspot: Hotspot;
	export let product: Product;
	export let isActive: boolean = false;

	// Event dispatcher for handling interactions
	const dispatch = createEventDispatcher<{
		click: { hotspotId: string; productId: string };
		hover: { hotspotId: string; productId: string; isHovering: boolean };
	}>();

	// State for hover effects
	let isHovering = false;

	// Handle mouse events
	function handleMouseEnter() {
		isHovering = true;
		dispatch('hover', { hotspotId: hotspot.id, productId: product.id, isHovering: true });
	}

	function handleMouseLeave() {
		isHovering = false;
		dispatch('hover', { hotspotId: hotspot.id, productId: product.id, isHovering: false });
	}

	function handleClick() {
		dispatch('click', { hotspotId: hotspot.id, productId: product.id });
	}
</script>

<button
	type="button"
	class="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer bg-transparent border-0 p-0 appearance-none flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
	style="left: {hotspot.position.x}%; top: {hotspot.position.y}%;"
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	on:click={handleClick}
	on:keydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			handleClick();
		}
	}}
	aria-label="View details for {product.name}"
	aria-expanded={isActive}
	aria-haspopup="dialog"
>
	<span
		class="flex items-center justify-center relative overflow-visible transition-all duration-200 ease-in-out rounded-full border-2 border-blue-500 bg-blue-500 bg-opacity-50 {isHovering ||
		isActive
			? 'bg-opacity-80 scale-110'
			: ''}"
		style="width: {hotspot.size}px; height: {hotspot.size}px;"
	>
		<span class="hotspot-pulse absolute w-full h-full rounded-full bg-blue-500 bg-opacity-40"
		></span>
	</span>

	<!-- Preview tooltip that appears on hover -->
	{#if isHovering && !isActive}
		<div
			class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-md shadow-lg py-2 px-3 min-w-[150px] z-20 pointer-events-none tooltip-animation"
			role="tooltip"
		>
			<div class="flex flex-col gap-1">
				<h4 class="font-semibold text-sm text-gray-800 m-0">{product.name}</h4>
				<p class="font-semibold text-sm text-blue-600 m-0">${product.price.toFixed(2)}</p>
				<span class="text-xs text-gray-500 mt-1">Click to view details</span>
			</div>
		</div>
	{/if}
</button>

<style>
	/* Animations that can't be done with Tailwind */
	.hotspot-pulse {
		animation: pulse 2s ease-out infinite;
	}

	.tooltip-animation {
		animation: fadeIn 0.2s ease-out forwards;
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
			opacity: 0.8;
		}
		100% {
			transform: scale(2);
			opacity: 0;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateX(-50%) translateY(-5px);
		}
		to {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}
	}
</style>
