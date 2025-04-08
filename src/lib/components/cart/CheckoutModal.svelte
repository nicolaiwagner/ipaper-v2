<!-- src/lib/components/cart/CheckoutModal.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Modal, Button, Input, Label, Helper, Alert, Spinner } from 'flowbite-svelte';
	import { cartStats, cartStore } from '$lib/stores/cartStore';

	// Props
	export let open: boolean = false;

	// Event dispatcher
	const dispatch = createEventDispatcher<{
		close: void;
		success: { orderId: string };
	}>();

	// Form state
	let name = '';
	let email = '';
	let address = '';

	// Form validation
	let errors = {
		name: '',
		email: '',
		address: ''
	};

	// Processing status
	let isProcessing = false;

	// Handle close
	function handleClose() {
		resetForm();
		dispatch('close');
	}

	// Reset form
	function resetForm() {
		name = '';
		email = '';
		address = '';
		errors = {
			name: '',
			email: '',
			address: ''
		};
		isProcessing = false;
	}

	// Validate form
	function validateForm(): boolean {
		let isValid = true;

		// Reset errors
		errors = {
			name: '',
			email: '',
			address: ''
		};

		// Validate name
		if (!name.trim()) {
			errors.name = 'Name is required';
			isValid = false;
		}

		// Validate email
		if (!email.trim()) {
			errors.email = 'Email is required';
			isValid = false;
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			errors.email = 'Please enter a valid email address';
			isValid = false;
		}

		// Validate address
		if (!address.trim()) {
			errors.address = 'Address is required';
			isValid = false;
		}

		return isValid;
	}

	// Handle submit
	async function handleSubmit() {
		if (!validateForm()) return;

		isProcessing = true;

		// Simulate API call
		try {
			// Wait for 1.5 seconds to simulate processing
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Generate a random order ID
			const orderId = 'ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase();

			// Clear the cart
			cartStore.clearCart();

			// Dispatch success event
			dispatch('success', { orderId });

			// Close modal
			handleClose();
		} catch (error) {
			console.error('Checkout error:', error);
		} finally {
			isProcessing = false;
		}
	}
</script>

<Modal bind:open title="Checkout" size="lg" autoclose={false} outsideclose={false}>
	<form on:submit|preventDefault={handleSubmit} class="space-y-4">
		<!-- Customer Information -->
		<div>
			<Label for="name" class="mb-2">Name</Label>
			<Input
				id="name"
				bind:value={name}
				placeholder="Your full name"
				color={errors.name ? 'red' : 'base'}
			/>
			{#if errors.name}
				<Helper color="red">{errors.name}</Helper>
			{/if}
		</div>

		<div>
			<Label for="email" class="mb-2">Email</Label>
			<Input
				id="email"
				type="email"
				bind:value={email}
				placeholder="Your email address"
				color={errors.email ? 'red' : 'base'}
			/>
			{#if errors.email}
				<Helper color="red">{errors.email}</Helper>
			{/if}
		</div>

		<div>
			<Label for="address" class="mb-2">Shipping Address</Label>
			<Input
				id="address"
				bind:value={address}
				placeholder="Your shipping address"
				color={errors.address ? 'red' : 'base'}
			/>
			{#if errors.address}
				<Helper color="red">{errors.address}</Helper>
			{/if}
		</div>

		<!-- Order Summary -->
		<div class="border-t border-gray-200 pt-4 mt-4">
			<h3 class="text-lg font-medium mb-2">Order Summary</h3>
			<div class="flex justify-between mb-1">
				<span class="text-gray-600">Subtotal:</span>
				<span>${$cartStats.totalPrice.toFixed(2)}</span>
			</div>
			<div class="flex justify-between mb-1">
				<span class="text-gray-600">Shipping:</span>
				<span>Free</span>
			</div>
			<div class="flex justify-between font-semibold text-lg border-t border-gray-200 pt-2 mt-2">
				<span>Total:</span>
				<span>${$cartStats.totalPrice.toFixed(2)}</span>
			</div>
		</div>

		<!-- Payment Information Note -->
		<Alert color="blue">
			<span class="font-medium">Note:</span> This is a demo checkout. No payment will be processed, and
			no real orders will be created.
		</Alert>

		<!-- Action Buttons -->
		<div class="flex gap-3 pt-2">
			<Button type="submit" color="blue" class="flex-1" disabled={isProcessing}>
				{#if isProcessing}
					<div class="flex items-center justify-center">
						<Spinner class="mr-2" size="sm" color="white" />
						Processing...
					</div>
				{:else}
					Complete Order
				{/if}
			</Button>
			<Button
				type="button"
				color="light"
				class="flex-1"
				on:click={handleClose}
				disabled={isProcessing}
			>
				Cancel
			</Button>
		</div>
	</form>
</Modal>
