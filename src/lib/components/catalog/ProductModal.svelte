<!-- src/lib/components/catalog/ProductModal.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Modal, Button, Badge } from 'flowbite-svelte';
	import type { Product } from '$lib/types';

	// Props
	export let product: Product;
	export let open: boolean = false;

	// Event dispatcher
	const dispatch = createEventDispatcher<{
		close: { productId: string };
		addToCart: { productId: string; quantity: number };
	}>();

	// Local state
	let quantity = 1;

	// Handle modal interactions
	function handleClose() {
		dispatch('close', { productId: product.id });
	}

	function handleAddToCart() {
		if (quantity > 0) {
			dispatch('addToCart', { productId: product.id, quantity });
			// Close modal after adding to cart
			handleClose();
		}
	}

	function incrementQuantity() {
		quantity += 1;
	}

	function decrementQuantity() {
		if (quantity > 1) {
			quantity -= 1;
		}
	}
</script>

<Modal bind:open size="xl" autoclose outsideclose title={product.name} class="w-full">
	<div class="modal-content flex flex-col md:flex-row gap-6">
		<!-- Product Image -->
		<div class="product-image-container w-full md:w-1/2 bg-gray-100 rounded-lg">
			{#if product.imageUrl}
				<img
					src={product.imageUrl}
					alt={product.name}
					class="w-full h-full object-contain rounded-lg"
				/>
			{:else}
				<!-- Placeholder for missing image -->
				<div class="h-64 flex items-center justify-center p-8">
					<div class="text-center text-gray-400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							class="w-16 h-16 mx-auto mb-2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1"
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						<p>Product Image</p>
					</div>
				</div>
			{/if}
		</div>

		<!-- Product Details -->
		<div class="product-details w-full md:w-1/2">
			<div class="price-section mb-4">
				<Badge color="blue" large class="text-xl font-semibold">${product.price.toFixed(2)}</Badge>
			</div>

			<p class="description text-gray-600 mb-4">{product.description}</p>

			{#if product.details}
				<div class="product-specifications mb-6">
					<h3 class="text-lg font-medium text-gray-800 mb-2">Product Details</h3>
					<div class="specs-grid grid grid-cols-2 gap-2">
						{#each Object.entries(product.details) as [key, value]}
							<div class="spec-item">
								<span class="spec-label text-sm text-gray-500">{key}:</span>
								<span class="spec-value text-sm font-medium ml-1">{value}</span>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Add to Cart Section -->
			<div class="add-to-cart-section border-t border-gray-200 pt-4 mt-4">
				<div class="quantity-control flex items-center mb-4">
					<span class="text-sm text-gray-600 mr-4">Quantity:</span>
					<div class="flex items-center border border-gray-300 rounded">
						<button
							type="button"
							class="quantity-btn px-3 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 disabled:opacity-50"
							on:click={decrementQuantity}
							disabled={quantity <= 1}
							aria-label="Decrease quantity"
						>
							-
						</button>
						<span
							class="quantity-value px-4 py-1 border-x border-gray-300"
							aria-live="polite"
							aria-label="Quantity: {quantity}">{quantity}</span
						>
						<button
							type="button"
							class="quantity-btn px-3 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
							on:click={incrementQuantity}
							aria-label="Increase quantity"
						>
							+
						</button>
					</div>
				</div>

				<div class="action-buttons flex gap-3">
					<Button color="blue" class="flex-1" on:click={handleAddToCart}>Add to Cart</Button>

					<Button color="light" class="flex-1" on:click={handleClose}>Close</Button>
				</div>
			</div>
		</div>
	</div>
</Modal>
