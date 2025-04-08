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

	// This function will run whenever the open state changes
	$: if (open === false) {
		handleClose();
	}
</script>

<Modal
	bind:open
	size="xl"
	autoclose
	outsideclose
	title={product.name}
	class="w-full bg-happy-background text-happy-paragraph"
>
	<div class="modal-content flex flex-col md:flex-row gap-6">
		<!-- Product Image -->
		<div class="product-image-container w-full md:w-1/2 bg-happy-secondary rounded-lg">
			{#if product.imageUrl}
				<img
					src={product.imageUrl}
					alt={product.name}
					class="w-full h-full object-contain rounded-lg"
				/>
			{:else}
				<!-- Placeholder for missing image -->
				<div class="h-64 flex items-center justify-center p-8">
					<div class="text-center text-happy-paragraph opacity-70">
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
				<Badge
					color="dark"
					large
					class="text-xl font-semibold bg-happy-tertiary border-happy-tertiary"
					>${product.price.toFixed(2)}</Badge
				>
			</div>

			<p class="description text-happy-paragraph mb-4">{product.description}</p>

			{#if product.details}
				<div class="product-specifications mb-6">
					<h3 class="text-lg font-medium text-happy-headline mb-2">Product Details</h3>
					<div class="specs-grid grid grid-cols-2 gap-2">
						{#each Object.entries(product.details) as [key, value]}
							<div class="spec-item">
								<span class="spec-label text-sm text-happy-paragraph opacity-75">{key}:</span>
								<span class="spec-value text-sm font-medium ml-1 text-happy-paragraph">{value}</span
								>
							</div>
						{/each}
					</div>
				</div>
			{/if}

			<!-- Add to Cart Section -->
			<div class="add-to-cart-section border-t border-gray-200 pt-4 mt-4">
				<div class="quantity-control flex items-center mb-4">
					<span class="text-sm text-happy-paragraph mr-4">Quantity:</span>
					<div class="flex items-center border border-gray-300 rounded">
						<button
							type="button"
							class="quantity-btn px-3 py-1 text-happy-paragraph hover:bg-happy-secondary focus:outline-none focus:ring-2 focus:ring-happy-tertiary focus:ring-opacity-50 disabled:opacity-50"
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
							class="quantity-btn px-3 py-1 text-happy-paragraph hover:bg-happy-secondary focus:outline-none focus:ring-2 focus:ring-happy-tertiary focus:ring-opacity-50"
							on:click={incrementQuantity}
							aria-label="Increase quantity"
						>
							+
						</button>
					</div>
				</div>

				<div class="action-buttons flex gap-3">
					<Button
						color="none"
						class="flex-1 bg-happy-button text-happy-buttonText hover:bg-opacity-90 border-none"
						on:click={handleAddToCart}
					>
						Add to Cart
					</Button>

					<Button
						color="none"
						class="flex-1 bg-happy-secondary text-happy-paragraph border border-gray-200 hover:bg-happy-background"
						on:click={handleClose}
					>
						Close
					</Button>
				</div>
			</div>
		</div>
	</div>
</Modal>
