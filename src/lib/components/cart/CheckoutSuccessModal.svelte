<!-- src/lib/components/cart/CheckoutSuccessModal.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Modal, Button, Card } from 'flowbite-svelte';
	import { CheckCircleSolid } from 'flowbite-svelte-icons';

	// Props
	export let open: boolean = false;
	export let orderId: string = '';

	// Event dispatcher
	const dispatch = createEventDispatcher<{
		close: void;
	}>();

	// Handle close
	function handleClose() {
		dispatch('close');
	}
</script>

<Modal bind:open title="Order Confirmed!" size="md" autoclose={false} outsideclose={true}>
	<div class="text-center py-4">
		<!-- Success Icon -->
		<div
			class="bg-green-100 rounded-full p-3 mx-auto w-20 h-20 flex items-center justify-center mb-4"
		>
			<CheckCircleSolid class="w-12 h-12 text-green-500" />
		</div>

		<h3 class="text-xl font-semibold mb-2">Thank You For Your Order!</h3>
		<p class="text-gray-600 mb-4">Your order has been placed successfully.</p>

		<!-- Order ID -->
		<Card class="mb-4">
			<p class="text-sm text-gray-500">Order ID:</p>
			<p class="font-mono font-medium">{orderId}</p>
		</Card>

		<p class="text-sm text-gray-500 mb-4">
			A confirmation has been sent to your email address. You can continue browsing the catalog.
		</p>

		<Button color="blue" class="w-full bg-happy-button text-happy-buttonText" on:click={handleClose}
			>Continue Shopping</Button
		>
	</div>
</Modal>
