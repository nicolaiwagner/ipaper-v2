<!-- src/lib/components/cart/CartSidebar.svelte -->
<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { Button, Card, Badge, CloseButton } from 'flowbite-svelte';
	import { cartItems, cartStats, cartStore } from '$lib/stores/cartStore';

	// Props
	export let open: boolean = false;

	// Event dispatcher
	const dispatch = createEventDispatcher<{
		close: void;
		checkout: { totalAmount: number };
	}>();

	// Handle close
	function handleClose() {
		dispatch('close');
	}

	// Handle quantity updates
	function incrementQuantity(productId: string, currentQuantity: number) {
		cartStore.updateQuantity(productId, currentQuantity + 1);
	}

	function decrementQuantity(productId: string, currentQuantity: number) {
		if (currentQuantity > 1) {
			cartStore.updateQuantity(productId, currentQuantity - 1);
		} else {
			cartStore.removeItem(productId);
		}
	}

	// Handle item removal
	function removeItem(productId: string) {
		cartStore.removeItem(productId);
	}

	// Handle checkout
	function handleCheckout() {
		dispatch('checkout', { totalAmount: $cartStats.totalPrice });
	}
</script>

{#if open}
	<div class="cart-overlay fixed inset-0 z-30" transition:fade={{ duration: 200 }}>
		<!-- Backdrop (as a button for accessibility) -->
		<button
			type="button"
			class="absolute inset-0 w-full h-full focus:outline-none"
			style="background-color: rgba(0, 0, 0, 0.3);"
			on:click={handleClose}
			aria-label="Close cart"
		></button>

		<!-- Cart Sidebar -->
		<div
			class="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-lg z-40 flex flex-col"
			transition:fly={{ x: 300, duration: 300, opacity: 1 }}
		>
			<!-- Header -->
			<div class="p-4 border-b border-gray-200 flex justify-between items-center">
				<h2 class="text-xl font-semibold">Your Cart</h2>
				<CloseButton on:click={handleClose} />
			</div>

			<!-- Cart Contents -->
			<div class="flex-grow overflow-y-auto p-4">
				{#if $cartItems.length === 0}
					<div class="text-center py-10">
						<svg
							class="w-12 h-12 mx-auto text-gray-400 mb-4"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 18 20"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="1.5"
								d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"
							/>
						</svg>
						<p class="text-gray-600">Your cart is empty</p>
					</div>
				{:else}
					<div class="space-y-4">
						{#each $cartItems as item}
							{#if item.product}
								<Card class="p-0 overflow-hidden">
									<div class="flex p-3">
										<!-- Product Image/Placeholder -->
										<div
											class="w-20 h-20 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center"
										>
											{#if item.product.imageUrl}
												<img
													src={item.product.imageUrl}
													alt={item.product.name}
													class="w-full h-full object-contain p-1"
												/>
											{:else}
												<svg
													class="w-8 h-8 text-gray-400"
													aria-hidden="true"
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 20 18"
												>
													<path
														stroke="currentColor"
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="1.5"
														d="M10 12.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
													/>
													<path
														stroke="currentColor"
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="1.5"
														d="M17 3h-2l-.447-.894A2 2 0 0 0 12.764 1H7.236a2 2 0 0 0-1.789 1.106L5 3H3a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V5a2 2 0 0 0-2-2Z"
													/>
												</svg>
											{/if}
										</div>

										<!-- Product Info -->
										<div class="ml-4 flex-grow">
											<div class="flex justify-between">
												<h3 class="font-medium">{item.product.name}</h3>
												<button
													type="button"
													class="text-gray-400 hover:text-red-500 transition-colors"
													on:click={() => removeItem(item.productId)}
													aria-label="Remove item"
												>
													<svg
														class="w-5 h-5"
														aria-hidden="true"
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 14 14"
													>
														<path
															stroke="currentColor"
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
														/>
													</svg>
												</button>
											</div>

											<div class="text-sm text-gray-500">${item.product.price.toFixed(2)} each</div>

											<div class="flex justify-between items-center mt-2">
												<!-- Quantity Controls -->
												<div class="flex items-center border border-gray-300 rounded">
													<button
														type="button"
														class="px-2 py-1 text-gray-600 hover:bg-gray-100"
														on:click={() => decrementQuantity(item.productId, item.quantity)}
														aria-label="Decrease quantity">-</button
													>
													<span class="px-3 py-1 border-x border-gray-300">{item.quantity}</span>
													<button
														type="button"
														class="px-2 py-1 text-gray-600 hover:bg-gray-100"
														on:click={() => incrementQuantity(item.productId, item.quantity)}
														aria-label="Increase quantity">+</button
													>
												</div>

												<!-- Item Subtotal -->
												<div class="font-medium">
													${(item.product.price * item.quantity).toFixed(2)}
												</div>
											</div>
										</div>
									</div>
								</Card>
							{/if}
						{/each}
					</div>
				{/if}
			</div>

			<!-- Cart Summary and Actions -->
			<div class="border-t border-gray-200 p-4 bg-gray-50">
				<!-- Cart Totals -->
				<div class="mb-4">
					<div class="flex justify-between mb-2">
						<span class="text-gray-600">Items ({$cartStats.itemCount}):</span>
						<span>${$cartStats.totalPrice.toFixed(2)}</span>
					</div>
					<div class="flex justify-between text-lg font-semibold">
						<span>Total:</span>
						<span>${$cartStats.totalPrice.toFixed(2)}</span>
					</div>
				</div>

				<!-- Action Buttons -->
				<div class="flex gap-3">
					<Button
						color="blue"
						class="flex-1"
						on:click={handleCheckout}
						disabled={$cartItems.length === 0}
					>
						Checkout
					</Button>
					<Button
						color="light"
						class="flex-1"
						on:click={() => cartStore.clearCart()}
						disabled={$cartItems.length === 0}
					>
						Clear Cart
					</Button>
				</div>
			</div>
		</div>
	</div>
{/if}
